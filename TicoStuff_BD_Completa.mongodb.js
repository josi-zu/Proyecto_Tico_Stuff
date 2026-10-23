//Esta conectada mongodb://localhost:27017/

// The current database to use.
use("TicoStuff_BD");

/*db.createCollection("usuarios");
db.createCollection("roles_permisos");
db.createCollection("productos");
db.createCollection("categorias");
db.createCollection("drops");
db.createCollection("inventario");*/
db.createCollection("pedidos");
db.createCollection("direcciones_envio");
db.createCollection("contactos_soporte");
db.createCollection("historial_notificaciones");
db.createCollection("metodos_pago");
db.createCollection("bitacora_auditoria");


//Documentos coleccion usuarios
/*db.roles_permisos.insertMany([
  {
    _id: ObjectId('000000000000000000000201'),
    nombre: 'Carlos',
    apellido: 'Ramirez',
    correo: 'admin@ticostuff.example',
    password_hash: 'HASH_PENDIENTE',
    telefono: '8888-1111',
    rol_id: ObjectId('000000000000000000000101'),
    fecha_registro: ISODate('2026-10-02T00:00:00.000Z'),
    estado: 'activo',
    preferencias: {
      marcas_favoritas: [],
      categorias_favoritas: []
    }
  },
  {
    _id: ObjectId('000000000000000000000202'),
    nombre: 'Andrea',
    apellido: 'Mora',
    correo: 'andrea@example.com',
    password_hash: 'HASH_PENDIENTE',
    telefono: '8888-2222',
    rol_id: ObjectId('000000000000000000000102'),
    fecha_registro: ISODate('2026-10-05T00:00:00.000Z'),
    estado: 'activo',
    preferencias: {
      marcas_favoritas: [
        'Nike',
        'Supreme'
      ],
      categorias_favoritas: [
        'Camisetas',
        'Sudaderas'
      ]
    }
  }

]);*/
///Documentos coleccion roles_permisos
/*db.roles_permisos.insertMany([
  {
    _id: ObjectId("000000000000000000000101"),
    nombre_rol: "Administrador",
    descripcion: "Gestiona el sistema de Tico Stuff",
    permisos: [
      "gestionar_productos",
      "gestionar_inventario",
      "gestionar_drops",
      "gestionar_pedidos",
      "gestionar_usuarios"
    ],
    estado: "activo",
    fecha_creacion: new Date("2026-10-01")
  },
  {
    _id: ObjectId("000000000000000000000102"),
    nombre_rol: "Cliente",
    descripcion: "Usuario registrado de la tienda",
    permisos: [
      "consultar_productos",
      "gestionar_perfil",
      "crear_pedidos",
      "consultar_pedidos"
    ],
    estado: "activo",
    fecha_creacion: new Date("2026-10-01")
  }
]);*/

///Documentos coleccion usuarios
/*db.usuarios.insertMany([
  {
    _id: ObjectId("000000000000000000000201"),
    nombre: "Carlos",
    apellido: "Ramirez",
    correo: "admin@ticostuff.example",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-1111",
    rol_id: ObjectId("000000000000000000000101"),
    fecha_registro: new Date("2026-10-02"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: [],
      categorias_favoritas: []
    }
  },
  {
    _id: ObjectId("000000000000000000000202"),
    nombre: "Andrea",
    apellido: "Mora",
    correo: "andrea@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2222",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-05"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Nike", "Supreme"],
      categorias_favoritas: ["Camisetas", "Sudaderas"]
    }
  }
]);*/

//Documentos coleccion categorias
/*db.categorias.insertMany([
  {
    _id: ObjectId("000000000000000000000301"),
    nombre: "Camisetas",
    descripcion: "Camisetas de marcas reconocidas",
    slug: "camisetas",
    estado: "activo",
    fecha_creacion: new Date("2026-10-01")
  },
  {
    _id: ObjectId("000000000000000000000302"),
    nombre: "Sudaderas",
    descripcion: "Hoodies y sudaderas de distintas marcas",
    slug: "sudaderas",
    estado: "activo",
    fecha_creacion: new Date("2026-10-01")
  }
]);*/

//Documentos coleccion drops
/*db.drops.insertMany([
  {
    _id: ObjectId("000000000000000000000401"),
    nombre: "Drop Septiembre 2026",
    descripcion: "Lanzamiento de regreso de Tico Stuff",
    fecha_lanzamiento: new Date("2026-09-15"),
    estado: "finalizado",
    imagen_portada: "por definir",
    fecha_creacion: new Date("2026-09-10")
  },
  {
    _id: ObjectId("000000000000000000000402"),
    nombre: "Drop Octubre 2026",
    descripcion: "Lanzamiento de prendas Nike y Essentials",
    fecha_lanzamiento: new Date("2026-10-10"),
    estado: "publicado",
    imagen_portada: "por definir",
    fecha_creacion: new Date("2026-10-01")
  }
]);*/

