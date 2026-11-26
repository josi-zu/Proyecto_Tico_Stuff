const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        marca: { type: String, required: true, trim: true },
        categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
        drop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Drop', required: true },
        precio: { type: mongoose.Schema.Types.Decimal128, required: true },
        condicion: { type: String, trim: true, default: 'nuevo' },
        imagenes: [{ type: String, trim: true }],
        fecha_registro: { type: Date, default: Date.now },
        estado_publicacion: { type: String, default: 'visible' }
    },
    {
        collection: 'productos',
        toJSON: {
            // Convierte Decimal128 a número normal al enviar el JSON
            transform: (doc, ret) => {
                if (ret.precio) ret.precio = parseFloat(ret.precio.toString());
                return ret;
            }
        }
    }
);

module.exports = mongoose.model('Producto', ProductoSchema);