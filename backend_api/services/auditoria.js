const Bitacora = require('../models/BitacoraAuditoria');

function limpiarDatos(valor) {
    if (valor === null || valor === undefined) return null;
    // Serializar sin transformar Decimal128 permite conservar los valores originales.
    const datos = valor.toObject ? valor.toObject({ transform: false }) : valor;
    return JSON.parse(JSON.stringify(datos), (campo, contenido) =>
        /password|contrase[nñ]a|token|secreto/i.test(campo) ? undefined : contenido);
}

async function registrarAuditoria(req, accion, coleccion, documentoId, anteriores, nuevos) {
    try {
        await Bitacora.create({
            usuario_id: req.usuario._id,
            accion, coleccion, documento_id: documentoId,
            descripcion: `${accion} documento en ${coleccion}`,
            datos_anteriores: limpiarDatos(anteriores),
            datos_nuevos: limpiarDatos(nuevos),
            // trust proxy permanece desactivado: no se confía en X-Forwarded-For.
            direccion_ip: req.ip,
            fecha: new Date()
        });
    } catch (causa) {
        console.error('No se pudo guardar la auditoría:', causa.message);
        const error = new Error('La operación se aplicó, pero no se pudo guardar la auditoría. Revisa la base antes de repetirla.');
        error.status = 503;
        error.operacion_aplicada = true;
        throw error;
    }
}

module.exports = { registrarAuditoria };