//Documentos coleccion productos
/*db.productos.insertMany([
  {
    _id: ObjectId("000000000000000000000501"),
    nombre: "Nike Sportswear T-Shirt",
    descripcion: "Camiseta Nike de algodón",
    marca: "Nike",
    categoria_id: ObjectId("000000000000000000000301"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("25000.00"),
    condicion: "nuevo",
    imagenes: [
      "/imagenes/nike-frente.jpg", //ejemplo de URL
      "/imagenes/nike-espalda.jpg"
    ],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000502"),
    nombre: "Essentials Hoodie",
    descripcion: "Sudadera Essentials con capucha",
    marca: "Essentials",
    categoria_id: ObjectId("000000000000000000000302"),
    drop_id: ObjectId("000000000000000000000401"),
    precio: NumberDecimal("55000.00"),
    condicion: "nuevo",
    imagenes: [
      "/imagenes/essentials-frente.jpg",
      "/imagenes/essentials-espalda.jpg"
    ],
    fecha_registro: new Date("2026-09-15"),
    estado_publicacion: "visible"
  }
]);*/

//Documentos coleccion inventario
/*db.inventario.insertMany([
  {
    _id: ObjectId("000000000000000000000601"),
    producto_id: ObjectId("000000000000000000000501"),
    sku: "NIKE-TSH-BLK-M",
    talla: "M",
    color: "Negro",
    cantidad_disponible: 5,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-12")
  },
  {
    _id: ObjectId("000000000000000000000602"),
    producto_id: ObjectId("000000000000000000000501"),
    sku: "NIKE-TSH-BLK-L",
    talla: "L",
    color: "Negro",
    cantidad_disponible: 3,
    cantidad_reservada: 1,
    fecha_actualizacion: new Date("2026-10-12")
  },
  {
    _id: ObjectId("000000000000000000000603"),
    producto_id: ObjectId("000000000000000000000501"),
    sku: "NIKE-TSH-WHT-M",
    talla: "M",
    color: "Blanco",
    cantidad_disponible: 2,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-12")
  },
  {
    _id: ObjectId("000000000000000000000604"),
    producto_id: ObjectId("000000000000000000000502"),
    sku: "ESS-HOOD-GRY-M",
    talla: "M",
    color: "Gris",
    cantidad_disponible: 0,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-12")
  }
]);*/

