const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');

// GET: listar (opcional ?producto=<id>)
router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.producto) filtro.producto_id = req.query.producto;
        const datos = await Inventario.find(filtro).populate('producto_id', 'nombre marca');
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// GET por ID
router.get('/:id', async (req, res) => {
    try {
        const dato = await Inventario.findById(req.params.id).populate('producto_id', 'nombre marca');
        if (!dato) return res.status(404).json({ mensaje: 'Registro de inventario no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Escrituras protegidas y auditadas. Las consultas anteriores siguen públicas.
require('./operacionesAdministrativas')(router, Inventario, 'gestionar_inventario');

module.exports = router;
