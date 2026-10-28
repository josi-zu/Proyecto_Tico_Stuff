



use("TicoStuff_BD");


// Se eliminan los dos registros adicionales en inventario para dejarla en 12.
db.inventario.deleteMany({
  _id: {
    $in: [
      ObjectId("000000000000000000000613"),
      ObjectId("000000000000000000000614")
    ]
  }
});



// ============================================================
// 8. direcciones_envio 
// ============================================================
db.direcciones_envio.insertMany([
  {
    _id: ObjectId("000000000000000000000803"),
    usuario_id: ObjectId("000000000000000000000203"),
    nombre_receptor: "Daniel Vargas",
    telefono: "8888-2003",
    provincia: "San Jose",
    canton: "Escazu",
    distrito: "San Rafael",
    direccion_exacta: "150 metros este del parque central",
    referencia: "Casa de porton gris",
    predeterminada: true,
    fecha_registro: new Date("2026-10-10"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000804"),
    usuario_id: ObjectId("000000000000000000000204"),
    nombre_receptor: "Sofia Jimenez",
    telefono: "8888-2004",
    provincia: "Heredia",
    canton: "Heredia",
    distrito: "Mercedes",
    direccion_exacta: "300 metros norte de la escuela",
    referencia: "Casa color beige",
    predeterminada: true,
    fecha_registro: new Date("2026-10-11"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000805"),
    usuario_id: ObjectId("000000000000000000000205"),
    nombre_receptor: "Luis Mendez",
    telefono: "8888-2005",
    provincia: "Alajuela",
    canton: "Alajuela",
    distrito: "San Jose",
    direccion_exacta: "100 metros oeste del supermercado",
    referencia: "Apartamento numero 4",
    predeterminada: true,
    fecha_registro: new Date("2026-10-12"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000806"),
    usuario_id: ObjectId("000000000000000000000206"),
    nombre_receptor: "Valeria Castro",
    telefono: "8888-2006",
    provincia: "Cartago",
    canton: "Cartago",
    distrito: "Oriental",
    direccion_exacta: "200 metros sur de la basilica",
    referencia: "Casa con verjas negras",
    predeterminada: true,
    fecha_registro: new Date("2026-10-13"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000807"),
    usuario_id: ObjectId("000000000000000000000207"),
    nombre_receptor: "Jose Alvarado",
    telefono: "8888-2007",
    provincia: "San Jose",
    canton: "Desamparados",
    distrito: "San Miguel",
    direccion_exacta: "75 metros norte de la iglesia",
    referencia: "Casa esquinera",
    predeterminada: true,
    fecha_registro: new Date("2026-10-14"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000808"),
    usuario_id: ObjectId("000000000000000000000208"),
    nombre_receptor: "Camila Rojas",
    telefono: "8888-2008",
    provincia: "Heredia",
    canton: "Belen",
    distrito: "La Ribera",
    direccion_exacta: "400 metros oeste del centro comercial",
    referencia: "Condominio, casa 12",
    predeterminada: true,
    fecha_registro: new Date("2026-10-15"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000809"),
    usuario_id: ObjectId("000000000000000000000209"),
    nombre_receptor: "Sebastian Solano",
    telefono: "8888-2009",
    provincia: "Alajuela",
    canton: "Grecia",
    distrito: "Grecia",
    direccion_exacta: "250 metros sur del parque",
    referencia: "Casa azul",
    predeterminada: true,
    fecha_registro: new Date("2026-10-16"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000810"),
    usuario_id: ObjectId("000000000000000000000210"),
    nombre_receptor: "Mariana Araya",
    telefono: "8888-2010",
    provincia: "San Jose",
    canton: "Montes de Oca",
    distrito: "San Pedro",
    direccion_exacta: "100 metros este de la universidad",
    referencia: "Edificio blanco, segundo piso",
    predeterminada: true,
    fecha_registro: new Date("2026-10-17"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000811"),
    usuario_id: ObjectId("000000000000000000000211"),
    nombre_receptor: "Diego Herrera",
    telefono: "8888-2011",
    provincia: "Cartago",
    canton: "La Union",
    distrito: "Tres Rios",
    direccion_exacta: "175 metros oeste de la plaza",
    referencia: "Casa con porton verde",
    predeterminada: true,
    fecha_registro: new Date("2026-10-18"),
    estado: "activo"
  },
  {
    _id: ObjectId("000000000000000000000812"),
    usuario_id: ObjectId("000000000000000000000212"),
    nombre_receptor: "Natalia Campos",
    telefono: "8888-2012",
    provincia: "Heredia",
    canton: "Santo Domingo",
    distrito: "Santo Domingo",
    direccion_exacta: "225 metros norte del parque",
    referencia: "Casa numero 18",
    predeterminada: true,
    fecha_registro: new Date("2026-10-19"),
    estado: "activo"
  }
]);

// ============================================================
// 11. metodos_pago 
// ============================================================
db.metodos_pago.insertMany([
  {
    _id: ObjectId("000000000000000000001103"),
    nombre: "Tarjeta de credito",
    tipo: "tarjeta",
    descripcion: "Pago mediante tarjeta de credito.",
    instrucciones: "Completar el proceso de pago con los datos solicitados por la plataforma.",
    requiere_comprobante: false,
    estado: "activo",
    fecha_creacion: new Date("2026-10-02"),
    fecha_actualizacion: new Date("2026-10-02")
  },
  {
    _id: ObjectId("000000000000000000001104"),
    nombre: "Tarjeta de debito",
    tipo: "tarjeta",
    descripcion: "Pago mediante tarjeta de debito.",
    instrucciones: "Completar el proceso de pago con los datos solicitados por la plataforma.",
    requiere_comprobante: false,
    estado: "activo",
    fecha_creacion: new Date("2026-10-02"),
    fecha_actualizacion: new Date("2026-10-02")
  },
  {
    _id: ObjectId("000000000000000000001105"),
    nombre: "Efectivo contra entrega",
    tipo: "efectivo",
    descripcion: "Pago en efectivo al momento de recibir el pedido.",
    instrucciones: "Entregar el monto exacto al encargado de la entrega.",
    requiere_comprobante: false,
    estado: "activo",
    fecha_creacion: new Date("2026-10-03"),
    fecha_actualizacion: new Date("2026-10-03")
  },
  {
    _id: ObjectId("000000000000000000001106"),
    nombre: "Deposito bancario",
    tipo: "deposito",
    descripcion: "Pago mediante deposito en cuenta bancaria.",
    instrucciones: "Depositar el monto total y enviar el comprobante.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-03"),
    fecha_actualizacion: new Date("2026-10-03")
  },
  {
    _id: ObjectId("000000000000000000001107"),
    nombre: "Pago en tienda",
    tipo: "presencial",
    descripcion: "Pago realizado directamente al retirar el pedido.",
    instrucciones: "Presentar el numero de pedido al momento del retiro.",
    requiere_comprobante: false,
    estado: "activo",
    fecha_creacion: new Date("2026-10-04"),
    fecha_actualizacion: new Date("2026-10-04")
  },
  {
    _id: ObjectId("000000000000000000001108"),
    nombre: "Transferencia BAC",
    tipo: "transferencia",
    descripcion: "Transferencia a cuenta bancaria BAC.",
    instrucciones: "Realizar la transferencia y enviar el comprobante.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-04"),
    fecha_actualizacion: new Date("2026-10-04")
  },
  {
    _id: ObjectId("000000000000000000001109"),
    nombre: "Transferencia BCR",
    tipo: "transferencia",
    descripcion: "Transferencia a cuenta bancaria BCR.",
    instrucciones: "Realizar la transferencia y enviar el comprobante.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-05"),
    fecha_actualizacion: new Date("2026-10-05")
  },
  {
    _id: ObjectId("000000000000000000001110"),
    nombre: "Transferencia BN",
    tipo: "transferencia",
    descripcion: "Transferencia a cuenta bancaria del Banco Nacional.",
    instrucciones: "Realizar la transferencia y enviar el comprobante.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-05"),
    fecha_actualizacion: new Date("2026-10-05")
  },
  {
    _id: ObjectId("000000000000000000001111"),
    nombre: "Enlace de pago",
    tipo: "enlace",
    descripcion: "Pago mediante enlace electronico generado para el pedido.",
    instrucciones: "Abrir el enlace recibido y completar el pago.",
    requiere_comprobante: false,
    estado: "activo",
    fecha_creacion: new Date("2026-10-06"),
    fecha_actualizacion: new Date("2026-10-06")
  },
  {
    _id: ObjectId("000000000000000000001112"),
    nombre: "Pago QR",
    tipo: "qr",
    descripcion: "Pago mediante codigo QR.",
    instrucciones: "Escanear el codigo QR y completar el pago.",
    requiere_comprobante: true,
    estado: "activo",
    fecha_creacion: new Date("2026-10-06"),
    fecha_actualizacion: new Date("2026-10-06")
  }
]);

// ============================================================
// 7. pedidos 
// ============================================================
db.pedidos.insertMany([
  {
    _id: ObjectId("000000000000000000000703"),
    usuario_id: ObjectId("000000000000000000000203"),
    numero_pedido: "PED-2026-003",
    productos: [{
      producto_id: ObjectId("000000000000000000000503"),
      inventario_id: ObjectId("000000000000000000000605"),
      nombre: "Supreme Box Logo T-Shirt",
      talla: "M",
      color: "Negro",
      cantidad: 1,
      precio_unitario: NumberDecimal("45000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000803"),
    metodo_pago_id: ObjectId("000000000000000000001103"),
    subtotal: NumberDecimal("45000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("47500.00"),
    estado: "confirmado",
    fecha_pedido: new Date("2026-10-20"),
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000704"),
    usuario_id: ObjectId("000000000000000000000204"),
    numero_pedido: "PED-2026-004",
    productos: [{
      producto_id: ObjectId("000000000000000000000504"),
      inventario_id: ObjectId("000000000000000000000606"),
      nombre: "Nike Club Joggers",
      talla: "L",
      color: "Gris",
      cantidad: 1,
      precio_unitario: NumberDecimal("35000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000804"),
    metodo_pago_id: ObjectId("000000000000000000001104"),
    subtotal: NumberDecimal("35000.00"),
    costo_envio: NumberDecimal("3000.00"),
    total: NumberDecimal("38000.00"),
    estado: "pendiente",
    fecha_pedido: new Date("2026-10-21"),
    fecha_actualizacion: new Date("2026-10-21")
  },
  {
    _id: ObjectId("000000000000000000000705"),
    usuario_id: ObjectId("000000000000000000000205"),
    numero_pedido: "PED-2026-005",
    productos: [{
      producto_id: ObjectId("000000000000000000000506"),
      inventario_id: ObjectId("000000000000000000000608"),
      nombre: "Supreme Camp Cap",
      talla: "Unica",
      color: "Negro",
      cantidad: 1,
      precio_unitario: NumberDecimal("30000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000805"),
    metodo_pago_id: ObjectId("000000000000000000001105"),
    subtotal: NumberDecimal("30000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("32500.00"),
    estado: "confirmado",
    fecha_pedido: new Date("2026-10-21"),
    fecha_actualizacion: new Date("2026-10-21")
  },
  {
    _id: ObjectId("000000000000000000000706"),
    usuario_id: ObjectId("000000000000000000000206"),
    numero_pedido: "PED-2026-006",
    productos: [{
      producto_id: ObjectId("000000000000000000000507"),
      inventario_id: ObjectId("000000000000000000000609"),
      nombre: "Nike Everyday Socks",
      talla: "M",
      color: "Blanco",
      cantidad: 2,
      precio_unitario: NumberDecimal("8500.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000806"),
    metodo_pago_id: ObjectId("000000000000000000001106"),
    subtotal: NumberDecimal("17000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("19500.00"),
    estado: "en_preparacion",
    fecha_pedido: new Date("2026-10-22"),
    fecha_actualizacion: new Date("2026-10-22")
  },
  {
    _id: ObjectId("000000000000000000000707"),
    usuario_id: ObjectId("000000000000000000000207"),
    numero_pedido: "PED-2026-007",
    productos: [{
      producto_id: ObjectId("000000000000000000000509"),
      inventario_id: ObjectId("000000000000000000000611"),
      nombre: "Nike Windrunner Jacket",
      talla: "M",
      color: "Azul",
      cantidad: 1,
      precio_unitario: NumberDecimal("52000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000807"),
    metodo_pago_id: ObjectId("000000000000000000001107"),
    subtotal: NumberDecimal("52000.00"),
    costo_envio: NumberDecimal("3000.00"),
    total: NumberDecimal("55000.00"),
    estado: "confirmado",
    fecha_pedido: new Date("2026-10-22"),
    fecha_actualizacion: new Date("2026-10-22")
  },
  {
    _id: ObjectId("000000000000000000000708"),
    usuario_id: ObjectId("000000000000000000000208"),
    numero_pedido: "PED-2026-008",
    productos: [{
      producto_id: ObjectId("000000000000000000000510"),
      inventario_id: ObjectId("000000000000000000000612"),
      nombre: "Adidas Classic Backpack",
      talla: "Unica",
      color: "Negro",
      cantidad: 1,
      precio_unitario: NumberDecimal("28000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000808"),
    metodo_pago_id: ObjectId("000000000000000000001108"),
    subtotal: NumberDecimal("28000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("30500.00"),
    estado: "enviado",
    fecha_pedido: new Date("2026-10-23"),
    fecha_actualizacion: new Date("2026-10-24")
  },
  {
    _id: ObjectId("000000000000000000000709"),
    usuario_id: ObjectId("000000000000000000000209"),
    numero_pedido: "PED-2026-009",
    productos: [{
      producto_id: ObjectId("000000000000000000000501"),
      inventario_id: ObjectId("000000000000000000000602"),
      nombre: "Nike Sportswear T-Shirt",
      talla: "L",
      color: "Negro",
      cantidad: 1,
      precio_unitario: NumberDecimal("25000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000809"),
    metodo_pago_id: ObjectId("000000000000000000001109"),
    subtotal: NumberDecimal("25000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("27500.00"),
    estado: "pendiente",
    fecha_pedido: new Date("2026-10-24"),
    fecha_actualizacion: new Date("2026-10-24")
  },
  {
    _id: ObjectId("000000000000000000000710"),
    usuario_id: ObjectId("000000000000000000000210"),
    numero_pedido: "PED-2026-010",
    productos: [{
      producto_id: ObjectId("000000000000000000000503"),
      inventario_id: ObjectId("000000000000000000000605"),
      nombre: "Supreme Box Logo T-Shirt",
      talla: "M",
      color: "Negro",
      cantidad: 1,
      precio_unitario: NumberDecimal("45000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000810"),
    metodo_pago_id: ObjectId("000000000000000000001110"),
    subtotal: NumberDecimal("45000.00"),
    costo_envio: NumberDecimal("3000.00"),
    total: NumberDecimal("48000.00"),
    estado: "confirmado",
    fecha_pedido: new Date("2026-10-25"),
    fecha_actualizacion: new Date("2026-10-25")
  },
  {
    _id: ObjectId("000000000000000000000711"),
    usuario_id: ObjectId("000000000000000000000211"),
    numero_pedido: "PED-2026-011",
    productos: [{
      producto_id: ObjectId("000000000000000000000506"),
      inventario_id: ObjectId("000000000000000000000608"),
      nombre: "Supreme Camp Cap",
      talla: "Unica",
      color: "Negro",
      cantidad: 1,
      precio_unitario: NumberDecimal("30000.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000811"),
    metodo_pago_id: ObjectId("000000000000000000001111"),
    subtotal: NumberDecimal("30000.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("32500.00"),
    estado: "entregado",
    fecha_pedido: new Date("2026-10-25"),
    fecha_actualizacion: new Date("2026-10-27")
  },
  {
    _id: ObjectId("000000000000000000000712"),
    usuario_id: ObjectId("000000000000000000000212"),
    numero_pedido: "PED-2026-012",
    productos: [{
      producto_id: ObjectId("000000000000000000000507"),
      inventario_id: ObjectId("000000000000000000000609"),
      nombre: "Nike Everyday Socks",
      talla: "M",
      color: "Blanco",
      cantidad: 1,
      precio_unitario: NumberDecimal("8500.00")
    }],
    direccion_envio_id: ObjectId("000000000000000000000812"),
    metodo_pago_id: ObjectId("000000000000000000001112"),
    subtotal: NumberDecimal("8500.00"),
    costo_envio: NumberDecimal("2500.00"),
    total: NumberDecimal("11000.00"),
    estado: "confirmado",
    fecha_pedido: new Date("2026-10-27"),
    fecha_actualizacion: new Date("2026-10-27")
  }
]);

// ============================================================
// 9. contactos_soporte 
// ============================================================
db.contactos_soporte.insertMany([
  {
    _id: ObjectId("000000000000000000000903"),
    usuario_id: ObjectId("000000000000000000000203"),
    tipo_solicitud: "pedido",
    asunto: "Consulta de fecha de entrega",
    mensaje: "Deseo conocer la fecha estimada de entrega de mi pedido PED-2026-003.",
    correo_contacto: "daniel@example.com",
    estado: "resuelta",
    seguimiento: [{
      fecha: new Date("2026-10-21"),
      usuario_id: ObjectId("000000000000000000000107"),
      comentario: "Se informo al cliente la fecha estimada de entrega."
    }],
    fecha_solicitud: new Date("2026-10-20"),
    fecha_actualizacion: new Date("2026-10-21")
  },
  {
    _id: ObjectId("000000000000000000000904"),
    usuario_id: ObjectId("000000000000000000000204"),
    tipo_solicitud: "pago",
    asunto: "Consulta sobre metodo de pago",
    mensaje: "Necesito confirmar si puedo pagar con tarjeta de debito.",
    correo_contacto: "sofia@example.com",
    estado: "resuelta",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-21"),
    fecha_actualizacion: new Date("2026-10-21")
  },
  {
    _id: ObjectId("000000000000000000000905"),
    usuario_id: ObjectId("000000000000000000000205"),
    tipo_solicitud: "producto",
    asunto: "Consulta de color",
    mensaje: "Quisiera conocer si la gorra Supreme esta disponible en otro color.",
    correo_contacto: "luis@example.com",
    estado: "pendiente",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-22"),
    fecha_actualizacion: new Date("2026-10-22")
  },
  {
    _id: ObjectId("000000000000000000000906"),
    usuario_id: ObjectId("000000000000000000000206"),
    tipo_solicitud: "pedido",
    asunto: "Cambio de direccion",
    mensaje: "Deseo actualizar la direccion de entrega de mi pedido.",
    correo_contacto: "valeria@example.com",
    estado: "en_proceso",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-22"),
    fecha_actualizacion: new Date("2026-10-22")
  },
  {
    _id: ObjectId("000000000000000000000907"),
    usuario_id: ObjectId("000000000000000000000207"),
    tipo_solicitud: "producto",
    asunto: "Informacion de chaqueta",
    mensaje: "Necesito informacion adicional sobre la chaqueta Nike.",
    correo_contacto: "jose@example.com",
    estado: "resuelta",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-23"),
    fecha_actualizacion: new Date("2026-10-23")
  },
  {
    _id: ObjectId("000000000000000000000908"),
    usuario_id: ObjectId("000000000000000000000208"),
    tipo_solicitud: "envio",
    asunto: "Seguimiento de envio",
    mensaje: "Deseo consultar el estado del envio de mi pedido.",
    correo_contacto: "camila@example.com",
    estado: "en_proceso",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-24"),
    fecha_actualizacion: new Date("2026-10-24")
  },
  {
    _id: ObjectId("000000000000000000000909"),
    usuario_id: ObjectId("000000000000000000000209"),
    tipo_solicitud: "pago",
    asunto: "Comprobante de transferencia",
    mensaje: "Deseo confirmar que mi comprobante de transferencia fue recibido.",
    correo_contacto: "sebastian@example.com",
    estado: "pendiente",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-24"),
    fecha_actualizacion: new Date("2026-10-24")
  },
  {
    _id: ObjectId("000000000000000000000910"),
    usuario_id: ObjectId("000000000000000000000210"),
    tipo_solicitud: "pedido",
    asunto: "Confirmacion de pedido",
    mensaje: "Quiero confirmar que el pedido PED-2026-010 fue registrado correctamente.",
    correo_contacto: "mariana@example.com",
    estado: "resuelta",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-25"),
    fecha_actualizacion: new Date("2026-10-25")
  },
  {
    _id: ObjectId("000000000000000000000911"),
    usuario_id: ObjectId("000000000000000000000211"),
    tipo_solicitud: "entrega",
    asunto: "Pedido entregado",
    mensaje: "Deseo confirmar la recepcion del pedido PED-2026-011.",
    correo_contacto: "diego@example.com",
    estado: "resuelta",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-27"),
    fecha_actualizacion: new Date("2026-10-27")
  },
  {
    _id: ObjectId("000000000000000000000912"),
    usuario_id: ObjectId("000000000000000000000212"),
    tipo_solicitud: "producto",
    asunto: "Disponibilidad de producto",
    mensaje: "Quisiera saber si habra nuevas unidades de medias Nike.",
    correo_contacto: "natalia@example.com",
    estado: "pendiente",
    seguimiento: [],
    fecha_solicitud: new Date("2026-10-27"),
    fecha_actualizacion: new Date("2026-10-27")
  }
]);

// ============================================================
// 10. historial_notificaciones 
// ============================================================
db.historial_notificaciones.insertMany([
  {
    _id: ObjectId("000000000000000000001003"),
    usuario_id: ObjectId("000000000000000000000203"),
    pedido_id: ObjectId("000000000000000000000703"),
    soporte_id: ObjectId("000000000000000000000903"),
    tipo: "actualizacion_pedido",
    canal: "correo",
    destinatario: "daniel@example.com",
    asunto: "Actualizacion de pedido PED-2026-003",
    mensaje: "Su pedido se encuentra confirmado.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000001004"),
    usuario_id: ObjectId("000000000000000000000204"),
    pedido_id: ObjectId("000000000000000000000704"),
    soporte_id: ObjectId("000000000000000000000904"),
    tipo: "confirmacion_solicitud",
    canal: "correo",
    destinatario: "sofia@example.com",
    asunto: "Solicitud de soporte recibida",
    mensaje: "Hemos recibido su consulta sobre metodos de pago.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-21")
  },
  {
    _id: ObjectId("000000000000000000001005"),
    usuario_id: ObjectId("000000000000000000000205"),
    pedido_id: ObjectId("000000000000000000000705"),
    soporte_id: ObjectId("000000000000000000000905"),
    tipo: "soporte",
    canal: "correo",
    destinatario: "luis@example.com",
    asunto: "Solicitud de producto recibida",
    mensaje: "Su consulta de producto fue registrada.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-22")
  },
  {
    _id: ObjectId("000000000000000000001006"),
    usuario_id: ObjectId("000000000000000000000206"),
    pedido_id: ObjectId("000000000000000000000706"),
    soporte_id: ObjectId("000000000000000000000906"),
    tipo: "soporte",
    canal: "correo",
    destinatario: "valeria@example.com",
    asunto: "Solicitud de cambio recibida",
    mensaje: "Su solicitud de cambio de direccion esta en proceso.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-22")
  },
  {
    _id: ObjectId("000000000000000000001007"),
    usuario_id: ObjectId("000000000000000000000207"),
    pedido_id: ObjectId("000000000000000000000707"),
    soporte_id: ObjectId("000000000000000000000907"),
    tipo: "soporte",
    canal: "correo",
    destinatario: "jose@example.com",
    asunto: "Consulta de producto atendida",
    mensaje: "Su consulta sobre la chaqueta Nike fue atendida.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-23")
  },
  {
    _id: ObjectId("000000000000000000001008"),
    usuario_id: ObjectId("000000000000000000000208"),
    pedido_id: ObjectId("000000000000000000000708"),
    soporte_id: ObjectId("000000000000000000000908"),
    tipo: "actualizacion_envio",
    canal: "correo",
    destinatario: "camila@example.com",
    asunto: "Pedido enviado",
    mensaje: "Su pedido PED-2026-008 fue enviado.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-24")
  },
  {
    _id: ObjectId("000000000000000000001009"),
    usuario_id: ObjectId("000000000000000000000209"),
    pedido_id: ObjectId("000000000000000000000709"),
    soporte_id: ObjectId("000000000000000000000909"),
    tipo: "pago",
    canal: "correo",
    destinatario: "sebastian@example.com",
    asunto: "Comprobante recibido",
    mensaje: "Su consulta sobre el comprobante fue registrada.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-24")
  },
  {
    _id: ObjectId("000000000000000000001010"),
    usuario_id: ObjectId("000000000000000000000210"),
    pedido_id: ObjectId("000000000000000000000710"),
    soporte_id: ObjectId("000000000000000000000910"),
    tipo: "confirmacion_pedido",
    canal: "correo",
    destinatario: "mariana@example.com",
    asunto: "Confirmacion de pedido PED-2026-010",
    mensaje: "Su pedido fue registrado correctamente.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-25")
  },
  {
    _id: ObjectId("000000000000000000001011"),
    usuario_id: ObjectId("000000000000000000000211"),
    pedido_id: ObjectId("000000000000000000000711"),
    soporte_id: ObjectId("000000000000000000000911"),
    tipo: "entrega",
    canal: "correo",
    destinatario: "diego@example.com",
    asunto: "Pedido entregado PED-2026-011",
    mensaje: "El pedido fue marcado como entregado.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-27")
  },
  {
    _id: ObjectId("000000000000000000001012"),
    usuario_id: ObjectId("000000000000000000000212"),
    pedido_id: ObjectId("000000000000000000000712"),
    soporte_id: ObjectId("000000000000000000000912"),
    tipo: "soporte",
    canal: "correo",
    destinatario: "natalia@example.com",
    asunto: "Solicitud de producto recibida",
    mensaje: "Su consulta sobre disponibilidad fue registrada.",
    estado: "enviado",
    fecha_envio: new Date("2026-10-27")
  }
]);

// ============================================================
// 12. bitacora_auditoria 
// ============================================================
db.bitacora_auditoria.insertMany([
  {
    _id: ObjectId("000000000000000000001203"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "crear",
    coleccion: "pedidos",
    documento_id: ObjectId("000000000000000000000703"),
    descripcion: "Creacion del pedido PED-2026-003.",
    datos_anteriores: null,
    datos_nuevos: { estado: "confirmado" },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-20T10:00:00")
  },
  {
    _id: ObjectId("000000000000000000001204"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "actualizar",
    coleccion: "pedidos",
    documento_id: ObjectId("000000000000000000000704"),
    descripcion: "Actualizacion del estado del pedido PED-2026-004.",
    datos_anteriores: { estado: "creado" },
    datos_nuevos: { estado: "pendiente" },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-21T11:15:00")
  },
  {
    _id: ObjectId("000000000000000000001205"),
    usuario_id: ObjectId("000000000000000000000107"),
    accion: "actualizar",
    coleccion: "contactos_soporte",
    documento_id: ObjectId("000000000000000000000903"),
    descripcion: "Resolucion de solicitud de soporte.",
    datos_anteriores: { estado: "en_proceso" },
    datos_nuevos: { estado: "resuelta" },
    direccion_ip: "192.168.1.20",
    fecha: new Date("2026-10-21T14:30:00")
  },
  {
    _id: ObjectId("000000000000000000001206"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "crear",
    coleccion: "metodos_pago",
    documento_id: ObjectId("000000000000000000001103"),
    descripcion: "Registro del metodo de pago Tarjeta de credito.",
    datos_anteriores: null,
    datos_nuevos: { estado: "activo" },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-22T09:00:00")
  },
  {
    _id: ObjectId("000000000000000000001207"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "crear",
    coleccion: "direcciones_envio",
    documento_id: ObjectId("000000000000000000000806"),
    descripcion: "Registro de una nueva direccion de envio.",
    datos_anteriores: null,
    datos_nuevos: { estado: "activo" },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-22T12:00:00")
  },
  {
    _id: ObjectId("000000000000000000001208"),
    usuario_id: ObjectId("000000000000000000000106"),
    accion: "actualizar",
    coleccion: "pedidos",
    documento_id: ObjectId("000000000000000000000708"),
    descripcion: "Actualizacion del pedido a estado enviado.",
    datos_anteriores: { estado: "confirmado" },
    datos_nuevos: { estado: "enviado" },
    direccion_ip: "192.168.1.30",
    fecha: new Date("2026-10-24T16:45:00")
  },
  {
    _id: ObjectId("000000000000000000001209"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "crear",
    coleccion: "historial_notificaciones",
    documento_id: ObjectId("000000000000000000001008"),
    descripcion: "Registro de notificacion de envio.",
    datos_anteriores: null,
    datos_nuevos: { estado: "enviado" },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-24T17:00:00")
  },
  {
    _id: ObjectId("000000000000000000001210"),
    usuario_id: ObjectId("000000000000000000000101"),
    accion: "actualizar",
    coleccion: "pedidos",
    documento_id: ObjectId("000000000000000000000710"),
    descripcion: "Confirmacion del pedido PED-2026-010.",
    datos_anteriores: { estado: "pendiente" },
    datos_nuevos: { estado: "confirmado" },
    direccion_ip: "192.168.1.10",
    fecha: new Date("2026-10-25T13:20:00")
  },
  {
    _id: ObjectId("000000000000000000001211"),
    usuario_id: ObjectId("000000000000000000000106"),
    accion: "actualizar",
    coleccion: "pedidos",
    documento_id: ObjectId("000000000000000000000711"),
    descripcion: "Actualizacion del pedido a estado entregado.",
    datos_anteriores: { estado: "enviado" },
    datos_nuevos: { estado: "entregado" },
    direccion_ip: "192.168.1.30",
    fecha: new Date("2026-10-27T15:10:00")
  },
  {
    _id: ObjectId("000000000000000000001212"),
    usuario_id: ObjectId("000000000000000000000107"),
    accion: "crear",
    coleccion: "contactos_soporte",
    documento_id: ObjectId("000000000000000000000912"),
    descripcion: "Registro de solicitud sobre disponibilidad de producto.",
    datos_anteriores: null,
    datos_nuevos: { estado: "pendiente" },
    direccion_ip: "192.168.1.20",
    fecha: new Date("2026-10-27T16:00:00")
  }
]);

