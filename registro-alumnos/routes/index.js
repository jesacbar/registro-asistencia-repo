const express = require("express");
const router = express.Router();
const Asistencia = require("../models/asistencia");
const Clase = require("../models/clase");
const Usuario = require("../models/usuario");

router.post('/usuarios/login', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/usuarios/logout', async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;