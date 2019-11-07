const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const estEsquema = new Esquema({
    id: String,
    nombre: String
});

module.exports = mongoose.model("profesores", estEsquema);