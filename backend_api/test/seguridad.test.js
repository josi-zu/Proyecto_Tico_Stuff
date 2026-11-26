const { test } = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const mongoose = require('mongoose');

// Nunca se usa la base del proyecto para las pruebas.
const nombreBD = 'TicoStuff_Pruebas_' + randomUUID().replaceAll('-', '');
process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/' + nombreBD;
const configurarBD = require('../scripts/configurarBD');
const app = require('../app');
const Usuario = require('../models/Usuario');
const Rol = require('../models/RolPermiso');
const Bitacora = require('../models/BitacoraAuditoria');
const Categoria = require('../models/Categoria');
const Drop = require('../models/Drop');
const Producto = require('../models/Producto');
const Inventario = require('../models/Inventario');
const { crearHash } = require('../services/password');

test('Seguridad y auditoría con MongoDB real en una base temporal', async t => {
    let servidor;
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    t.after(async () => {
        if (servidor) await new Promise(resolve => servidor.close(resolve));
        assert.equal(mongoose.connection.name, nombreBD);
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    });
    await configurarBD();
    await configurarBD(); // Debe poder repetirse sin duplicar datos ni índices.
    assert.equal(await Rol.countDocuments(), 2);
    const rolAdmin = await Rol.findOne({ nombre_rol: 'Administrador' });
    const rolCliente = await Rol.findOne({ nombre_rol: 'Cliente' });
    const password = 'Acceso-Prueba-12345';
    const hash = await crearHash(password);
    const admin = await Usuario.create({ nombre: 'Admin prueba', correo: 'admin@prueba.example', password_hash: hash, rol_id: rolAdmin._id });
    const cliente = await Usuario.create({ nombre: 'Cliente prueba', correo: 'cliente@prueba.example', password_hash: hash, rol_id: rolCliente._id });
    const categoria = await Categoria.create({ nombre: 'Base', slug: 'base' });
    const drop = await Drop.create({ nombre: 'Base', fecha_lanzamiento: new Date() });
    const producto = await Producto.create({ nombre: 'Nike de prueba', marca: 'Nike', precio: '15000.50', categoria_id: categoria._id, drop_id: drop._id });
    servidor = app.listen(0, '127.0.0.1');
    await new Promise(resolve => servidor.once('listening', resolve));
    const base = 'http://127.0.0.1:' + servidor.address().port;

    async function solicitud(ruta, metodo = 'GET', datos, cookie, cabeceras = {}) {
        const respuesta = await fetch(base + ruta, {
            method: metodo,
            headers: { ...(datos === undefined ? {} : { 'Content-Type': 'application/json' }), ...(cookie ? { Cookie: cookie } : {}), ...cabeceras },
            body: datos === undefined ? undefined : JSON.stringify(datos)
        });
        const texto = await respuesta.text();
        let cuerpo;
        try { cuerpo = JSON.parse(texto); } catch { cuerpo = texto; }
        return { estado: respuesta.status, cuerpo, headers: respuesta.headers };
    }
    async function login(correo) {
        const respuesta = await solicitud('/api/sesion/login', 'POST', { correo, password });
        assert.equal(respuesta.estado, 200);
        assert.equal(respuesta.cuerpo.password_hash, undefined);
        assert.match(respuesta.headers.get('set-cookie'), /HttpOnly/i);
        assert.match(respuesta.headers.get('set-cookie'), /SameSite=Strict/i);
        return respuesta.headers.getSetCookie().find(valor => /^tico_sesion=[a-f0-9]{64};/.test(valor)).split(';')[0];
    }

    await t.test('Consultas públicas y rechazo de escrituras anónimas o identidad inventada', async () => {
        for (const recurso of ['productos', 'categorias', 'drops', 'inventario']) {
            assert.equal((await solicitud('/api/' + recurso)).estado, 200);
            for (const metodo of ['POST', 'PUT', 'DELETE']) {
                const ruta = '/api/' + recurso + (metodo === 'POST' ? '' : '/' + producto._id);
                assert.equal((await solicitud(ruta, metodo, {}, null, { 'X-Usuario-Id': String(admin._id), 'X-Rol': 'Administrador' })).estado, 401);
            }
        }
        assert.equal((await solicitud('/api/seguridad/roles')).estado, 401);
        assert.equal((await solicitud('/api/seguridad/bitacora', 'GET', undefined, 'tico_sesion=falso')).estado, 401);
        assert.equal(await Bitacora.countDocuments(), 0);
    });

    let cookieCliente;
    let cookieAdmin;
    await t.test('Login mínimo, origen permitido y aislamiento del Cliente', async () => {
        assert.equal((await solicitud('/api/sesion/login', 'POST', { correo: { $ne: null }, password })).estado, 400);
        assert.equal((await solicitud('/api/sesion/login', 'POST', { correo: admin.correo, password: 'incorrecta' })).estado, 401);
        assert.equal((await solicitud('/api/sesion/login', 'POST', { correo: admin.correo, password }, null, { Origin: 'http://sitio-ajeno.example' })).estado, 403);
        cookieCliente = await login(cliente.correo);
        cookieAdmin = await login(admin.correo);
        for (const recurso of ['productos', 'categorias', 'drops', 'inventario']) {
            for (const metodo of ['POST', 'PUT', 'DELETE']) {
                const ruta = '/api/' + recurso + (metodo === 'POST' ? '' : '/' + producto._id);
                assert.equal((await solicitud(ruta, metodo, {}, cookieCliente)).estado, 403);
            }
        }
        assert.equal((await solicitud('/api/seguridad/roles', 'GET', undefined, cookieCliente)).estado, 403);
        assert.equal((await solicitud('/api/seguridad/bitacora', 'GET', undefined, cookieCliente)).estado, 403);
        assert.equal(await Bitacora.countDocuments(), 0);
    });

    await t.test('Crear, editar y eliminar los cuatro recursos registra antes, después, usuario e IP', async () => {
        const casos = [
            ['categorias', Categoria, { nombre: 'Categoría prueba', slug: 'categoria-prueba' }, { nombre: 'Categoría editada' }],
            ['drops', Drop, { nombre: 'Drop prueba', fecha_lanzamiento: '2026-11-25' }, { nombre: 'Drop editado' }],
            ['productos', Producto, { nombre: 'Producto prueba', marca: 'Nike', categoria_id: String(categoria._id), drop_id: String(drop._id), precio: '1000.50' }, { precio: '2500.75' }],
            ['inventario', Inventario, { producto_id: String(producto._id), sku: 'PRUEBA-M', talla: 'M', color: 'Negro', cantidad_disponible: 5 }, { cantidad_disponible: 3 }]
        ];
        for (const [recurso, Modelo, datos, cambios] of casos) {
            const creacion = await solicitud('/api/' + recurso, 'POST', datos, cookieAdmin, { 'X-Forwarded-For': '203.0.113.10' });
            assert.equal(creacion.estado, 201, JSON.stringify(creacion.cuerpo));
            const id = creacion.cuerpo.data._id;
            const creado = await Bitacora.findOne({ coleccion: recurso, documento_id: id, accion: 'crear' }).lean();
            assert.equal(String(creado.usuario_id), String(admin._id));
            assert.notEqual(String(creado.usuario_id), String(rolAdmin._id));
            assert.equal(creado.datos_anteriores, null);
            assert.equal(creado.datos_nuevos._id, id);
            assert.ok(creado.fecha instanceof Date);
            assert.ok(['127.0.0.1', '::ffff:127.0.0.1'].includes(creado.direccion_ip));
            const anterior = JSON.parse(JSON.stringify(await Modelo.findById(id).lean()));
            assert.equal((await solicitud('/api/' + recurso + '/' + id, 'PUT', cambios, cookieAdmin)).estado, 200);
            const actualizado = JSON.parse(JSON.stringify(await Modelo.findById(id).lean()));
            const editado = await Bitacora.findOne({ documento_id: id, accion: 'actualizar' }).lean();
            assert.deepEqual(editado.datos_anteriores, anterior);
            assert.deepEqual(editado.datos_nuevos, actualizado);
            assert.equal((await solicitud('/api/' + recurso + '/' + id, 'DELETE', undefined, cookieAdmin)).estado, 200);
            const eliminado = await Bitacora.findOne({ documento_id: id, accion: 'eliminar' }).lean();
            assert.deepEqual(eliminado.datos_anteriores, actualizado);
            assert.equal(eliminado.datos_nuevos, null);
            assert.equal(await Modelo.findById(id), null);
        }
        const bitacora = await solicitud('/api/seguridad/bitacora?coleccion=productos&accion=actualizar', 'GET', undefined, cookieAdmin);
        assert.equal(bitacora.estado, 200);
        assert.equal(bitacora.cuerpo.total, 1);
        assert.equal(bitacora.cuerpo.datos[0].usuario_id.correo, admin.correo);
        assert.equal(bitacora.cuerpo.datos[0].usuario_id.password_hash, undefined);
        assert.equal((await solicitud('/api/seguridad/roles', 'GET', undefined, cookieAdmin)).cuerpo.length, 2);
    });

    await t.test('Validación e índices únicos impiden cambios inválidos sin registrar éxitos falsos', async () => {
        const cantidad = await Bitacora.countDocuments();
        assert.equal((await solicitud('/api/categorias', 'POST', { slug: 'invalida' }, cookieAdmin)).estado, 400);
        assert.equal((await solicitud('/api/categorias', 'POST', { nombre: 'Duplicado', slug: 'base' }, cookieAdmin)).estado, 409);
        assert.equal((await solicitud('/api/categorias/' + categoria._id, 'PUT', { $set: { nombre: 'Inyectado' } }, cookieAdmin)).estado, 400);
        assert.equal((await solicitud('/api/categorias/no-es-id', 'PUT', { nombre: 'Inválido' }, cookieAdmin)).estado, 400);
        assert.equal((await solicitud('/api/categorias/' + new mongoose.Types.ObjectId(), 'DELETE', undefined, cookieAdmin)).estado, 404);
        assert.equal(await Bitacora.countDocuments(), cantidad);
        assert.equal((await Categoria.findById(categoria._id)).nombre, 'Base');
        assert.equal((await solicitud('/api/seguridad/bitacora?pagina=-1', 'GET', undefined, cookieAdmin)).estado, 400);
        const usuarioIndices = await mongoose.connection.db.collection('usuarios').indexes();
        assert.ok(usuarioIndices.some(indice => indice.key.correo === 1 && indice.unique));
        const busqueda = await solicitud('/api/productos?texto=Nike');
        assert.equal(busqueda.estado, 200);
        assert.equal(busqueda.cuerpo.length, 1);
        const plan = await mongoose.connection.db.collection('usuarios').find({ correo: admin.correo }).explain('executionStats');
        assert.equal(plan.executionStats.nReturned, 1);
        assert.equal(plan.executionStats.totalDocsExamined, 1);
        assert.ok(JSON.stringify(plan.queryPlanner.winningPlan).includes('IXSCAN'));
    });

    await t.test('Quitar permisos, desactivar cuentas/roles y cerrar sesión revoca el acceso', async () => {
        await Rol.updateOne({ _id: rolAdmin._id }, { $pull: { permisos: 'gestionar_categorias' } });
        assert.equal((await solicitud('/api/categorias', 'POST', { nombre: 'No', slug: 'no' }, cookieAdmin)).estado, 403);
        await Rol.updateOne({ _id: rolAdmin._id }, { $addToSet: { permisos: 'gestionar_categorias' } });
        await Usuario.updateOne({ _id: cliente._id }, { $set: { estado: 'inactivo' } });
        assert.equal((await solicitud('/api/sesion/actual', 'GET', undefined, cookieCliente)).estado, 401);
        await Rol.updateOne({ _id: rolAdmin._id }, { $set: { estado: 'inactivo' } });
        assert.equal((await solicitud('/api/sesion/actual', 'GET', undefined, cookieAdmin)).estado, 401);
        await Rol.updateOne({ _id: rolAdmin._id }, { $set: { estado: 'activo' } });
        cookieAdmin = await login(admin.correo);
        assert.equal((await solicitud('/api/sesion/logout', 'POST', {}, cookieAdmin)).estado, 200);
        assert.equal((await solicitud('/api/seguridad/roles', 'GET', undefined, cookieAdmin)).estado, 401);
        cookieAdmin = await login(admin.correo);
        const ahora = Date.now;
        const futuro = ahora() + 15 * 60 * 1000 + 1000;
        Date.now = () => futuro;
        try {
            assert.equal((await solicitud('/api/sesion/actual', 'GET', undefined, cookieAdmin)).estado, 401);
        } finally { Date.now = ahora; }
    });

    await t.test('Un fallo de auditoría se informa sin anunciar éxito ni ocultar la escritura aplicada', async () => {
        cookieAdmin = await login(admin.correo);
        const original = Bitacora.create;
        Bitacora.create = async () => { throw new Error('Fallo simulado de auditoría'); };
        try {
            const respuesta = await solicitud('/api/categorias', 'POST', { nombre: 'Fallo auditoría', slug: 'fallo-auditoria' }, cookieAdmin);
            assert.equal(respuesta.estado, 503);
            assert.equal(respuesta.cuerpo.operacion_aplicada, true);
            assert.ok(await Categoria.exists({ slug: 'fallo-auditoria' }));
        } finally { Bitacora.create = original; }
    });
});
