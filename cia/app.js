const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const indexRoutes = require("./routes/index");

// Conectar a BD
mongoose.connect("mongodb://localhost/cia")
.then((db) => {console.log("Conectado a la BD.")})
.catch((err) => {console.log("Error al conectar a la BD.")});

// Configuraciones
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));

// Rutas
app.use("/", indexRoutes);

// Inicio de servidor
app.listen(3000, () => {
    console.log("Servidor en puerto 3000.");
});