const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const claseEsquema = new Esquema({
    id: { type: String, unique: true },
    nombre: String,
    idProfesor: String,
    aula: String,
    horaInicio: String,
    horaFin: String
});

module.exports = mongoose.model("clases", claseEsquema);