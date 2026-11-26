const mongoose = require('mongoose');

async function conectarBD() {
    if (!process.env.MONGO_URI) throw new Error('Falta MONGO_URI en backend_api/.env');
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('bd nosql conectada');
}

module.exports = conectarBD;
