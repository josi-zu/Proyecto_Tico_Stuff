const express = require('express');
const router = express.Router();
const Drop = require('../models/Drop');

// GET: listar (opcional ?estado=publicado)
router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.estado) filtro.estado = req.query.estado;
        const datos = await Drop.find(filtro).sort({ fecha_lanzamiento: -1 });
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// GET por ID
router.get('/:id', async (req, res) => {
    try {
        const dato = await Drop.findById(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Drop no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Escrituras protegidas y auditadas. Las consultas anteriores siguen públicas.
require('./operacionesAdministrativas')(router, Drop, 'gestionar_drops');

module.exports = router;
