import { API } from './confi.js';
import { esc } from './utilidades.js';

$(document).ready(function () {
    consultarDatos();

    // El slug se genera solo mientras se escribe el nombre
    $("#nombre").on("input", function () {
        $("#slug").val(generarSlug($(this).val()));
    });

    $("#formCategoriaCrear").submit(function (event) {
        event.preventDefault();
        crearCategoria();
    });

    $("#formCategoriaEditar").submit(function (event) {
        event.preventDefault();
        editarCategoria();
    });

    $("#formCategoriaEliminar").submit(function (event) {
        event.preventDefault();
        eliminarCategoria();
    });
});

function generarSlug(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")   // quita tildes
        .replace(/[^a-z0-9]+/g, "-")       // todo lo demás pasa a guion
        .replace(/^-+|-+$/g, "");          // sin guiones al inicio o al final
}

function mostrarError(xhr) {
    const detalle = xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : xhr.statusText;
    console.log(xhr.status + ", " + detalle);
    alert("Error " + xhr.status + ": " + detalle);
}

export async function consultarDatos() {
    $.ajax({
        type: "GET",
        url: API.Categorias,
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
        const activo = elementIndividual.estado === "activo";

        let fila = `
            <tr>
                <td class="text-secondary small">${elementIndividual._id}</td>
                <td class="fw-semibold">${esc(elementIndividual.nombre)}</td>
                <td>${esc(elementIndividual.descripcion)}</td>
                <td><code>${esc(elementIndividual.slug)}</code></td>
                <td>
                    <span class="badge-estado ${activo ? "badge-publicado" : "badge-finalizado"}">
                        ${esc(elementIndividual.estado)}
                    </span>
                </td>
                <td class="text-nowrap">
                    <a class="btn btn-sm btn-outline-light"
                       onclick="cargarDatosCategoria('${elementIndividual._id}')"
                       role="button">Modificar</a>

                    <a class="btn btn-sm btn-primary"
                       onclick="cargarDatosCategoriaEliminar('${elementIndividual._id}')"
                       role="button">Eliminar</a>
                </td>
            </tr>
        `;
        tabla.append(fila);
    });
}

function crearCategoria() {
    const objetoCategoria = {
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        slug: $("#slug").val(),
        estado: $("#estado").val()
    };

    $.ajax({
        type: "POST",
        url: API.Categorias,
        data: JSON.stringify(objetoCategoria),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Categoría creada");
            consultarDatos();
            $("#formCategoriaCrear")[0].reset();
            bootstrap.Modal.getInstance($("#modalCrear")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosCategoria = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Categorias}/${id}`,
        dataType: "json",
        success: function (response) {
            $("#ideditar").val(response._id);
            $("#nombreeditar").val(response.nombre);
            $("#descripcioneditar").val(response.descripcion);
            $("#slugeditar").val(response.slug);
            $("#estadoeditar").val(response.estado);
            new bootstrap.Modal($("#modalEditar")[0]).show();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

window.cargarDatosCategoriaEliminar = function (id) {
    $.ajax({
        type: "GET",
        url: `${API.Categorias}/${id}`,
        dataType: "json",
        success: function (response) {
            $("#ideliminar").val(response._id);
            $("#nombreeliminar").val(response.nombre);
            $("#slugeliminar").val(response.slug);
            new bootstrap.Modal($("#modalEliminar")[0]).show();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function editarCategoria() {
    const id = $("#ideditar").val();

    const objetoCategoria = {
        nombre: $("#nombreeditar").val(),
        descripcion: $("#descripcioneditar").val(),
        slug: $("#slugeditar").val(),
        estado: $("#estadoeditar").val()
    };

    $.ajax({
        type: "PUT",
        url: `${API.Categorias}/${id}`,
        data: JSON.stringify(objetoCategoria),
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Categoría editada");
            consultarDatos();
            $("#formCategoriaEditar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEditar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}

function eliminarCategoria() {
    const id = $("#ideliminar").val();

    $.ajax({
        type: "DELETE",
        url: `${API.Categorias}/${id}`,
        dataType: "json",
        contentType: "application/json",
        success: function () {
            alert("Categoría eliminada");
            consultarDatos();
            $("#formCategoriaEliminar")[0].reset();
            bootstrap.Modal.getInstance($("#modalEliminar")[0]).hide();
        },
        error: function (xhr) {
            mostrarError(xhr);
        }
    });
}