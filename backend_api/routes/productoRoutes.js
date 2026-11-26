const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Evita que caracteres especiales rompan la búsqueda
const escapar = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET: listar con filtros opcionales
// /api/productos?q=nike&marca=Nike&categoria=<id>&drop=<id>&condicion=nuevo&estado=visible
router.get('/', async (req, res) => {
    try {
        const { q, marca, categoria, drop, condicion, estado } = req.query;
        const filtro = {};

        if (q) {
            const regex = new RegExp(escapar(q), 'i');
            filtro.$or = [{ nombre: regex }, { descripcion: regex }, { marca: regex }];
        }
        if (marca) filtro.marca = new RegExp(`^${escapar(marca)}$`, 'i');
        if (categoria) filtro.categoria_id = categoria;
        if (drop) filtro.drop_id = drop;
        if (condicion) filtro.condicion = condicion;
        if (estado) filtro.estado_publicacion = estado;

        const datos = await Producto.find(filtro)
            .populate('categoria_id', 'nombre slug')
            .populate('drop_id', 'nombre estado')
            .sort({ fecha_registro: -1 });

        res.json(datos);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// GET por ID (detalle)
router.get('/:id', async (req, res) => {
    try {
        const dato = await Producto.findById(req.params.id)
            .populate('categoria_id', 'nombre slug')
            .populate('drop_id', 'nombre estado fecha_lanzamiento');
        if (!dato) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const guardado = await new Producto(req.body).save();
        res.status(201).json({ mensaje: 'Producto creado correctamente', data: guardado });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// PUT por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto actualizado correctamente', data: actualizado });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// DELETE por ID
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente', data: req.params.id });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;