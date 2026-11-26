const mongoose = require('mongoose');

const RolPermisoSchema = new mongoose.Schema({
    nombre_rol: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    permisos: [{ type: String, trim: true }],
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
    fecha_creacion: { type: Date, default: Date.now }
}, { collection: 'roles_permisos' });

module.exports = mongoose.model('RolPermiso', RolPermisoSchema);
