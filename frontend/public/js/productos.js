import { API } from './confi.js';
import { esc, formatearPrecio } from './utilidades.js';

$(document).ready(function () {
    cargarListas();
    consultarDatos();

    $("#formProductoCrear").submit(function (event) {
        event.preventDefault();
        crearProducto();
    });

    $("#formProductoEditar").submit(function (event) {
        event.preventDefault();
        editarProducto();
    });

    $("#formProductoEliminar").submit(function (event) {
        event.preventDefault();
        eliminarProducto();
    });
});

function mostrarError(xhr) {
    const detalle = xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : xhr.statusText;
    console.log(xhr.status + ", " + detalle);
    alert("Error " + xhr.status + ": " + detalle);
}

// El campo puede llegar poblado ({_id, nombre}) o como simple id
function idDe(campo) {
    return campo && campo._id ? campo._id : campo;
}

// Una URL por línea -> arreglo, sin líneas vacías
function leerImagenes(selector) {
    return $(selector).val()
        .split(/\r?\n/)
        .map(linea => linea.trim())
        .filter(linea => linea !== "");
}

// Llena las listas de categoría y drop (crear y editar)
function cargarListas() {
    $.ajax({
        type: "GET",
        url: API.Categorias,
        dataType: "json",
        success: function (categorias) {
            categorias.forEach(c => {
                const opcion = `<option value="${c._id}">${esc(c.nombre)}</option>`;
                $("#categoria_id").append(opcion);
                $("#categoria_ideditar").append(opcion);
            });
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });

    $.ajax({
        type: "GET",
        url: API.Drops,
        dataType: "json",
        success: function (drops) {
            drops.forEach(d => {
                const opcion = `<option value="${d._id}">${esc(d.nombre)}</option>`;
                $("#drop_id").append(opcion);
                $("#drop_ideditar").append(opcion);
            });
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

export async function consultarDatos() {
    // Sin filtro de estado: aquí el administrador ve todos, también los ocultos
    $.ajax({
        type: "GET",
        url: API.Productos,
        dataType: "json",
        success: function (response) {
            muestreLosDatosEnTabla(response);
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function muestreLosDatosEnTabla(response) {
    let tabla = $("#nombreTabla");
    tabla.empty();

    response.forEach(elementIndividual => {
        const visible = elementIndividual.estado_publicacion === "visible";
        const categoria = elementIndividual.categoria_id ? elementIndividual.categoria_id.nombre : "Sin categoría";
        const drop = elementIndividual.drop_id ? elementIndividual.drop_id.nombre : "Sin drop";

        let fila = `
            <tr>
                <td>
                    <div class="fw-semibold">${esc(elementIndividual.nombre)}</div>
                    <div class="marca-producto">${esc(elementIndividual.marca)}</div>
                </td>
                <td>${esc(categoria)}</td>
                <td>${esc(drop)}</td>
                <td class="fw-semibold">${formatearPrecio(elementIndividual.precio)}</td>
                <td>${esc(elementIndividual.condicion)}</td>
                <td>
                    <span class="badge-estado ${visible ? "badge-publicado" : "badge-finalizado"}">
                        ${esc(elementIndividual.estado_publicacion)}
                    </span>
                </td>
                <td class="text-nowrap">
                    <a class="btn btn-sm btn-outline-light"
                       onclick="cargarDatosProducto('${elementIndividual._id}')"
                       role="button">Modificar</a>

                    <a class="btn btn-sm btn-primary"
                       onclick="cargarDatosProductoEliminar('${elementIndividual._id}')"
                       role="button">Eliminar</a>
                </td>
            </tr>
        `;
        tabla.append(fila);
    });
}

function crearProducto() {
    const objetoProducto = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        marca: $("#marca").val(),
        categoria_id: $("#categoria_id").val(),
        drop_id: $("#drop_id").val(),
        precio: String($("#precio").val()),   // texto para Decimal128
        condicion: $("#condicion").val(),
        imagenes: leerImagenes("#imagenes"),
        estado_publicacion: $("#estado_publicacion").val()
    };

    $.ajax({
        type: "POST",
        url: API.Productos,
        data: JSON.stringify(objetoProducto),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Producto creado");
            consultarDatos();
            $("#formProductoCrear")[0].reset();
            bootstrap.Modal.getInstance($("#modalCrear")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosProducto = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Productos}/${id}`,
        dataType: "json",
        success: function (response) {
            $("#ideditar").val(response._id);
            $("#nombreeditar").val(response.nombre);
            $("#marcaeditar").val(response.marca);
            $("#descripcioneditar").val(response.descripcion);
            $("#categoria_ideditar").val(idDe(response.categoria_id));
            $("#drop_ideditar").val(idDe(response.drop_id));
            $("#precioeditar").val(response.precio);
            $("#condicioneditar").val(response.condicion);
            $("#estado_publicacioneditar").val(response.estado_publicacion);
            $("#imageneseditar").val((response.imagenes || []).join("\n"));
            new bootstrap.Modal($("#modalEditar")[0]).show();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosProductoEliminar = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Productos}/${id}`,
        dataType: "json",
        success: function (response) {
            $("#ideliminar").val(response._id);
            $("#nombreeliminar").val(response.nombre);
            $("#marcaeliminar").val(response.marca);
            new bootstrap.Modal($("#modalEliminar")[0]).show();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function editarProducto() {
    const id = $("#ideditar").val();

    const objetoProducto = {
        nombre: $("#nombreeditar").val(),
        descripcion: $("#descripcioneditar").val(),
        marca: $("#marcaeditar").val(),
        categoria_id: $("#categoria_ideditar").val(),
        drop_id: $("#drop_ideditar").val(),
        precio: String($("#precioeditar").val()),
        condicion: $("#condicioneditar").val(),
        imagenes: leerImagenes("#imageneseditar"),
        estado_publicacion: $("#estado_publicacioneditar").val()
    };

    $.ajax({
        type: "PUT",
        url: `${API.Productos}/${id}`,
        data: JSON.stringify(objetoProducto),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Producto editado");
            consultarDatos();
            $("#formProductoEditar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function eliminarProducto() {
    const id = $("#ideliminar").val();

    $.ajax({
        type: "DELETE",
        url: `${API.Productos}/${id}`,
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Producto eliminado");
            consultarDatos();
            $("#formProductoEliminar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}