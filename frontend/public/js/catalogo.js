import { API } from './confi.js';
import { esc, formatearPrecio, formatearFecha, esRutaImagen } from './utilidades.js';

let inventario = [];        
let stock = {};            
let dropSeleccionado = ""; 
let numeroPeticion = 0;     

$(document).ready(function () {
    iniciar();

    $("#formBusqueda").on("submit", function (event) {
        event.preventDefault();
        buscar();
    });

    $("#q").on("input", retrasar(buscar, 350));

    $("#filtroMarca, #filtroCategoria, #filtroCondicion").on("change", buscar);

    $("#btnLimpiar").on("click", function () {
        $("#formBusqueda")[0].reset();
        $("#filtroMarca, #filtroCategoria, #filtroCondicion").val("");
        seleccionarDrop("");
    });

    $("#franjaDrops").on("click", ".chip-drop", function () {
        const id = String($(this).data("id"));
        seleccionarDrop(id === dropSeleccionado ? "" : id);
    });

    $("#resultados").on("click", ".tarjeta-producto", function () {
        abrirDetalle($(this).data("id"));
    });
});

function retrasar(funcion, milisegundos) {
    let temporizador;
    return function () {
        clearTimeout(temporizador);
        temporizador = setTimeout(funcion, milisegundos);
    };
}

function idDe(campo) {
    return campo && campo._id ? campo._id : campo;
}

function mensajeError(xhr) {
    return xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : xhr.statusText;
}

//Carga inicial: filtros, drops y stock
function iniciar() {
    $.when(
        $.ajax({ type: "GET", url: `${API.Categorias}?estado=activo`, dataType: "json" }),
        $.ajax({ type: "GET", url: API.Drops, dataType: "json" }),
        $.ajax({ type: "GET", url: `${API.Productos}?estado=visible`, dataType: "json" }),
        $.ajax({ type: "GET", url: API.Inventario, dataType: "json" })
    )
        .done(function (resCategorias, resDrops, resProductos, resInventario) {
            llenarSelect("#filtroCategoria", resCategorias[0].map(c => ({ valor: c._id, texto: c.nombre })));

            // Marcas sin repetir, a partir de los productos visibles
            const marcas = [...new Set(resProductos[0].map(p => p.marca))].sort();
            llenarSelect("#filtroMarca", marcas.map(m => ({ valor: m, texto: m })));

            mostrarFranjaDrops(resDrops[0]);

            inventario = resInventario[0];
            stock = calcularStock(inventario);

            buscar();
        })
        .fail(function (xhr) {
            $("#contadorResultados").text("No se pudo cargar el catálogo.");
            $("#resultados").html(
                `<div class="col-12"><div class="alert alert-danger">Error ${xhr.status}: ${esc(mensajeError(xhr))}. ¿Está corriendo el API en el puerto 5001?</div></div>`
            );
        });
}

function llenarSelect(selector, opciones) {
    const select = $(selector);
    opciones.forEach(o => {
        select.append(`<option value="${esc(o.valor)}">${esc(o.texto)}</option>`);
    });
}

function calcularStock(lista) {
    const resultado = {};
    lista.forEach(item => {
        const id = idDe(item.producto_id);
        resultado[id] = (resultado[id] || 0) + item.cantidad_disponible;
    });
    return resultado;
}

//Franja de drops (usa la portada de cada drop) 
function mostrarFranjaDrops(drops) {
    const franja = $("#franjaDrops");
    franja.empty();

    drops.forEach(d => {
        const tienePortada = esRutaImagen(d.imagen_portada);
        const imagen = tienePortada ? d.imagen_portada : "img/logo.png";

        franja.append(`
            <div class="chip-drop" data-id="${d._id}">
                <img src="${esc(imagen)}" alt="${esc(d.nombre)}"
                     class="${tienePortada ? "" : "logo-respaldo"}"
                     onerror="this.onerror=null;this.src='img/logo.png';this.classList.add('logo-respaldo');">
                <div class="chip-texto">
                    <div class="chip-nombre">${esc(d.nombre)}</div>
                    <div class="chip-estado">${esc(d.estado)}</div>
                </div>
            </div>
        `);
    });
}

function seleccionarDrop(id) {
    dropSeleccionado = id;
    $(".chip-drop").removeClass("activo");
    if (id) $(`.chip-drop[data-id="${id}"]`).addClass("activo");
    buscar();
}

//Búsqueda con filtros (GET /api/productos?...) 
function buscar() {
    const parametros = { estado: "visible" };

    const q = $("#q").val().trim();
    if (q) parametros.q = q;
    if ($("#filtroMarca").val()) parametros.marca = $("#filtroMarca").val();
    if ($("#filtroCategoria").val()) parametros.categoria = $("#filtroCategoria").val();
    if (dropSeleccionado) parametros.drop = dropSeleccionado;
    if ($("#filtroCondicion").val()) parametros.condicion = $("#filtroCondicion").val();

    const miPeticion = ++numeroPeticion;

    $.ajax({
        type: "GET",
        url: API.Productos,
        data: parametros,
        dataType: "json",
        success: function (response) {
            if (miPeticion !== numeroPeticion) return; // llegó una búsqueda más nueva
            mostrarResultados(response);
        },
        error: function (xhr) {
            $("#contadorResultados").text("Error al buscar.");
            $("#resultados").html(
                `<div class="col-12"><div class="alert alert-danger">Error ${xhr.status}: ${esc(mensajeError(xhr))}</div></div>`
            );
        }
    });
}

