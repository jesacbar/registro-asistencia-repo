const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const asistEsquema = new Esquema({
    idClase: String,
    idAlumno: String,
    fecha: Date,
    estado: String
});

module.exports = mongoose.model("asistencias", estEsquema);