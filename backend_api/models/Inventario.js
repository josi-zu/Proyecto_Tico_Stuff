const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema(
    {
        producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        sku: { type: String, required: true, trim: true, unique: true },
        talla: { type: String, required: true, trim: true },
        color: { type: String, required: true, trim: true },
        cantidad_disponible: { type: Number, required: true, min: 0, default: 0 },
        cantidad_reservada: { type: Number, min: 0, default: 0 },
        fecha_actualizacion: { type: Date, default: Date.now }
    },
    { collection: 'inventario' }
);

module.exports = mongoose.model('Inventario', InventarioSchema);