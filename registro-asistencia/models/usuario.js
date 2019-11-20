const mongoose = require("mongoose");
const Esquema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Clase = require('../models/clase');

const usuEsquema = new Esquema({
    id: String,
    password: String,
    nombre: String,
    esProfesor: Boolean,
    clases: Clase = [], //No estoy seguro si se debe declarar así un arreglo de objetos Clase
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("asistencias", estEsquema);