//Documentos coleccion pedidos
db.pedidos.insertMany([
  {
    _id: ObjectId("000000000000000000000701"),
    usuario_id: ObjectId("000000000000000000000202"),
    numero_pedido: "PED-2026-001",
    productos: [
      {
        producto_id: ObjectId("000000000000000000000501"),
        inventario_id: ObjectId("000000000000000000000601"),
        nombre: "Nike Sportswear T-Shirt",
        talla: "M",
        color: "Negro",
        cantidad: 1,
        precio_unitario: NumberDecimal("25000.00")
      }
    ],
    direccion_envio_id: ObjectId("000000000000000000000801"),
    metodo_pago_id: ObjectId("000000000000000000001101"),
    subtotal: NumberDecimal("25000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("27500.00"),
    estado: "confirmado",
    fecha_pedido: new Date("2026-10-15"),
    fecha_actualizacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000702"),
    usuario_id: ObjectId("000000000000000000000202"),
    numero_pedido: "PED-2026-002",
    productos: [
      {
        producto_id: ObjectId("000000000000000000000502"),
        inventario_id: ObjectId("000000000000000000000604"),
        nombre: "Essentials Hoodie",
        talla: "M",
        color: "Gris",
        cantidad: 1,
        precio_unitario: NumberDecimal("55000.00")
      }
    ],
    direccion_envio_id: ObjectId("000000000000000000000802"),
    metodo_pago_id: ObjectId("000000000000000000001102"),
    subtotal: NumberDecimal("55000.00"),
    costo_envio: NumberDecimal("3000.00"),
    total: NumberDecimal("58000.00"),
    estado: "pendiente",
    fecha_pedido: new Date("2026-10-18"),
    fecha_actualizacion: new Date("2026-10-18")
  }
]);

//Documentos coleccion direcciones_envio
db.direcciones_envio.insertMany([
  {
    _id: ObjectId("000000000000000000000801"),
    usuario_id: ObjectId("000000000000000000000202"),
    nombre_receptor: "Andrea Mora",
    telefono: "8888-2222",
    provincia: "Alajuela",
    canton: "Alajuela",
    distrito: "Desamparados",
    direccion_exacta: "200 metros norte de la iglesia principal",
    referencia: "Casa color blanco con porton negro",
    predeterminada: true,
    fecha_registro: new Date("2026-10-05"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000802"),
    usuario_id: ObjectId("000000000000000000000202"),
    nombre_receptor: "Andrea Mora",
    telefono: "8888-2222",
    provincia: "San Jose",
    canton: "San Jose",
    distrito: "Carmen",
    direccion_exacta: "Oficina ubicada frente al parque central",
    referencia: "Edificio de tres pisos",
    predeterminada: false,
    fecha_registro: new Date("2026-10-10"),
    estado: "activo"
  }
]);

//Documentos coleccion contactos_soporte
db.contactos_soporte.insertMany([
  {
    _id: ObjectId("000000000000000000000901"),
    usuario_id: ObjectId("000000000000000000000202"),
    tipo_solicitud: "pedido",
    asunto: "Consulta sobre estado del pedido",
    mensaje: "Deseo conocer el estado actual de mi pedido PED-2026-001.",
    correo_contacto: "andrea@example.com",
    estado: "en_proceso",
    seguimiento: [
      {
        fecha: new Date("2026-10-16"),
        usuario_id: ObjectId("000000000000000000000101"),
        comentario: "Solicitud recibida y en revision."
      }
    ],
    fecha_solicitud: new Date("2026-10-16"),
    fecha_actualizacion: new Date("2026-10-16")
  },
  {
    _id: ObjectId("000000000000000000000902"),
    usuario_id: ObjectId("000000000000000000000202"),
    tipo_solicitud: "producto",
    asunto: "Disponibilidad de talla",
    mensaje: "Quisiera saber si volvera a estar disponible la talla L de la camiseta Nike.",
    correo_contacto: "andrea@example.com",
    estado: "pendiente",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-20"),
    fecha_actualizacion: new Date("2026-10-20")
  }
]);

//Documentos coleccion historial_notificaciones
db.historial_notificaciones.insertMany([
  {
    _id: ObjectId("000000000000000000001001"),
    usuario_id: ObjectId("000000000000000000000202"),
    pedido_id: ObjectId("000000000000000000000701"),
    soporte_id: null,
    tipo: "confirmacion_pedido",
    canal: "correo",
    destinatario: "andrea@example.com",
    asunto: "Confirmacion de pedido PED-2026-001",
    mensaje: "Su pedido fue registrado correctamente.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000001002"),
    usuario_id: ObjectId("000000000000000000000202"),
    pedido_id: null,
    soporte_id: ObjectId("000000000000000000000901"),
    tipo: "soporte",
    canal: "correo",
    destinatario: "andrea@example.com",
    asunto: "Solicitud de soporte recibida",
    mensaje: "Hemos recibido su solicitud y sera atendida por nuestro equipo.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-16")
  }
]);

//Documentos coleccion metodos_pago
db.metodos_pago.insertMany([
  {
    _id: ObjectId("000000000000000000001101"),
    nombre: "SINPE Movil",
    tipo: "transferencia",
    descripcion: "Pago mediante SINPE Movil.",
    instrucciones: "Realizar el pago al numero indicado por Tico Stuff y enviar el comprobante.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-01"),
    fecha_actualizacion: new Date("2026-10-01")
  },
  {
    _id: ObjectId("000000000000000000001102"),
    nombre: "Transferencia bancaria",
    tipo: "transferencia",
    descripcion: "Pago mediante transferencia bancaria.",
    instrucciones: "Transferir el monto total a la cuenta bancaria indicada por Tico Stuff.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-01"),
    fecha_actualizacion: new Date("2026-10-01")
  }
]);

//Documentos coleccion bitacora_auditoria
db.bitacora_auditoria.insertMany([
  {
    _id: ObjectId("000000000000000000001201"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "actualizar",
    coleccion: "inventario",
    documento_id: ObjectId("000000000000000000000601"),
    descripcion: "Actualizacion de cantidad disponible del inventario.",
    datos_anteriores: {
      cantidad_disponible: 6
    },
    datos_nuevos: {
      cantidad_disponible: 5
    },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-12T10:30:00")
  },
  {
    _id: ObjectId("000000000000000000001202"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "crear",
    coleccion: "drops",
    documento_id: ObjectId("000000000000000000000402"),
    descripcion: "Creacion del Drop Octubre 2026.",
    datos_anteriores: null,
    datos_nuevos: {
      nombre: "Drop Octubre 2026",
      estado: "publicado"
    },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-01T09:00:00")
  }
]);
