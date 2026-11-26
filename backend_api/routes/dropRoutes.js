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

// POST
router.post('/', async (req, res) => {
    try {
        const guardado = await new Drop(req.body).save();
        res.status(201).json({ mensaje: 'Drop creado correctamente', data: guardado });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// PUT por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Drop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'Drop no encontrado' });
        res.json({ mensaje: 'Drop actualizado correctamente', data: actualizado });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// DELETE por ID
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Drop.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Drop no encontrado' });
        res.json({ mensaje: 'Drop eliminado correctamente', data: req.params.id });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;