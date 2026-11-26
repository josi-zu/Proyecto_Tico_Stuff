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

// POST
router.post('/', async (req, res) => {
    try {
        const guardado = await new Inventario(req.body).save();
        res.status(201).json({ mensaje: 'Inventario creado correctamente', data: guardado });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// PUT por ID
router.put('/:id', async (req, res) => {
    try {
        req.body.fecha_actualizacion = new Date();
        const actualizado = await Inventario.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'Registro de inventario no encontrado' });
        res.json({ mensaje: 'Inventario actualizado correctamente', data: actualizado });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// DELETE por ID
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Inventario.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Registro de inventario no encontrado' });
        res.json({ mensaje: 'Inventario eliminado correctamente', data: req.params.id });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;