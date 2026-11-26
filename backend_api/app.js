const express = require('express');
const cors = require('cors');
const app = express();
const origenFront = process.env.FRONTEND_ORIGIN || 'http://localhost:5002';
app.disable('x-powered-by');
app.set('trust proxy', false);
app.use(cors({ origin: origenFront, credentials: true }));
app.use((req, res, next) => {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.headers.origin && req.headers.origin !== origenFront) {
        return res.status(403).json({ mensaje: 'Origen no permitido' });
    }
    next();
});
app.use(express.json({ limit: '100kb' }));
app.use('/api/sesion', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
app.use('/api/seguridad', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
app.get('/', (req, res) => res.json({ mensaje: 'API de Tico Stuff funcionando' }));
app.use('/api/sesion', require('./routes/sesionRoutes'));
app.use('/api/seguridad', require('./routes/seguridadRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/drops', require('./routes/dropRoutes'));
app.use('/api/inventario', require('./routes/inventarioRoutes'));
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const datos = { mensaje: 'No se pudo completar la operación' };
    let estado = error.status || 500;
    if (error.code === 11000) { estado = 409; datos.mensaje = 'Ya existe un registro con ese valor único'; }
    else if (error.name === 'ValidationError' || error.name === 'CastError' || error.type === 'entity.parse.failed') {
        estado = 400; datos.mensaje = 'Los datos enviados no son válidos';
    } else if (error.operacion_aplicada) {
        datos.mensaje = error.message; datos.operacion_aplicada = true;
    } else if (estado === 400 || error.message.startsWith('Campo no permitido') || error.message === 'Datos inválidos') {
        estado = 400; datos.mensaje = error.message;
    } else { console.error(error.message); }
    res.status(estado).json(datos);
});
module.exports = app;
