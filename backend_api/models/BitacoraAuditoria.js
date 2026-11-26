const mongoose = require('mongoose');

const BitacoraAuditoriaSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    accion: { type: String, enum: ['crear', 'actualizar', 'eliminar'], required: true },
    coleccion: { type: String, required: true },
    documento_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    descripcion: { type: String, required: true },
    datos_anteriores: { type: mongoose.Schema.Types.Mixed, default: null },
    datos_nuevos: { type: mongoose.Schema.Types.Mixed, default: null },
    direccion_ip: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
}, { collection: 'bitacora_auditoria', versionKey: false });

module.exports = mongoose.model('BitacoraAuditoria', BitacoraAuditoriaSchema);
