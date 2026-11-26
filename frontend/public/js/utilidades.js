// Evita que el texto de la base se interprete como HTML
export function esc(texto) {
    return $("<div>").text(texto ?? "").html();
}

export function formatearPrecio(precio) {
    return Number(precio).toLocaleString("es-CR", {
        style: "currency",
        currency: "CRC",
        maximumFractionDigits: 0
    });
}

// La fecha se guarda en UTC; se muestra en UTC para que no cambie de día
export function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-CR", { timeZone: "UTC" });
}

// Si pegan un enlace de Google Imágenes (imgres?...), saca la URL real de la imagen
export function normalizarImagen(texto) {
    const valor = (texto || "").trim();
    if (!valor) return "";
    try {
        const url = new URL(valor);
        if (url.hostname.includes("google.") && url.pathname === "/imgres") {
            return url.searchParams.get("imgurl") || valor;
        }
    } catch (e) { /* no es una URL, se deja igual */ }
    return valor;
}

// Acepta rutas absolutas, URLs http(s) y rutas dentro del proyecto (img/...)
export function esRutaImagen(texto) {
    return typeof texto === "string" && /^(\/|https?:\/\/|img\/)/.test(texto);
}