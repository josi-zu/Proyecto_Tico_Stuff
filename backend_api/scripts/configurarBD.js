require('dotenv').config();
const mongoose = require('mongoose');
const conectarBD = require('../config/conexion');
const Rol = require('../models/RolPermiso');
const Bitacora = require('../models/BitacoraAuditoria');
const { permisosAdministrador, permisosCliente } = require('../config/permisos');
const { crearIndices } = require('../config/indices');

async function configurarBD() {
    await Rol.createCollection();
    await Bitacora.createCollection();
    for (const [nombre, permisos, descripcion] of [
        ['Administrador', permisosAdministrador, 'Gestiona el sistema de Tico Stuff'],
        ['Cliente', permisosCliente, 'Usuario registrado de la tienda']
    ]) {
        await Rol.updateOne({ nombre_rol: nombre }, {
            $setOnInsert: { descripcion, estado: 'activo', fecha_creacion: new Date() },
            $addToSet: { permisos: { $each: permisos } }
        }, { upsert: true, runValidators: true });
    }
    await crearIndices(mongoose.connection.db);
}
if (require.main === module) {
    conectarBD().then(configurarBD)
        .then(() => console.log('Roles base e índices configurados. Datos existentes conservados.'))
        .catch(error => { console.error('No se pudo configurar la base:', error.message); process.exitCode = 1; })
        .finally(() => mongoose.disconnect());
}
module.exports = configurarBD;
