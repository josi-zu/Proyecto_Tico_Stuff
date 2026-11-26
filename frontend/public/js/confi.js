const BASE_LOCAL = "http://localhost:5001";
const BASE_TUNEL = "https://pfdw6f4n-5001.use2.devtunnels.ms";

// Si la página se abre en localhost usa el API local; si se abre desde el tunnel, usa el tunnel
const esLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
export const BASE = esLocal ? BASE_LOCAL : BASE_TUNEL;

export const API = {
    Productos: `${BASE}/api/productos`,
    Categorias: `${BASE}/api/categorias`,
    Drops: `${BASE}/api/drops`,
    Inventario: `${BASE}/api/inventario`,
    Sesion: `${BASE}/api/sesion`,
    Seguridad: `${BASE}/api/seguridad`,
}

// Los AJAX usan la cookie de sesión sin guardar contraseñas o roles.
$.ajaxPrefilter(function (opciones) {
    if (opciones.url.startsWith(BASE + '/')) {
        opciones.xhrFields = { ...opciones.xhrFields, withCredentials: true };
    }
});