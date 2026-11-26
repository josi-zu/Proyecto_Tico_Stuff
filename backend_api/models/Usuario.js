// Modelo mínimo para verificar la identidad. El módulo de perfiles puede ampliarlo.
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, trim: true },
    correo: { type: String, required: true, trim: true, lowercase: true },
    password_hash: { type: String, required: true, select: false },
    telefono: String,
    rol_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RolPermiso', required: true },
    fecha_registro: { type: Date, default: Date.now },
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
    preferencias: mongoose.Schema.Types.Mixed
}, { collection: 'usuarios' });

module.exports = mongoose.model('Usuario', UsuarioSchema);
