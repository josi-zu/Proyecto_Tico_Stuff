# Tico Stuff — Sistema web (SC-609 Base de Datos NoSQL)

Sistema web para Tico Stuff, tienda de reventa de ropa y accesorios (Nike, Supreme y Essentials).
Interfaz con HTML, jQuery y Bootstrap que consume una API RESTful hecha con Node.js, Express y
Mongoose sobre MongoDB.

**Integrantes:** Tommy Alfaro Miranda, Anthony Barrantes Lamugue, Luis Felipe Fernández Solano,
Danny Obando, Josimar Zuñiga.

## Módulos

| Módulo | Página | Funcionalidad |
|---|---|---|
| Catálogo público de productos | `catalogo.html` | Tarjetas con precio y disponibilidad |
| Búsqueda, filtros y detalle | `busqueda.html` | Búsqueda por texto, filtros y detalle en modal |
| Lanzamientos (Drops) | `drops.html` | CRUD completo |
| Categorías | `categorias.html` | CRUD completo |
| Inventario | `inventario.html` | CRUD completo |
| Productos (administración) | `productos.html` | CRUD completo |

## Estructura

```
Proyecto_Tico_Stuff/
├── backend_api/         API (Node.js + Express + Mongoose)
│   ├── models/          Categoria, Drop, Inventario, Producto
│   ├── routes/          categoriaRoutes, dropRoutes, inventarioRoutes, productoRoutes
│   ├── server.js
│   └── .env             (no se sube al repositorio)
├── frontend/            Interfaz web
│   ├── public/          HTML, css/, js/, img/, imagenes/
│   └── server.js        Publica la carpeta public
├── dump/                Respaldo de la base TicoStuff_BD
└── TicoStuff_BD_Completa.mongodb.js   Script que crea la base con datos
```

## Requisitos

- Node.js 20 o superior
- MongoDB Community Server (local, puerto 27017)
- Visual Studio Code con la extensión MongoDB (opcional, para cargar el script)

## Instrucciones de ejecución

### 1. Cargar la base de datos

Elige una opción:

- **Con VS Code:** conéctate a `mongodb://localhost:27017`, abre
  `TicoStuff_BD_Completa.mongodb.js` y presiona el botón ▶ (Play).
- **Con mongorestore:**
  ```bash
  mongorestore --db TicoStuff_BD dump/TicoStuff_BD
  ```

Se crea la base `TicoStuff_BD` con 12 colecciones.

### 2. Levantar el API (puerto 5001)

```bash
cd backend_api
npm install
```

Crea el archivo `.env` dentro de `backend_api` con:

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/TicoStuff_BD
```

Luego:

```bash
npm run dev
```

Debe mostrar `bd nosql conectada` y `Server API http://localhost:5001`.

### 3. Levantar el front-end (puerto 5002)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5002`.

## Endpoints del API

