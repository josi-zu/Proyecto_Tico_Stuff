// Los nombres conservan el formato usado por los datos del proyecto.
const permisosAdministrador = [
    'gestionar_productos', 'gestionar_categorias', 'gestionar_drops',
    'gestionar_inventario', 'gestionar_pedidos', 'gestionar_usuarios',
    'gestionar_roles', 'consultar_bitacora'
];
const permisosCliente = ['consultar_productos', 'gestionar_perfil', 'crear_pedidos', 'consultar_pedidos'];

module.exports = { permisosAdministrador, permisosCliente };
