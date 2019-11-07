const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const estEsquema = new Esquema({
    id: String,
    nombreMateria: String,
    idProfesor: String,
    aula: String,
    horaInicio: String,
    horaFin: String
});

module.exports = mongoose.model("clases", estEsquema);