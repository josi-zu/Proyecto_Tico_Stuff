require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Tico Stuff funcionando' })
});

app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/drops', require('./routes/dropRoutes'));
app.use('/api/inventario', require('./routes/inventarioRoutes'));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("bd nosql conectada");

    app.listen(PORT, () => {
        console.log(`Server API http://localhost:${PORT}`);
    })
})
    .catch((error) => {
        console.error("Error al conectar bd", error.message)
    });