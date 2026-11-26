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

// POST
router.post('/', async (req, res) => {
    try {
        const guardada = await new Categoria(req.body).save();
        res.status(201).json({ mensaje: 'Categoría creada correctamente', data: guardada });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// PUT por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!actualizada) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría actualizada correctamente', data: actualizada });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// DELETE por ID
router.delete('/:id', async (req, res) => {
    try {
        const eliminada = await Categoria.findByIdAndDelete(req.params.id);
        if (!eliminada) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría eliminada correctamente', data: req.params.id });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;