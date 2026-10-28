//Esta conectada mongodb://localhost:27017/

// The current database to use.


use("TicoStuff_BD");

db.createCollection("usuarios");
db.createCollection("roles_permisos");
db.createCollection("productos");
db.createCollection("categorias");
db.createCollection("drops");
db.createCollection("inventario");
db.createCollection("pedidos");
db.createCollection("direcciones_envio");
db.createCollection("contactos_soporte");
db.createCollection("historial_notificaciones");
db.createCollection("metodos_pago");
db.createCollection("bitacora_auditoria");


//Documentos coleccion roles_permisos
db.roles_permisos.insertMany([
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
  },
  {
    _id: ObjectId("000000000000000000000103"),
    nombre_rol: "Gestor de Inventario",
    descripcion: "Administra existencias y variantes",
    permisos: ["consultar_inventario", "actualizar_inventario"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000104"),
    nombre_rol: "Gestor de Productos",
    descripcion: "Administra el catalogo de productos",
    permisos: ["crear_productos", "editar_productos", "consultar_productos"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000105"),
    nombre_rol: "Gestor de Drops",
    descripcion: "Administra los lanzamientos",
    permisos: ["crear_drops", "editar_drops", "consultar_drops"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000106"),
    nombre_rol: "Ventas",
    descripcion: "Gestiona pedidos de clientes",
    permisos: ["consultar_pedidos", "actualizar_pedidos"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000107"),
    nombre_rol: "Soporte",
    descripcion: "Atiende solicitudes de clientes",
    permisos: ["consultar_soporte", "responder_soporte"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000108"),
    nombre_rol: "Marketing",
    descripcion: "Gestiona contenido promocional",
    permisos: ["consultar_productos", "consultar_drops", "gestionar_notificaciones"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000109"),
    nombre_rol: "Supervisor",
    descripcion: "Supervisa operaciones comerciales",
    permisos: ["consultar_pedidos", "consultar_inventario", "consultar_usuarios"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000110"),
    nombre_rol: "Encargado de Envios",
    descripcion: "Coordina entregas y envios",
    permisos: ["consultar_pedidos", "actualizar_envios"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000111"),
    nombre_rol: "Auditor",
    descripcion: "Consulta registros del sistema",
    permisos: ["consultar_bitacora", "consultar_inventario"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000112"),
    nombre_rol: "Analista",
    descripcion: "Consulta informacion para reportes",
    permisos: ["consultar_productos", "consultar_inventario", "consultar_pedidos"],
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  }
  
]);


//Documentos coleccion usuarios
db.usuarios.insertMany([
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
  },
  {
    _id: ObjectId("000000000000000000000203"),
    nombre: "Daniel",
    apellido: "Vargas",
    correo: "daniel@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2003",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-10"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Nike"],
      categorias_favoritas: ["Camisetas"]
    }
  },
  {
    _id: ObjectId("000000000000000000000204"),
    nombre: "Sofia",
    apellido: "Jimenez",
    correo: "sofia@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2004",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-11"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Essentials"],
      categorias_favoritas: ["Sudaderas"]
    }
  },
  {
    _id: ObjectId("000000000000000000000205"),
    nombre: "Luis",
    apellido: "Mendez",
    correo: "luis@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2005",
    rol_id: ObjectId("000000000000000000000103"),
    fecha_registro: new Date("2026-10-12"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: [],
      categorias_favoritas: []
    }
  },
  {
    _id: ObjectId("000000000000000000000206"),
    nombre: "Valeria",
    apellido: "Castro",
    correo: "valeria@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2006",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-13"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Supreme", "Nike"],
      categorias_favoritas: ["Camisetas", "Gorras"]
    }
  },
  {
    _id: ObjectId("000000000000000000000207"),
    nombre: "Jose",
    apellido: "Alvarado",
    correo: "jose@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2007",
    rol_id: ObjectId("000000000000000000000104"),
    fecha_registro: new Date("2026-10-14"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: [],
      categorias_favoritas: []
    }
  },
  {
    _id: ObjectId("000000000000000000000208"),
    nombre: "Camila",
    apellido: "Rojas",
    correo: "camila@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2008",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-15"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Adidas"],
      categorias_favoritas: ["Tenis"]
    }
  },
  {
    _id: ObjectId("000000000000000000000209"),
    nombre: "Sebastian",
    apellido: "Solano",
    correo: "sebastian@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2009",
    rol_id: ObjectId("000000000000000000000105"),
    fecha_registro: new Date("2026-10-16"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: [],
      categorias_favoritas: []
    }
  },
  {
    _id: ObjectId("000000000000000000000210"),
    nombre: "Mariana",
    apellido: "Araya",
    correo: "mariana@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2010",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-17"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Nike", "Essentials"],
      categorias_favoritas: ["Sudaderas", "Pantalones"]
    }
  },
  {
    _id: ObjectId("000000000000000000000211"),
    nombre: "Diego",
    apellido: "Herrera",
    correo: "diego@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2011",
    rol_id: ObjectId("000000000000000000000106"),
    fecha_registro: new Date("2026-10-18"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: [],
      categorias_favoritas: []
    }
  },
  {
    _id: ObjectId("000000000000000000000212"),
    nombre: "Natalia",
    apellido: "Campos",
    correo: "natalia@example.com",
    password_hash: "HASH_PENDIENTE",
    telefono: "8888-2012",
    rol_id: ObjectId("000000000000000000000102"),
    fecha_registro: new Date("2026-10-19"),
    estado: "activo",
    preferencias: {
      marcas_favoritas: ["Supreme"],
      categorias_favoritas: ["Accesorios"]
    }
  }
]);


