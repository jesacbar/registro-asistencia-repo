const mongoose = require("mongoose");
const Esquema = mongoose.Schema;

const estEsquema = new Esquema({
    id: String,
    nombre: String,
    aprobado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("estudiantes", estEsquema);