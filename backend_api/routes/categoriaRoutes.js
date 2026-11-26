const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

// GET: listar (opcional ?estado=activo)
router.get('/', async (req, res) => {
    try {
        const filtro = {};
        if (req.query.estado) filtro.estado = req.query.estado;
        const datos = await Categoria.find(filtro).sort({ nombre: 1 });
        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// GET por ID
router.get('/:id', async (req, res) => {
    try {
        const dato = await Categoria.findById(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Escrituras protegidas y auditadas. Las consultas anteriores siguen públicas.
require('./operacionesAdministrativas')(router, Categoria, 'gestionar_categorias');

module.exports = router;