//Documentos coleccion categorias
db.categorias.insertMany([
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
  },
  {
    _id: ObjectId("000000000000000000000303"),
    nombre: "Pantalones",
    descripcion: "Jeans, joggers y pantalones casuales",
    slug: "pantalones",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000304"),
    nombre: "Tenis",
    descripcion: "Calzado deportivo y urbano",
    slug: "tenis",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000305"),
    nombre: "Gorras",
    descripcion: "Gorras de diferentes marcas",
    slug: "gorras",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000306"),
    nombre: "Accesorios",
    descripcion: "Complementos de moda urbana",
    slug: "accesorios",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000307"),
    nombre: "Shorts",
    descripcion: "Pantalones cortos deportivos y casuales",
    slug: "shorts",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000308"),
    nombre: "Chaquetas",
    descripcion: "Chaquetas para diferentes estilos",
    slug: "chaquetas",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000309"),
    nombre: "Medias",
    descripcion: "Medias deportivas y casuales",
    slug: "medias",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000310"),
    nombre: "Bolsos",
    descripcion: "Mochilas, bolsos y canguros",
    slug: "bolsos",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000311"),
    nombre: "Camisas",
    descripcion: "Camisas casuales de diferentes marcas",
    slug: "camisas",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  },
  {
    _id: ObjectId("000000000000000000000312"),
    nombre: "Conjuntos",
    descripcion: "Conjuntos de dos o mas prendas",
    slug: "conjuntos",
    estado: "activo",
    fecha_creacion: new Date("2026-10-15")
  }
]);


//Documentos coleccion drops
db.drops.insertMany([
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
  },
   {
    _id: ObjectId("000000000000000000000403"),
    nombre: "Drop Noviembre 2026",
    descripcion: "Lanzamiento de moda urbana",
    fecha_lanzamiento: new Date("2026-11-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-noviembre.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000404"),
    nombre: "Drop Diciembre 2026",
    descripcion: "Coleccion especial de fin de año",
    fecha_lanzamiento: new Date("2026-12-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-diciembre.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000405"),
    nombre: "Drop Enero 2027",
    descripcion: "Nueva coleccion de inicio de año",
    fecha_lanzamiento: new Date("2027-01-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-enero.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000406"),
    nombre: "Drop Febrero 2027",
    descripcion: "Lanzamiento de prendas casuales",
    fecha_lanzamiento: new Date("2027-02-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-febrero.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000407"),
    nombre: "Drop Marzo 2027",
    descripcion: "Coleccion de camisetas y accesorios",
    fecha_lanzamiento: new Date("2027-03-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-marzo.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000408"),
    nombre: "Drop Abril 2027",
    descripcion: "Coleccion de ropa deportiva",
    fecha_lanzamiento: new Date("2027-04-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-abril.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000409"),
    nombre: "Drop Mayo 2027",
    descripcion: "Lanzamiento de tenis y complementos",
    fecha_lanzamiento: new Date("2027-05-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-mayo.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000410"),
    nombre: "Drop Junio 2027",
    descripcion: "Coleccion de ropa urbana",
    fecha_lanzamiento: new Date("2027-06-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-junio.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000411"),
    nombre: "Drop Julio 2027",
    descripcion: "Coleccion especial de accesorios",
    fecha_lanzamiento: new Date("2027-07-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-julio.jpg",
    fecha_creacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000412"),
    nombre: "Drop Agosto 2027",
    descripcion: "Coleccion de nuevas tendencias",
    fecha_lanzamiento: new Date("2027-08-15"),
    estado: "programado",
    imagen_portada: "/imagenes/drop-agosto.jpg",
    fecha_creacion: new Date("2026-10-20")
  }
]);

