const { randomBytes, createHash } = require('node:crypto');
const Usuario = require('../models/Usuario');

// Sesiones para una instancia local. Al reiniciar el API se vuelve a iniciar sesión.
const sesiones = new Map();
const DURACION = 15 * 60 * 1000;
const cookieOpciones = { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/' };
const clave = token => createHash('sha256').update(token).digest('hex');

function tokenDeCookie(req) {
    const cookie = (req.headers.cookie || '').split(';').map(parte => parte.trim())
        .find(parte => parte.startsWith('tico_sesion='));
    return cookie ? cookie.slice('tico_sesion='.length) : '';
}

function cerrarSesion(req, res) {
    const token = tokenDeCookie(req);
    if (token) sesiones.delete(clave(token));
    res.clearCookie('tico_sesion', cookieOpciones);
}

function crearSesion(req, res, usuarioId) {
    cerrarSesion(req, res);
    for (const [id, sesion] of sesiones) {
        if (sesion.vence <= Date.now()) sesiones.delete(id);
    }
    if (sesiones.size >= 10000) throw new Error('Límite de sesiones alcanzado');
    const token = randomBytes(32).toString('hex');
    sesiones.set(clave(token), { usuarioId, vence: Date.now() + DURACION });
    res.cookie('tico_sesion', token, cookieOpciones);
}

async function autenticar(req, res, next) {
    try {
        const token = tokenDeCookie(req);
        const sesion = token && sesiones.get(clave(token));
        if (!sesion || sesion.vence <= Date.now()) {
            cerrarSesion(req, res);
            return res.status(401).json({ mensaje: 'Debes iniciar sesión' });
        }
        // Consultar de nuevo permite revocar cuentas, roles o permisos inmediatamente.
        const usuario = await Usuario.findById(sesion.usuarioId).populate('rol_id');
        if (!usuario || usuario.estado !== 'activo' || !usuario.rol_id || usuario.rol_id.estado !== 'activo') {
            cerrarSesion(req, res);
            return res.status(401).json({ mensaje: 'La cuenta o su rol no están activos' });
        }
        sesion.vence = Date.now() + DURACION;
        req.usuario = usuario;
        next();
    } catch (error) { next(error); }
}

module.exports = { autenticar, crearSesion, cerrarSesion };
