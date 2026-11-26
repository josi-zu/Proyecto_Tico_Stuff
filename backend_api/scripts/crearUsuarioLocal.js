// Herramienta local de integración. No es un registro público de usuarios.
require('dotenv').config();
const { randomBytes } = require('node:crypto');
const mongoose = require('mongoose');
const conectarBD = require('../config/conexion');
const Usuario = require('../models/Usuario');
const Rol = require('../models/RolPermiso');
const { crearHash } = require('../services/password');

async function ejecutar() {
    const [correo, nombreRol = 'Administrador'] = process.argv.slice(2);
    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !['Administrador', 'Cliente'].includes(nombreRol)) {
        throw new Error('Uso: npm run crear-usuario -- correo@ejemplo.com Administrador|Cliente');
    }
    await conectarBD();
    const rol = await Rol.findOne({ nombre_rol: nombreRol, estado: 'activo' });
    if (!rol) throw new Error('Ejecuta primero npm run configurar-bd');
    if (await Usuario.exists({ correo: correo.toLowerCase() })) throw new Error('El correo ya existe. No se modificó la cuenta');
    const password = process.env.NUEVO_USUARIO_PASSWORD || randomBytes(18).toString('base64url');
    await Usuario.create({ nombre: nombreRol + ' local', correo, password_hash: await crearHash(password), rol_id: rol._id });
    console.log('Cuenta local creada:', correo, '| Rol:', nombreRol);
    if (!process.env.NUEVO_USUARIO_PASSWORD) console.log('Contraseña generada (guárdala):', password);
}
ejecutar().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => mongoose.disconnect());
