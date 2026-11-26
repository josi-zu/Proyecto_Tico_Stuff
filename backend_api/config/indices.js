// createIndex es el mismo comando visto en la guía de índices.
// Se agregan índices sin eliminar los que ya tiene la base.
const indices = {
    usuarios: [[{ correo: 1 }, { unique: true }], [{ rol_id: 1, estado: 1 }]],
    roles_permisos: [[{ nombre_rol: 1 }, { unique: true }]],
    productos: [
        [{ estado_publicacion: 1, fecha_registro: -1 }],
        [{ categoria_id: 1, fecha_registro: -1 }], [{ drop_id: 1, fecha_registro: -1 }],
        [{ nombre: 'text', descripcion: 'text', marca: 'text' }, { name: 'busqueda_productos', default_language: 'spanish' }]
    ],
    categorias: [[{ slug: 1 }, { unique: true }], [{ estado: 1, nombre: 1 }]],
    drops: [[{ estado: 1, fecha_lanzamiento: -1 }]],
    inventario: [[{ sku: 1 }, { unique: true }], [{ producto_id: 1 }]],
    pedidos: [[{ numero_pedido: 1 }, { unique: true }], [{ usuario_id: 1, fecha_pedido: -1 }]],
    direcciones_envio: [[{ usuario_id: 1, predeterminada: 1 }]],
    contactos_soporte: [[{ estado: 1, fecha_solicitud: -1 }], [{ usuario_id: 1 }]],
    historial_notificaciones: [[{ usuario_id: 1, fecha_envio: -1 }]],
    metodos_pago: [[{ estado: 1, nombre: 1 }]],
    bitacora_auditoria: [[{ fecha: -1, _id: -1 }], [{ coleccion: 1, fecha: -1, _id: -1 }], [{ usuario_id: 1, fecha: -1, _id: -1 }]]
};
async function crearIndices(bd) {
    for (const [coleccion, definiciones] of Object.entries(indices)) {
        for (const [campos, opciones = {}] of definiciones) await bd.collection(coleccion).createIndex(campos, opciones);
    }
}
module.exports = { crearIndices, indices };
