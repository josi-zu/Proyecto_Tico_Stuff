document.addEventListener("DOMContentLoaded", async function () {

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

    let usuario = null;
    try {
        const respuesta = await fetch('http://localhost:5001/api/sesion/actual', { credentials: 'include' });
        if (respuesta.ok) usuario = await respuesta.json();
    } catch (error) { console.log('No se pudo consultar la sesión'); }
    if (usuario?.rol === 'Administrador') {
        document.body.classList.add('ts-administrador');
        paginas.push({ archivo: 'seguridad.html', texto: 'Seguridad' });
    }
    if (!usuario) paginas.push({ archivo: 'sesion.html', texto: 'Iniciar sesión' });

    const actual = location.pathname.split("/").pop() || "index.html";

    let enlaces = "";
    paginas.forEach(function (p) {
        const activo = p.archivo === actual ? "active" : "";
        enlaces += `<a class="nav-link ${activo}" href="${p.archivo}">${p.texto}</a>`;
    });

    if (usuario) enlaces += '<button id="cerrarSesion" class="btn btn-outline-light ms-2" type="button">Cerrar sesión</button>';
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

    document.getElementById('cerrarSesion')?.addEventListener('click', async function () {
        try {
            const respuesta = await fetch('http://localhost:5001/api/sesion/logout', { method: 'POST', credentials: 'include' });
            if (!respuesta.ok) throw new Error('No se pudo cerrar la sesión');
            location.href = 'index.html';
        } catch (error) { alert('No se pudo cerrar la sesión. Intenta de nuevo.'); }
    });
});