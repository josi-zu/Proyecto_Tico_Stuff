import { API } from './confi.js';

// Página principal: consume el API con fetch() y muestra un resumen de la tienda
async function cargarResumen() {
    const estado = document.getElementById("estadoApi");

    try {
        const [resProductos, resDrops, resCategorias] = await Promise.all([
            fetch(API.Productos),
            fetch(API.Drops),
            fetch(API.Categorias)
        ]);

        if (!resProductos.ok || !resDrops.ok || !resCategorias.ok) {
            throw new Error("El API respondió con un error");
        }

        const productos = await resProductos.json();
        const drops = await resDrops.json();
        const categorias = await resCategorias.json();

        estado.className = "alert alert-success";
        estado.textContent =
            `API conectada: ${productos.length} productos, ` +
            `${categorias.length} categorías y ${drops.length} drops.`;
    } catch (error) {
        estado.className = "alert alert-danger";
        estado.textContent =
            "No se pudo conectar con el API. ¿Está corriendo en el puerto 5001?";
        console.error(error);
    }
}

cargarResumen();