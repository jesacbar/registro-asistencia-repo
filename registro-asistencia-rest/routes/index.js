const express = require("express");
const router = express.Router();
const Asistencia = require("../models/asistencia");

var taco = "yumi";

router.post('/asistencias', async (req, res) => {
    try {
        const asistencia = new Asistencia(req.body)
        console.log(asistencia);
        await asistencia.save()
        res.status(201).send({ asistencia })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/asistencias", async (req, res) => {
    const listaAsistencias = await Asistencia.find();
    res.send(listaAsistencias);
    console.log(taco);
});

// Regresa todas las asistencias registradas de una clase.
router.get("/asistencias/:idClase", async (req, res) => {

});

router.get("/asistencias/:idClase/:idAlumno", async (req, res) => {

});

module.exports = router;