Cada recurso (`productos`, `categorias`, `drops`, `inventario`) tiene las siguientes rutas. Las consultas GET son públicas; POST, PUT y DELETE requieren sesión de Administrador y el permiso correspondiente:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/<recurso>` | Listar todos |
| GET | `/api/<recurso>/:id` | Obtener uno por id |
| POST | `/api/<recurso>` | Crear |
| PUT | `/api/<recurso>/:id` | Actualizar |
| DELETE | `/api/<recurso>/:id` | Eliminar |

Filtros de `GET /api/productos`: `q` (texto), `marca`, `categoria`, `drop`, `condicion`, `estado`.
Ejemplo: `/api/productos?q=nike&condicion=nuevo&estado=visible`.

## Tecnologías

Node.js, Express, Mongoose, MongoDB, cors, dotenv, HTML5, jQuery (AJAX), Bootstrap 5.

## Notas

- Las imágenes de los productos se guardan en `frontend/public/imagenes/` y se referencian
  desde el producto con rutas como `/imagenes/nike-frente.jpg`.
- Si el API o MongoDB no están corriendo, las páginas muestran un mensaje de error.


## Integrante 1 — Arquitectura, seguridad, auditoría e índices

La base del proyecto conserva Node.js, Express, Mongoose, jQuery y Bootstrap.
No se agregaron dependencias. El IEEE y los módulos de registro, recuperación,
perfiles, pedidos y soporte quedan fuera de este cambio.

### Configuración inicial

Después de instalar las dependencias y crear `backend_api/.env`, ejecuta:

```powershell
cd backend_api
npm run configurar-bd
```

Este comando crea las colecciones de roles y auditoría si hacen falta, agrega
los permisos base y crea índices en las doce colecciones. Conserva los roles,
permisos y documentos existentes. Puede repetirse sin duplicarlos. Si existen
correos, SKU, slugs, nombres de rol o números de pedido duplicados, el índice
único informa el conflicto; no borra los datos para resolverlo.

El `.env.example` contiene:

```dotenv
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/TicoStuff_BD
FRONTEND_ORIGIN=http://localhost:5002
```

Usa `http://localhost:5002` para abrir la interfaz, de modo que coincida con
el origen permitido. La configuración de conexión está en `config/conexion.js`;
`app.js` reúne las rutas y middleware y `server.js` inicia el servidor.

### Sesión mínima para integrar el control de acceso

Las cuentas de ejemplo que tienen `HASH_PENDIENTE` no permiten iniciar sesión.
Para crear una cuenta local sin modificar esas cuentas:

```powershell
npm run crear-usuario -- mi.admin@ejemplo.com Administrador
npm run crear-usuario -- mi.cliente@ejemplo.com Cliente
```

El comando muestra una contraseña aleatoria una sola vez. Guarda esa contraseña.
Repetirlo con un correo existente produce un error y conserva la cuenta.
También acepta `NUEVO_USUARIO_PASSWORD` como variable de entorno para una
contraseña de entre 10 y 128 caracteres; no la escribas en archivos del repositorio.

