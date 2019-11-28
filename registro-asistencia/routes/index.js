const express = require("express");
const router = express.Router();
const Asistencia = require("../models/asistencia");

router.post('/asistencias', async (req, res) => {
    try {
        const asistencia = new Asistencia(req.body)
        console.log(asistencia);
        await asistencia.save()
        res.status(201).send({ asistencia })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/asistencias", auth, async (req, res) => {
    const listaAsistencias = await Asistencia.find();
    res.send(listaAsistencias);
});

module.exports = router;