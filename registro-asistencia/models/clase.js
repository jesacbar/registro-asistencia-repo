const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const clasEsquema = new Esquema({
    id: String,
    nombre: String,
    idProfesor: Date,
    horaInicio: String,
    horaFin: String,
    aula: String
});

module.exports = mongoose.model("asistencias", estEsquema);