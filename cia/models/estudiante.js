const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const estEsquema = new Esquema({
    id: String,
    pass: String,
    nombre: String
});

module.exports = mongoose.model("estudiantes", estEsquema);