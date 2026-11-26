require('dotenv').config();
const conectarBD = require('./config/conexion');
const app = require('./app');
const PORT = process.env.PORT || 5001;

conectarBD().then(() => {
    const servidor = app.listen(PORT, () => console.log(`Server API http://localhost:${PORT}`));
    servidor.on('error', error => { console.error('No se pudo iniciar el API:', error.message); process.exit(1); });
}).catch(error => { console.error('Error al conectar bd:', error.message); process.exit(1); });
