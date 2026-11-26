[README.md](https://github.com/user-attachments/files/35440485/README.md)
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

Cada recurso (`productos`, `categorias`, `drops`, `inventario`) tiene:

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
