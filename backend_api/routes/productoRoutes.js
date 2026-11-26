const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Evita que caracteres especiales rompan la búsqueda
const escapar = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET: listar con filtros opcionales
// /api/productos?q=nike&marca=Nike&categoria=<id>&drop=<id>&condicion=nuevo&estado=visible
router.get('/', async (req, res) => {
    try {
        const { q, texto, marca, categoria, drop, condicion, estado } = req.query;
        if ([q, texto, marca, categoria, drop, condicion, estado].some(valor => valor !== undefined && (typeof valor !== 'string' || valor.length > 200))) {
            return res.status(400).json({ mensaje: 'Filtros inválidos' });
        }
        const filtro = {};
        if (texto) filtro.$text = { $search: texto };

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

// Escrituras protegidas y auditadas. Las consultas anteriores siguen públicas.
require('./operacionesAdministrativas')(router, Producto, 'gestionar_productos');

module.exports = router;
