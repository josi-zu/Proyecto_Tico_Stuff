import { API } from './confi.js';
import { esc } from './utilidades.js';

$(document).ready(function () {
    cargarProductosEnListas();
    consultarDatos();

    $("#formInventarioCrear").submit(function (event) {
        event.preventDefault();
        crearInventario();
    });

    $("#formInventarioEditar").submit(function (event) {
        event.preventDefault();
        editarInventario();
    });

    $("#formInventarioEliminar").submit(function (event) {
        event.preventDefault();
        eliminarInventario();
    });
});

function mostrarError(xhr) {
    const detalle = xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : xhr.statusText;
    console.log(xhr.status + ", " + detalle);
    alert("Error " + xhr.status + ": " + detalle);
}

// El producto puede llegar poblado ({_id, nombre, marca}) o como simple id
function idDe(campo) {
    return campo && campo._id ? campo._id : campo;
}

function nombreProducto(campo) {
    return campo && campo.nombre ? `${campo.marca} · ${campo.nombre}` : "Producto no encontrado";
}

// Llena las listas desplegables de producto (crear y editar)
function cargarProductosEnListas() {
    $.ajax({
        type: "GET",
        url: API.Productos,
        dataType: "json",
        success: function (productos) {
            productos.forEach(p => {
                const opcion = `<option value="${p._id}">${esc(p.marca)} · ${esc(p.nombre)}</option>`;
                $("#producto_id").append(opcion);
                $("#producto_ideditar").append(opcion);
            });
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

export async function consultarDatos() {
    $.ajax({
        type: "GET",
        url: API.Inventario,
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
        const agotado = elementIndividual.cantidad_disponible === 0;

        let fila = `
            <tr>
                <td><code>${esc(elementIndividual.sku)}</code></td>
                <td class="fw-semibold">${esc(nombreProducto(elementIndividual.producto_id))}</td>
                <td>${esc(elementIndividual.talla)}</td>
                <td>${esc(elementIndividual.color)}</td>
                <td>
                    ${agotado
                        ? `<span class="badge-estado badge-publicado">Agotado</span>`
                        : elementIndividual.cantidad_disponible}
                </td>
                <td>${elementIndividual.cantidad_reservada}</td>
                <td class="text-nowrap">
                    <a class="btn btn-sm btn-outline-light"
                       onclick="cargarDatosInventario('${elementIndividual._id}')"
                       role="button">Modificar</a>

                    <a class="btn btn-sm btn-primary"
                       onclick="cargarDatosInventarioEliminar('${elementIndividual._id}')"
                       role="button">Eliminar</a>
                </td>
            </tr>
        `;
        tabla.append(fila);
    });
}

function crearInventario() {
    const objetoInventario = {
        producto_id: $("#producto_id").val(),
        sku: $("#sku").val(),
        talla: $("#talla").val(),
        color: $("#color").val(),
        cantidad_disponible: Number($("#cantidad_disponible").val()),
        cantidad_reservada: Number($("#cantidad_reservada").val())
    };

    $.ajax({
        type: "POST",
        url: API.Inventario,
        data: JSON.stringify(objetoInventario),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Registro de inventario creado");
            consultarDatos();
            $("#formInventarioCrear")[0].reset();
            bootstrap.Modal.getInstance($("#modalCrear")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosInventario = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Inventario}/${id}`,
        dataType: "json",
        success: function (response) {
            $("#ideditar").val(response._id);
            $("#producto_ideditar").val(idDe(response.producto_id));
            $("#skueditar").val(response.sku);
            $("#tallaeditar").val(response.talla);
            $("#coloreditar").val(response.color);
            $("#cantidad_disponibleeditar").val(response.cantidad_disponible);
            $("#cantidad_reservadaeditar").val(response.cantidad_reservada);
            new bootstrap.Modal($("#modalEditar")[0]).show();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosInventarioEliminar = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Inventario}/${id}`,
        dataType: "json",
        success: function (response) {
            $("#ideliminar").val(response._id);
            $("#productoeliminar").val(nombreProducto(response.producto_id));
            $("#skueliminar").val(response.sku);
            new bootstrap.Modal($("#modalEliminar")[0]).show();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function editarInventario() {
    const id = $("#ideditar").val();

    const objetoInventario = {
        producto_id: $("#producto_ideditar").val(),
        sku: $("#skueditar").val(),
        talla: $("#tallaeditar").val(),
        color: $("#coloreditar").val(),
        cantidad_disponible: Number($("#cantidad_disponibleeditar").val()),
        cantidad_reservada: Number($("#cantidad_reservadaeditar").val())
    };

    $.ajax({
        type: "PUT",
        url: `${API.Inventario}/${id}`,
        data: JSON.stringify(objetoInventario),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Registro de inventario editado");
            consultarDatos();
            $("#formInventarioEditar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function eliminarInventario() {
    const id = $("#ideliminar").val();

    $.ajax({
        type: "DELETE",
        url: `${API.Inventario}/${id}`,
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Registro de inventario eliminado");
            consultarDatos();
            $("#formInventarioEliminar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}