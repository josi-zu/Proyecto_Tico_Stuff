const express = require('express');
const mongoose = require('mongoose');
const Rol = require('../models/RolPermiso');
const Bitacora = require('../models/BitacoraAuditoria');
const { autenticar } = require('../middleware/autenticacion');
const { permitirRoles, exigirPermiso } = require('../middleware/permisos');
const router = express.Router();

router.use(autenticar, permitirRoles('Administrador'));

// Los roles se mantienen mediante el script de configuración. No se expone
// edición de privilegios ni eliminación de la bitácora desde la interfaz.
router.get('/roles', exigirPermiso('gestionar_roles'), async (req, res, next) => {
    try { res.json(await Rol.find().sort({ nombre_rol: 1 })); }
    catch (error) { next(error); }
});

router.get('/bitacora', exigirPermiso('consultar_bitacora'), async (req, res, next) => {
    try {
        const filtro = {};
        for (const campo of ['coleccion', 'accion']) {
            if (req.query[campo]) {
                if (typeof req.query[campo] !== 'string') return res.status(400).json({ mensaje: 'Filtro inválido' });
                filtro[campo] = req.query[campo];
            }
        }
        if (req.query.usuario_id) {
            if (!mongoose.isObjectIdOrHexString(req.query.usuario_id)) return res.status(400).json({ mensaje: 'Usuario inválido' });
            filtro.usuario_id = req.query.usuario_id;
        }
        const pagina = Number(req.query.pagina || 1);
        if (!Number.isSafeInteger(pagina) || pagina < 1 || pagina > 10000) return res.status(400).json({ mensaje: 'Página inválida' });
        const datos = await Bitacora.find(filtro).sort({ fecha: -1, _id: -1 }).skip((pagina - 1) * 50).limit(50)
            .populate('usuario_id', 'nombre apellido correo');
        res.json({ datos, pagina, total: await Bitacora.countDocuments(filtro), por_pagina: 50 });
    } catch (error) { next(error); }
});

module.exports = router;
