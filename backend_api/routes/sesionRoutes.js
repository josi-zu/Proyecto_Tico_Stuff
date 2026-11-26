const express = require('express');
const Usuario = require('../models/Usuario');
const { verificarPassword } = require('../services/password');
const { autenticar, crearSesion, cerrarSesion } = require('../middleware/autenticacion');
const router = express.Router();
const intentos = new Map();
const VENTANA = 15 * 60 * 1000;

function datosPublicos(usuario) {
    return { _id: usuario._id, nombre: usuario.nombre, correo: usuario.correo,
        rol: usuario.rol_id.nombre_rol, permisos: usuario.rol_id.permisos };
}

router.post('/login', async (req, res, next) => {
    try {
        const { correo, password } = req.body || {};
        if (typeof correo !== 'string' || typeof password !== 'string' || correo.length > 254 || password.length > 128) {
            return res.status(400).json({ mensaje: 'Ingresa correo y contraseña válidos' });
        }
        for (const [ip, valor] of intentos) if (valor.vence <= Date.now()) intentos.delete(ip);
        const control = intentos.get(req.ip) || { cantidad: 0, vence: Date.now() + VENTANA };
        if (control.cantidad >= 10 || intentos.size >= 10000) {
            return res.status(429).json({ mensaje: 'Demasiados intentos. Intenta en 15 minutos' });
        }
        control.cantidad++;
        intentos.set(req.ip, control);
        const usuario = await Usuario.findOne({ correo: correo.trim().toLowerCase() })
            .select('+password_hash').populate('rol_id');
        if (!usuario || usuario.estado !== 'activo' || !usuario.rol_id || usuario.rol_id.estado !== 'activo' ||
            !await verificarPassword(password, usuario.password_hash)) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }
        intentos.delete(req.ip);
        crearSesion(req, res, usuario._id);
        res.json(datosPublicos(usuario));
    } catch (error) { next(error); }
});

router.get('/actual', autenticar, (req, res) => res.json(datosPublicos(req.usuario)));
router.post('/logout', (req, res) => {
    cerrarSesion(req, res);
    res.json({ mensaje: 'Sesión cerrada' });
});

module.exports = router;
