const express = require("express");
const router = express.Router();
const Clase = require("../models/clase");

router.get("/", async (req, res) => {
    const listaClases = await Clase.find();
    console.log(listaClases);
    res.render("pagina", {listaClases});
});

router.post("/agregarAlumno", async (req, res) => {
    //console.log(req.body)
    var e = new Estudiante(req.body);
    await e.save();
    res.send("Alumno recibido.");
});

router.post("/agregarClase", async (req, res) => {
    //console.log(req.body)
    var e = new Clase(req.body);
    await e.save();
    res.send("Clase recibida.");
});

module.exports = router;