import { API } from './confi.js';
import { esc, formatearPrecio } from './utilidades.js';

$(document).ready(function () {
    cargarCatalogo();
});

function cargarCatalogo() {
    // Dos consultas en paralelo: productos visibles e inventario
    const peticionProductos = $.ajax({
        type: "GET",
        url: `${API.Productos}?estado=visible`,
        dataType: "json"
    });

    const peticionInventario = $.ajax({
        type: "GET",
        url: API.Inventario,
        dataType: "json"
    });

    $.when(peticionProductos, peticionInventario)
        .done(function (resProductos, resInventario) {
            const productos = resProductos[0];
            const inventario = resInventario[0];
            mostrarProductos(productos, calcularStock(inventario));
        })
        .fail(function (xhr) {
            const detalle = xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : xhr.statusText;
            $("#contadorProductos").text("No se pudo cargar el catálogo.");
            $("#contenedorProductos").html(
                `<div class="col-12"><div class="alert alert-danger">Error ${xhr.status}: ${esc(detalle)}. ¿Está corriendo el API en el puerto 5001?</div></div>`
            );
        });
}

// Suma las unidades disponibles de todas las tallas y colores de cada producto
function calcularStock(inventario) {
    const stock = {};
    inventario.forEach(item => {
        const idProducto = item.producto_id && item.producto_id._id ? item.producto_id._id : item.producto_id;
        stock[idProducto] = (stock[idProducto] || 0) + item.cantidad_disponible;
    });
    return stock;
}

function mostrarProductos(productos, stock) {
    const contenedor = $("#contenedorProductos");
    contenedor.empty();

    $("#contadorProductos").text(`${productos.length} productos disponibles en la tienda`);

    if (productos.length === 0) {
        contenedor.html(`<div class="col-12"><div class="alert alert-secondary">Aún no hay productos publicados.</div></div>`);
        return;
    }

    productos.forEach(p => {
        const unidades = stock[p._id] || 0;
        const hayStock = unidades > 0;
        const imagen = p.imagenes && p.imagenes.length > 0 ? p.imagenes[0] : "img/placeholder.svg";
        const nombreDrop = p.drop_id ? p.drop_id.nombre : "Sin drop";
        const nombreCategoria = p.categoria_id ? p.categoria_id.nombre : "Sin categoría";

        const tarjeta = `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="card h-100 tarjeta-producto ${hayStock ? "" : "tarjeta-agotada"}">
                    <div class="position-relative">
                        <img src="${esc(imagen)}" class="card-img-top" alt="${esc(p.nombre)}"
                             onerror="this.onerror=null;this.src='img/placeholder.svg';">
                        <span class="etiqueta-stock ${hayStock ? "etiqueta-disponible" : "etiqueta-agotado"}">
                            ${hayStock ? "Disponible" : "Agotado"}
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <span class="marca-producto">${esc(p.marca)}</span>
                        <h5 class="card-title mt-1 mb-1">${esc(p.nombre)}</h5>
                        <p class="small text-secondary mb-3">${esc(nombreCategoria)} · ${esc(nombreDrop)}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-end">
                            <span class="precio">${formatearPrecio(p.precio)}</span>
                            <span class="small text-secondary">${esc(p.condicion)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.append(tarjeta);
    });
}