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