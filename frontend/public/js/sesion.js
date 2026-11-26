import { API } from './confi.js';

$('#formSesion').on('submit', function (evento) {
    evento.preventDefault();
    $('#mensajeSesion').text('Comprobando acceso...');
    $('#ingresar').prop('disabled', true);
    $.ajax({
        type: 'POST', url: API.Sesion + '/login', contentType: 'application/json',
        data: JSON.stringify({ correo: $('#correo').val(), password: $('#password').val() }),
        success: function (usuario) {
            location.href = usuario.rol === 'Administrador' ? 'seguridad.html' : 'catalogo.html';
        },
        error: function (xhr) {
            $('#mensajeSesion').text(xhr.responseJSON?.mensaje || 'No se pudo conectar con el API');
        },
        complete: function () { $('#ingresar').prop('disabled', false); $('#password').val(''); }
    });
});
