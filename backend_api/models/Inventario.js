const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema(
  {
    producto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },

    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    talla: {
      type: String,
      required: true,
      trim: true
    },

    color: {
      type: String,
      required: true,
      trim: true
    },

    cantidad_disponible: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: 'La cantidad disponible debe ser un entero'
      }
    },

    cantidad_reservada: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: 'La cantidad reservada debe ser un entero'
      }
    },

    fecha_actualizacion: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'inventario',
    toJSON: { virtuals: true }
  }
);


// Indica si esta variante está agotada
InventarioSchema.virtual('agotado').get(function () {
  return this.cantidad_disponible === 0;
});

// Índice único por producto, talla y color
InventarioSchema.index(
  {
    producto_id: 1,
    talla: 1,
    color: 1
  },
  {
    unique: true,
    name: 'producto_talla_color_unico'
  }
);

// Exportar el modelo
module.exports = mongoose.model(
  'Inventario',
  InventarioSchema
);

