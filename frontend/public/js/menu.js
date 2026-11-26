document.addEventListener("DOMContentLoaded", function () {

    const mimenupersonal = document.getElementById("mimenupersonal");

    const paginas = [
        { archivo: "index.html", texto: "Inicio" },
        { archivo: "catalogo.html", texto: "Catálogo" },
        { archivo: "busqueda.html", texto: "Búsqueda" },
        { archivo: "productos.html", texto: "Productos" },
        { archivo: "drops.html", texto: "Drops" },
        { archivo: "categorias.html", texto: "Categorías" },
        { archivo: "inventario.html", texto: "Inventario" }
    ];

    const actual = location.pathname.split("/").pop() || "index.html";

    let enlaces = "";
    paginas.forEach(function (p) {
        const activo = p.archivo === actual ? "active" : "";
        enlaces += `<a class="nav-link ${activo}" href="${p.archivo}">${p.texto}</a>`;
    });

    mimenupersonal.innerHTML =
        `
        <nav class="navbar navbar-expand-md ts-navbar" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">TICO <span>STUFF</span></a>
                <button class="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#menuPrincipal"
                        aria-controls="menuPrincipal" aria-expanded="false" aria-label="Menú">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="menuPrincipal">
                    <div class="navbar-nav ms-auto">${enlaces}</div>
                </div>
            </div>
        </nav>
        `;

});