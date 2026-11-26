export const API = {
    Productos: "http://localhost:5001/api/productos",
    Categorias: "http://localhost:5001/api/categorias",
    Drops: "http://localhost:5001/api/drops",
    Inventario: "http://localhost:5001/api/inventario",
    Sesion: "http://localhost:5001/api/sesion",
    Seguridad: "http://localhost:5001/api/seguridad",
}

// Los AJAX existentes usan la cookie de sesión sin guardar contraseñas o roles.
$.ajaxPrefilter(function (opciones) {
    if (opciones.url.startsWith('http://localhost:5001/')) {
        opciones.xhrFields = { ...opciones.xhrFields, withCredentials: true };
    }
});
