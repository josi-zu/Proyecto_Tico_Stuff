function permitirRoles(...roles) {
    return (req, res, next) => {
        if (!req.usuario) return res.status(401).json({ mensaje: 'Debes iniciar sesión' });
        if (!roles.includes(req.usuario.rol_id.nombre_rol)) {
            return res.status(403).json({ mensaje: 'Tu rol no permite esta operación' });
        }
        next();
    };
}

function exigirPermiso(permiso) {
    return (req, res, next) => {
        if (!req.usuario) return res.status(401).json({ mensaje: 'Debes iniciar sesión' });
        if (!req.usuario.rol_id.permisos.includes(permiso)) {
            return res.status(403).json({ mensaje: 'No tienes el permiso: ' + permiso });
        }
        next();
    };
}

module.exports = { permitirRoles, exigirPermiso };
