import { API } from './confi.js';
import { esc, normalizarImagen, esRutaImagen } from './utilidades.js';

$(document).ready(function () {
    consultarDatos();

    $("#formDropCrear").submit(function (event) {
        event.preventDefault();
        crearDrop();
    });

    $("#formDropEditar").submit(function (event) {
        event.preventDefault();
        editarDrop();
    });

    $("#formDropEliminar").submit(function (event) {
        event.preventDefault();
        eliminarDrop();
    });
});

// Muestra el error que devuelve el API (campo "mensaje")
function mostrarError(xhr) {
    const detalle = xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : xhr.statusText;
    console.log(xhr.status + ", " + detalle);
    alert("Error " + xhr.status + ": " + detalle);
}

// La fecha se guarda en UTC; se muestra en UTC para que no cambie de día
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-CR", { timeZone: "UTC" });
}

export async function consultarDatos() {
    $.ajax({
        type: "GET",
        url: API.Drops,
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
        const portada = esRutaImagen(elementIndividual.imagen_portada)
        ? elementIndividual.imagen_portada: 'img/logo.png';
        let fila = `
            <tr>
                <td class="text-secondary small">${elementIndividual._id}</td>
                <td>
                    <img src="${esc(portada)}"
                        class="miniatura-drop" alt="Portada"
                        onerror="this.onerror=null;this.src='img/logo.png';">
                    </td>
                <td class="fw-semibold">${elementIndividual.nombre}</td>
                <td>${elementIndividual.descripcion || ""}</td>
                <td>${formatearFecha(elementIndividual.fecha_lanzamiento)}</td>
                <td>
                    <span class="badge-estado badge-${elementIndividual.estado}">
                        ${elementIndividual.estado}
                    </span>
                </td>
                <td class="text-nowrap">
                    <a class="btn btn-sm btn-outline-light"
                    onclick="cargarDatosDrop('${elementIndividual._id}')"
                    role="button">Modificar</a>

                    <a class="btn btn-sm btn-primary"
                    onclick="cargarDatosDropEliminar('${elementIndividual._id}')"
                    role="button">Eliminar</a>
                </td>
            </tr>
        `;
        tabla.append(fila);
    });
}

function crearDrop() {
    const objetoDrop = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        fecha_lanzamiento: $("#fecha_lanzamiento").val(),
        estado: $("#estado").val()
    };

    // Si se deja vacío, el API usa el valor por defecto "por definir"
    const imagen = normalizarImagen($("#imagen_portada").val());
    if (imagen) objetoDrop.imagen_portada = imagen;

    $.ajax({
        type: "POST",
        url: API.Drops,
        data: JSON.stringify(objetoDrop),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Drop creado");
            consultarDatos();
            $("#formDropCrear")[0].reset();
            bootstrap.Modal.getInstance($("#modalCrear")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosDrop = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Drops}/${id}`,
        dataType: "json",
        success: function (response) {
            cargarDatosInputFormularioEditar(response);
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosDropEliminar = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Drops}/${id}`,
        dataType: "json",
        success: function (response) {
            cargarDatosInputFormularioEliminar(response);
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function cargarDatosInputFormularioEditar(response) {
    $("#ideditar").val(response._id);
    $("#nombreeditar").val(response.nombre);
    $("#descripcioneditar").val(response.descripcion);
    // El input date necesita el formato yyyy-mm-dd
    $("#fecha_lanzamientoeditar").val(response.fecha_lanzamiento.substring(0, 10));
    $("#estadoeditar").val(response.estado);
    $("#imagen_portadaeditar").val(response.imagen_portada);

    const modalEditar = new bootstrap.Modal($("#modalEditar")[0]);
    modalEditar.show();
}

function cargarDatosInputFormularioEliminar(response) {
    $("#ideliminar").val(response._id);
    $("#nombreeliminar").val(response.nombre);

    const modalEliminar = new bootstrap.Modal($("#modalEliminar")[0]);
    modalEliminar.show();
}

function editarDrop() {
    const id = $("#ideditar").val();

    const objetoDrop = {
        nombre: $("#nombreeditar").val(),
        descripcion: $("#descripcioneditar").val(),
        fecha_lanzamiento: $("#fecha_lanzamientoeditar").val(),
        estado: $("#estadoeditar").val(),
        imagen_portada: normalizarImagen($("#imagen_portadaeditar").val())
    };

    $.ajax({
        type: "PUT",
        url: `${API.Drops}/${id}`,
        data: JSON.stringify(objetoDrop),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Drop editado");
            consultarDatos();
            $("#formDropEditar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function eliminarDrop() {
    const id = $("#ideliminar").val();

    $.ajax({
        type: "DELETE",
        url: `${API.Drops}/${id}`,
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Drop eliminado");
            consultarDatos();
            $("#formDropEliminar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}