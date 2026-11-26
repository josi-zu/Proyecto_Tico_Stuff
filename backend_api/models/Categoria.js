const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        slug: { type: String, required: true, trim: true, unique: true },
        estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
        fecha_creacion: { type: Date, default: Date.now }
    },
    { collection: 'categorias' }
);

module.exports = mongoose.model('Categoria', CategoriaSchema);