const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const indexRoutes = require("./routes/index");

// Conectar a BD
mongoose.connect("mongodb://localhost/registro-alumnos" , {
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then((db) => {console.log("Conectado a la BD.")})
.catch((err) => {console.log("Error al conectar a la BD.")});

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use("/", indexRoutes);

// Inicio de servidor
app.listen(5000, () => {
    console.log("Servidor de \"registro-asistencia-rest\" iniciado en puerto 5000.");
});