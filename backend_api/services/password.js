// crypto viene incluido en Node.js; no se guardan contraseñas en texto plano.
const { randomBytes, scrypt: scryptCallback, timingSafeEqual } = require('node:crypto');
const { promisify } = require('node:util');
const scrypt = promisify(scryptCallback);

async function crearHash(password) {
    if (typeof password !== 'string' || password.length < 10 || password.length > 128) {
        throw new Error('La contraseña debe tener entre 10 y 128 caracteres');
    }
    const sal = randomBytes(16).toString('hex');
    const hash = await scrypt(password, sal, 64);
    return `scrypt:${sal}:${hash.toString('hex')}`;
}

async function verificarPassword(password, guardado) {
    if (typeof password !== 'string' || password.length > 128) return false;
    if (!/^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(guardado || '')) return false;
    const [, sal, esperado] = guardado.split(':');
    const calculado = await scrypt(password, sal, 64);
    return timingSafeEqual(calculado, Buffer.from(esperado, 'hex'));
}

module.exports = { crearHash, verificarPassword };
