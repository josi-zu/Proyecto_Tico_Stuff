// Índices del Integrante 1. No elimina índices ni documentos.
// Ejecutar con mongosh --file indices.mongodb.js
const base = db.getSiblingDB('TicoStuff_BD');

// usuarios
base.usuarios.createIndex({"correo":1}, {"unique":true});
base.usuarios.createIndex({"rol_id":1,"estado":1}, {});

// roles_permisos
base.roles_permisos.createIndex({"nombre_rol":1}, {"unique":true});

// productos
base.productos.createIndex({"estado_publicacion":1,"fecha_registro":-1}, {});
base.productos.createIndex({"categoria_id":1,"fecha_registro":-1}, {});
base.productos.createIndex({"drop_id":1,"fecha_registro":-1}, {});
base.productos.createIndex({"nombre":"text","descripcion":"text","marca":"text"}, {"name":"busqueda_productos","default_language":"spanish"});

// categorias
base.categorias.createIndex({"slug":1}, {"unique":true});
base.categorias.createIndex({"estado":1,"nombre":1}, {});

// drops
base.drops.createIndex({"estado":1,"fecha_lanzamiento":-1}, {});

// inventario
base.inventario.createIndex({"sku":1}, {"unique":true});
base.inventario.createIndex({"producto_id":1}, {});

// pedidos
base.pedidos.createIndex({"numero_pedido":1}, {"unique":true});
base.pedidos.createIndex({"usuario_id":1,"fecha_pedido":-1}, {});

// direcciones_envio
base.direcciones_envio.createIndex({"usuario_id":1,"predeterminada":1}, {});

// contactos_soporte
base.contactos_soporte.createIndex({"estado":1,"fecha_solicitud":-1}, {});
base.contactos_soporte.createIndex({"usuario_id":1}, {});

// historial_notificaciones
base.historial_notificaciones.createIndex({"usuario_id":1,"fecha_envio":-1}, {});

// metodos_pago
base.metodos_pago.createIndex({"estado":1,"nombre":1}, {});

// bitacora_auditoria
base.bitacora_auditoria.createIndex({"fecha":-1,"_id":-1}, {});
base.bitacora_auditoria.createIndex({"coleccion":1,"fecha":-1,"_id":-1}, {});
base.bitacora_auditoria.createIndex({"usuario_id":1,"fecha":-1,"_id":-1}, {});

// Comprobar índices y uso de un índice:
// base.usuarios.getIndexes();
// base.usuarios.find({correo: "admin.local@ticostuff.example"}).explain("executionStats");
// base.productos.find({$text: {$search: "Nike"}}).explain("executionStats");