Luego ejecuta `npm run dev` en `backend_api` y en `frontend` y abre
`http://localhost:5002/sesion.html`. El Administrador puede consultar la página
`seguridad.html`, con roles y bitácora paginada. Cliente y visitantes conservan
las consultas públicas y no ven botones de escritura. El servidor comprueba
los permisos aunque se intente llamar directamente a las rutas.

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/api/sesion/login` | Correo y contraseña válidos |
| GET | `/api/sesion/actual` | Sesión activa |
| POST | `/api/sesion/logout` | Cierra la sesión |
| GET | `/api/seguridad/roles` | Administrador con `gestionar_roles` |
| GET | `/api/seguridad/bitacora` | Administrador con `consultar_bitacora` |

La bitácora acepta `coleccion`, `accion`, `usuario_id` y `pagina`; devuelve
hasta 50 registros por página, ordenados desde el más reciente.
La interfaz es de consulta: no se expone edición de roles ni borrado de auditoría.
Los roles base se configuran en `config/permisos.js` y se aplican con
`npm run configurar-bd`. Ese comando es de preparación local, no una ruta
administrativa de la aplicación, y vuelve a agregar los permisos base.

Las contraseñas se verifican mediante `scrypt`, incluido en `node:crypto`.
La sesión se mantiene en el servidor con una cookie `HttpOnly` y `SameSite=Strict`;
no se confía en roles o identificadores enviados por el navegador. Vence después
de 15 minutos sin solicitudes autenticadas. Las sesiones son locales a una
instancia del API y se pierden al reiniciarlo. El inicio de sesión limita los
intentos fallidos por IP. En producción, la cookie requiere HTTPS mediante
`NODE_ENV=production`.

Para integrar la autenticación del otro integrante, conserva el contrato de
`middleware/autenticacion.js`: verificar la identidad y cargar `req.usuario`
con su `_id` real y su `rol_id` poblado desde MongoDB. No se implementaron
registro público ni administración de perfiles.

### Permisos y auditoría de los CRUD existentes

| Recurso | Permiso exigido para POST, PUT y DELETE |
|---|---|
| Productos | `gestionar_productos` |
| Categorías | `gestionar_categorias` |
| Drops | `gestionar_drops` |
| Inventario | `gestionar_inventario` |

Las escrituras requieren el rol `Administrador` y el permiso de la tabla.
El middleware consulta el usuario y el rol en cada solicitud: quitar permisos
o desactivar una cuenta o un rol revoca el acceso sin esperar otro login.
Las rutas públicas no exponen datos de usuarios, roles o auditoría.

`routes/operacionesAdministrativas.js` reúne las escrituras protegidas para que
ninguna de las cuatro rutas omita la auditoría. Conserva los modelos y las
respuestas `mensaje` y `data` que usa el frontend. Solo acepta campos del modelo;
no acepta `_id`, `__v` ni operadores de actualización enviados por el cliente.
Usa la versión `__v` para rechazar con 409 una escritura que compita con otra.

`services/auditoria.js` guarda automáticamente:

- El `_id` del usuario autenticado, no el identificador de su rol.
- Acción, colección, documento, descripción y fecha.
- Datos anteriores y nuevos completos; crear usa `null` antes y eliminar usa `null` después.
- La IP de la conexión mediante `req.ip`, sin confiar en `X-Forwarded-For`.

Se excluyen contraseñas, hashes y tokens de los datos auditados. Las operaciones
rechazadas o inválidas no se registran como operaciones administrativas exitosas.
Los registros de ejemplo anteriores se conservan, incluso si sus referencias
a usuarios no coinciden con una cuenta; en ese caso la interfaz lo indica.

**Límite de la instancia local:** la escritura y la bitácora son dos operaciones
MongoDB. Si falla únicamente la auditoría después de aplicar el cambio, el API
devuelve 503 con `operacion_aplicada: true` y pide revisar el dato antes de
repetirlo. No afirma que hubo éxito completo ni revierte datos silenciosamente.
Garantizar que ambas operaciones sean atómicas requeriría transacciones sobre
un replica set, una configuración que no se agregó a este proyecto local.

### Índices y búsquedas

`config/indices.js` define índices simples, compuestos, únicos y uno de texto.
`indices.mongodb.js` contiene los comandos equivalentes para leerlos o ejecutarlos
directamente en mongosh. No es necesario ejecutar ambos métodos.

Los índices únicos protegen correo, nombre de rol, slug de categoría, SKU y
número de pedido. Los compuestos acompañan filtros y ordenamientos de catálogo,
drops, pedidos, direcciones, soporte, notificaciones y bitácora. También hay
índices para las referencias de inventario, categoría y drop.

Se conserva `?q=nike` para búsqueda parcial. Para utilizar el índice de texto
por palabras completas, la API acepta `?texto=Nike`:

```text
http://localhost:5001/api/productos?texto=Nike
```

Un índice normal no acelera por sí solo todas las búsquedas parciales con regex.
Puedes comprobar el plan en mongosh con los comandos de la guía de clase:

```javascript
use TicoStuff_BD
db.usuarios.getIndexes()
db.usuarios.find({correo: "admin.local@ticostuff.example"}).explain("executionStats")
db.productos.find({$text: {$search: "Nike"}}).explain("executionStats")
```

### Verificación

```powershell
cd backend_api
npm test
```

Las pruebas requieren MongoDB en `127.0.0.1:27017`. Crean una base con nombre
`TicoStuff_Pruebas_` y un identificador aleatorio, y la eliminan al terminar;
no usan `TicoStuff_BD`. Comprueban las consultas públicas, los rechazos 401/403,
los cuatro CRUD auditados, valores anteriores y nuevos, IP, índices únicos y
búsqueda de texto, revocación de permisos, expiración, cierre de sesión y el
aviso explícito cuando falla la auditoría. No hay que instalar otro framework.