function mostrarResultados(productos) {
    const contenedor = $("#resultados");
    contenedor.empty();

    $("#contadorResultados").text(
        productos.length === 1 ? "1 producto" : `${productos.length} productos`
    );

    if (productos.length === 0) {
        contenedor.html(
            `<div class="col-12"><div class="alert alert-secondary">No encontramos productos con esos filtros. Prueba con otra búsqueda.</div></div>`
        );
        return;
    }

    productos.forEach(p => {
        const hayStock = (stock[p._id] || 0) > 0;
        const tieneFoto = p.imagenes && p.imagenes.length > 0;
        const imagen = tieneFoto ? p.imagenes[0] : "img/logo.png";
        const nombreDrop = p.drop_id ? p.drop_id.nombre : "Sin drop";
        const nombreCategoria = p.categoria_id ? p.categoria_id.nombre : "Sin categoría";

        contenedor.append(`
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="card h-100 tarjeta-producto ${hayStock ? "" : "tarjeta-agotada"}" data-id="${p._id}">
                    <div class="position-relative">
                        <img src="${esc(imagen)}" class="card-img-top ${tieneFoto ? "" : "logo-respaldo"}" alt="${esc(p.nombre)}"
                             onerror="this.onerror=null;this.src='img/logo.png';this.classList.add('logo-respaldo');">
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
                            <span class="small text-secondary">Ver detalle</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}

//Detalle del producto (GET /api/productos/:id)
function abrirDetalle(id) {
    $.ajax({
        type: "GET",
        url: `${API.Productos}/${id}`,
        dataType: "json",
        success: function (producto) {
            mostrarDetalle(producto);
        },
        error: function (xhr) {
            alert("Error " + xhr.status + ": " + mensajeError(xhr));
        }
    });
}

function construirGaleria(producto) {
    const imagenes = producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes : ["img/logo.png"];
    const esRespaldo = !(producto.imagenes && producto.imagenes.length > 0);

    const items = imagenes.map((url, i) => `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${esc(url)}" class="detalle-imagen ${esRespaldo ? "logo-respaldo" : ""}" alt="${esc(producto.nombre)}"
                 onerror="this.onerror=null;this.src='img/logo.png';this.classList.add('logo-respaldo');">
        </div>
    `).join("");

    const controles = imagenes.length > 1 ? `
        <button class="carousel-control-prev" type="button" data-bs-target="#galeriaProducto" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#galeriaProducto" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>` : "";

    return `
        <div id="galeriaProducto" class="carousel slide">
            <div class="carousel-inner">${items}</div>
            ${controles}
        </div>`;
}

function construirTablaVariantes(idProducto) {
    const variantes = inventario.filter(i => idDe(i.producto_id) === idProducto);

    if (variantes.length === 0) {
        return `<p class="text-secondary">Este producto aún no tiene variantes registradas.</p>`;
    }

    const filas = variantes.map(v => `
        <tr>
            <td>${esc(v.sku)}</td>
            <td>${esc(v.talla)}</td>
            <td>${esc(v.color)}</td>
            <td>
                ${v.cantidad_disponible > 0
                    ? `<span class="badge bg-light text-dark">${v.cantidad_disponible} disp.</span>`
                    : `<span class="badge-estado badge-publicado">Agotado</span>`}
            </td>
        </tr>
    `).join("");

    return `
        <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
                <thead>
                    <tr><th>SKU</th><th>Talla</th><th>Color</th><th>Stock</th></tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
        </div>`;
}

function mostrarDetalle(p) {
    const unidades = stock[p._id] || 0;
    const nombreDrop = p.drop_id ? p.drop_id.nombre : "Sin drop";
    const fechaDrop = p.drop_id && p.drop_id.fecha_lanzamiento ? formatearFecha(p.drop_id.fecha_lanzamiento) : "";
    const nombreCategoria = p.categoria_id ? p.categoria_id.nombre : "Sin categoría";

    $("#detalleTitulo").text(p.nombre);

    $("#detalleCuerpo").html(`
        <div class="row g-4">
            <div class="col-12 col-md-6">
                ${construirGaleria(p)}
            </div>
            <div class="col-12 col-md-6">
                <span class="marca-producto">${esc(p.marca)}</span>
                <div class="precio my-2" style="font-size: 2.2rem;">${formatearPrecio(p.precio)}</div>
                <p>${esc(p.descripcion)}</p>
                <ul class="list-unstyled small text-secondary mb-3">
                    <li><strong class="text-light">Categoría:</strong> ${esc(nombreCategoria)}</li>
                    <li><strong class="text-light">Drop:</strong> ${esc(nombreDrop)} ${fechaDrop ? "(" + fechaDrop + ")" : ""}</li>
                    <li><strong class="text-light">Condición:</strong> ${esc(p.condicion)}</li>
                </ul>
                <span class="etiqueta-stock position-static d-inline-block ${unidades > 0 ? "etiqueta-disponible" : "etiqueta-agotado"}">
                    ${unidades > 0 ? "Disponible · " + unidades + " unidades" : "Agotado"}
                </span>
            </div>
            <div class="col-12">
                <h5 class="mb-2">Tallas y colores</h5>
                ${construirTablaVariantes(p._id)}
            </div>
        </div>
    `);

    new bootstrap.Modal($("#modalDetalle")[0]).show();
}