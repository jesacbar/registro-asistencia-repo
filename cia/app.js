const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

const indexRoutes = require("./routes/index");

// Conectar a BD
mongoose.connect("mongodb://localhost/cia" , {
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then((db) => {console.log("Conectado a la BD.")})
.catch((err) => {console.log("Error al conectar a la BD.")});

// Configuraciones
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
app.use(cors({origin:true,credentials: true}));

// Rutas
app.use("/", indexRoutes);

// Inicio de servidor
app.listen(2000, () => {
    console.log("Servidor de \"cia\" iniciado en puerto 2000.");
});