const mongoose = require('mongoose');

const DropSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        fecha_lanzamiento: { type: Date, required: true },
        estado: {
            type: String,
            enum: ['programado', 'publicado', 'finalizado'],
            default: 'programado'
        },
        imagen_portada: { type: String, trim: true, default: 'por definir' },
        fecha_creacion: { type: Date, default: Date.now }
    },
    { collection: 'drops' }
);

module.exports = mongoose.model('Drop', DropSchema);