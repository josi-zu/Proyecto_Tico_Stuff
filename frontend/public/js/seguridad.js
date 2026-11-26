import { API } from './confi.js';
import { esc } from './utilidades.js';
let pagina = 1;

function mostrarError(xhr) {
    $('#mensajeSeguridad').text(xhr.responseJSON?.mensaje || 'No se pudo conectar con el API');
}

function cargarBitacora() {
    $.ajax({
        url: API.Seguridad + '/bitacora',
        data: { coleccion: $('#coleccion').val(), accion: $('#accion').val(), pagina },
        success: function (resultado) {
            $('#mensajeSeguridad').text('');
            $('#filasBitacora').empty();
            resultado.datos.forEach(registro => {
                const usuario = registro.usuario_id;
                const nombre = usuario?.correo || usuario?._id || 'Usuario no disponible';
                $('#filasBitacora').append(`<tr>
                    <td>${esc(new Date(registro.fecha).toLocaleString('es-CR'))}</td>
                    <td>${esc(nombre)}</td><td>${esc(registro.accion)}</td>
                    <td>${esc(registro.coleccion)}<br><small>${esc(registro.documento_id)}</small></td>
                    <td>${esc(registro.direccion_ip)}</td>
                    <td><details><summary>Ver cambio</summary><p>${esc(registro.descripcion)}</p>
                    <strong>Antes</strong><pre>${esc(JSON.stringify(registro.datos_anteriores, null, 2))}</pre>
                    <strong>Después</strong><pre>${esc(JSON.stringify(registro.datos_nuevos, null, 2))}</pre></details></td></tr>`);
            });
            if (!resultado.datos.length) $('#filasBitacora').append('<tr><td colspan="6">No hay registros para estos filtros.</td></tr>');
            $('#pagina').text(`Página ${pagina} · ${resultado.total} registros`);
            $('#anterior').prop('disabled', pagina <= 1);
            $('#siguiente').prop('disabled', pagina * resultado.por_pagina >= resultado.total);
        }, error: mostrarError
    });
}

$.ajax({
    url: API.Sesion + '/actual',
    success: function (usuario) {
        if (usuario.rol !== 'Administrador') {
            $('#mensajeSeguridad').text('Esta sección requiere el rol Administrador');
            return;
        }
        $('#contenidoSeguridad').prop('hidden', false);
        $.ajax({
            url: API.Seguridad + '/roles',
            success: function (roles) {
                $('#filasRoles').empty();
                roles.forEach(rol => $('#filasRoles').append(`<tr><td>${esc(rol.nombre_rol)}</td>
                    <td>${esc(rol.descripcion)}</td><td>${esc(rol.permisos.join(', '))}</td>
                    <td>${esc(rol.estado)}</td></tr>`));
            }, error: mostrarError
        });
        cargarBitacora();
    },
    error: function (xhr) {
        if (xhr.status === 401) location.href = 'sesion.html';
        else mostrarError(xhr);
    }
});

$('#filtrosBitacora').on('submit', function (evento) { evento.preventDefault(); pagina = 1; cargarBitacora(); });
$('#anterior').on('click', function () { if (pagina > 1) { pagina--; cargarBitacora(); } });
$('#siguiente').on('click', function () { pagina++; cargarBitacora(); });
