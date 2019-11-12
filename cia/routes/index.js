const express = require("express");
const router = express.Router();
const Clase = require("../models/clase");
const Profesor = require("../models/profesor");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    const listaClases = await Clase.find();
    console.log(listaClases);
    res.render("pagina", {listaClases});
});

router.post("/agregarAlumno", async (req, res) => {
    //console.log(req.body)
    var e = new Estudiante(req.body);
    await e.save();
    res.redirect("/");
});

router.post('/profesores', async (req, res) => {
    // 
    try {
        const profesor = new Profesor(req.body)
        console.log(profesor);
        await profesor.save()
        const token = await profesor.generateAuthToken()
        res.status(201).send({ profesor, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/profesores/login', async (req, res) => {
    try {
        const { id, pass } = req.body
        const profesor = await Profesor.findByCredentials(id, pass)
        if (!profesor) {
            return res.status(401).send({error: 'Error de inicio de sesión. Revise sus credenciales de acceso.'})
        }
        const token = await profesor.generateAuthToken()
        res.send({ profesor, token })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

router.get('/profesores/me', auth, async(req, res) => {
    res.send(req.profesor)
})

router.get("/eliminarClase/:id", async (req, res) => {
    const {id} = req.params;
    await Clase.remove({_id:id});
    res.redirect("/");
});

router.post("/agregarClase", async (req, res) => {
    //console.log(req.body)
    var e = new Clase(req.body);
    await e.save();
    res.redirect("/");
});

router.post("/profesores/me/logout", auth, async (req, res) => {
    try {
        req.profesor.tokens = req.profesor.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.profesor.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/profesores/me/logoutall', auth, async(req, res) => {
    try {
        req.profesor.tokens.splice(0, req.profesor.tokens.length)
        await req.profesor.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;