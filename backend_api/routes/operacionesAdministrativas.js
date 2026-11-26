const mongoose = require('mongoose');
const { autenticar } = require('../middleware/autenticacion');
const { permitirRoles, exigirPermiso } = require('../middleware/permisos');
const { registrarAuditoria } = require('../services/auditoria');

// La misma seguridad y auditoría se aplica a los cuatro CRUD existentes.
function registrarRutasAdministrativas(router, Modelo, permiso) {
    const seguridad = [autenticar, permitirRoles('Administrador'), exigirPermiso(permiso)];
    const coleccion = Modelo.collection.collectionName;
    function camposPermitidos(cuerpo) {
        if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) throw new Error('Datos inválidos');
        const datos = {};
        for (const campo of Object.keys(cuerpo)) {
            if (!Object.hasOwn(Modelo.schema.paths, campo) || ['_id', '__v'].includes(campo)) throw new Error('Campo no permitido: ' + campo);
            datos[campo] = cuerpo[campo];
        }
        return datos;
    }
    function filtroVersion(documento) {
        return { _id: documento._id, __v: documento.__v === undefined ? { $exists: false } : documento.__v };
    }
    router.post('/', ...seguridad, async (req, res, next) => {
        try {
            const guardado = await new Modelo(camposPermitidos(req.body)).save();
            await registrarAuditoria(req, 'crear', coleccion, guardado._id, null, guardado);
            res.status(201).json({ mensaje: 'Registro creado correctamente', data: guardado });
        } catch (error) { next(error); }
    });
    router.put('/:id', ...seguridad, async (req, res, next) => {
        try {
            if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ mensaje: 'Identificador inválido' });
            const datos = camposPermitidos(req.body);
            if (Modelo.schema.paths.fecha_actualizacion) datos.fecha_actualizacion = new Date();
            const anteriores = await Modelo.findById(req.params.id).lean();
            if (!anteriores) return res.status(404).json({ mensaje: 'Registro no encontrado' });
            const actualizado = await Modelo.findOneAndUpdate(filtroVersion(anteriores),
                { $set: datos, $inc: { __v: 1 } }, { returnDocument: 'after', runValidators: true });
            if (!actualizado) return res.status(409).json({ mensaje: 'El registro cambió. Actualiza la página e intenta de nuevo' });
            await registrarAuditoria(req, 'actualizar', coleccion, actualizado._id, anteriores, actualizado);
            res.json({ mensaje: 'Registro actualizado correctamente', data: actualizado });
        } catch (error) { next(error); }
    });
    router.delete('/:id', ...seguridad, async (req, res, next) => {
        try {
            if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ mensaje: 'Identificador inválido' });
            const anteriores = await Modelo.findById(req.params.id).lean();
            if (!anteriores) return res.status(404).json({ mensaje: 'Registro no encontrado' });
            const eliminado = await Modelo.findOneAndDelete(filtroVersion(anteriores));
            if (!eliminado) return res.status(409).json({ mensaje: 'El registro cambió. Actualiza la página e intenta de nuevo' });
            await registrarAuditoria(req, 'eliminar', coleccion, eliminado._id, anteriores, null);
            res.json({ mensaje: 'Registro eliminado correctamente', data: req.params.id });
        } catch (error) { next(error); }
    });
}
module.exports = registrarRutasAdministrativas;