//Documentos coleccion productos
db.productos.insertMany([
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
  },
   {
    _id: ObjectId("000000000000000000000503"),
    nombre: "Supreme Box Logo T-Shirt",
    descripcion: "Camiseta urbana Supreme",
    marca: "Supreme",
    categoria_id: ObjectId("000000000000000000000301"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("45000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/supreme-tshirt.jpg"],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000504"),
    nombre: "Nike Club Joggers",
    descripcion: "Pantalon deportivo Nike",
    marca: "Nike",
    categoria_id: ObjectId("000000000000000000000303"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("35000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/nike-joggers.jpg"],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000505"),
    nombre: "Adidas Forum Low",
    descripcion: "Tenis Adidas estilo urbano",
    marca: "Adidas",
    categoria_id: ObjectId("000000000000000000000304"),
    drop_id: ObjectId("000000000000000000000401"),
    precio: NumberDecimal("65000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/adidas-forum.jpg"],
    fecha_registro: new Date("2026-09-15"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000506"),
    nombre: "Supreme Camp Cap",
    descripcion: "Gorra Supreme casual",
    marca: "Supreme",
    categoria_id: ObjectId("000000000000000000000305"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("30000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/supreme-cap.jpg"],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000507"),
    nombre: "Nike Everyday Socks",
    descripcion: "Medias deportivas Nike",
    marca: "Nike",
    categoria_id: ObjectId("000000000000000000000309"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("8500.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/nike-socks.jpg"],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000508"),
    nombre: "Essentials Sweatpants",
    descripcion: "Pantalon Essentials",
    marca: "Essentials",
    categoria_id: ObjectId("000000000000000000000303"),
    drop_id: ObjectId("000000000000000000000401"),
    precio: NumberDecimal("48000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/essentials-pants.jpg"],
    fecha_registro: new Date("2026-09-15"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000509"),
    nombre: "Nike Windrunner Jacket",
    descripcion: "Chaqueta deportiva Nike",
    marca: "Nike",
    categoria_id: ObjectId("000000000000000000000308"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("52000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/nike-jacket.jpg"],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000510"),
    nombre: "Adidas Classic Backpack",
    descripcion: "Mochila casual Adidas",
    marca: "Adidas",
    categoria_id: ObjectId("000000000000000000000310"),
    drop_id: ObjectId("000000000000000000000401"),
    precio: NumberDecimal("28000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/adidas-backpack.jpg"],
    fecha_registro: new Date("2026-09-15"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000511"),
    nombre: "Nike Club Shorts",
    descripcion: "Short deportivo Nike",
    marca: "Nike",
    categoria_id: ObjectId("000000000000000000000307"),
    drop_id: ObjectId("000000000000000000000402"),
    precio: NumberDecimal("24000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/nike-shorts.jpg"],
    fecha_registro: new Date("2026-10-10"),
    estado_publicacion: "visible"
  },
  {
    _id: ObjectId("000000000000000000000512"),
    nombre: "Supreme Shoulder Bag",
    descripcion: "Bolso compacto Supreme",
    marca: "Supreme",
    categoria_id: ObjectId("000000000000000000000310"),
    drop_id: ObjectId("000000000000000000000401"),
    precio: NumberDecimal("38000.00"),
    condicion: "nuevo",
    imagenes: ["/imagenes/supreme-bag.jpg"],
    fecha_registro: new Date("2026-09-15"),
    estado_publicacion: "visible"
  }
]);

//Documentos coleccion inventario
db.inventario.insertMany([
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
  },
  {
    _id: ObjectId("000000000000000000000605"),
    producto_id: ObjectId("000000000000000000000503"),
    sku: "SUP-TSH-BLK-M",
    talla: "M",
    color: "Negro",
    cantidad_disponible: 4,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000606"),
    producto_id: ObjectId("000000000000000000000504"),
    sku: "NIKE-JOG-GRY-L",
    talla: "L",
    color: "Gris",
    cantidad_disponible: 6,
    cantidad_reservada: 1,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000607"),
    producto_id: ObjectId("000000000000000000000505"),
    sku: "ADI-FOR-WHT-9",
    talla: "9 US",
    color: "Blanco",
    cantidad_disponible: 0,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000608"),
    producto_id: ObjectId("000000000000000000000506"),
    sku: "SUP-CAP-BLK-UNI",
    talla: "Unica",
    color: "Negro",
    cantidad_disponible: 5,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000609"),
    producto_id: ObjectId("000000000000000000000507"),
    sku: "NIKE-SOC-WHT-M",
    talla: "M",
    color: "Blanco",
    cantidad_disponible: 12,
    cantidad_reservada: 2,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000610"),
    producto_id: ObjectId("000000000000000000000508"),
    sku: "ESS-PNT-GRY-L",
    talla: "L",
    color: "Gris",
    cantidad_disponible: 0,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000611"),
    producto_id: ObjectId("000000000000000000000509"),
    sku: "NIKE-JAC-BLU-M",
    talla: "M",
    color: "Azul",
    cantidad_disponible: 3,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000612"),
    producto_id: ObjectId("000000000000000000000510"),
    sku: "ADI-BAG-BLK-UNI",
    talla: "Unica",
    color: "Negro",
    cantidad_disponible: 8,
    cantidad_reservada: 1,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000613"),
    producto_id: ObjectId("000000000000000000000511"),
    sku: "NIKE-SHO-BLK-L",
    talla: "L",
    color: "Negro",
    cantidad_disponible: 7,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  },
  {
    _id: ObjectId("000000000000000000000614"),
    producto_id: ObjectId("000000000000000000000512"),
    sku: "SUP-BAG-RED-UNI",
    talla: "Unica",
    color: "Rojo",
    cantidad_disponible: 0,
    cantidad_reservada: 0,
    fecha_actualizacion: new Date("2026-10-20")
  }
]);


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
