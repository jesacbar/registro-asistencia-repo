const express = require("express");
const router = express.Router();
const Clase = require("../models/clase");
const Profesor = require("../models/profesor");
const Estudiante = require("../models/estudiante");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    const listaClases = await Clase.find();
    console.log(listaClases);
    res.render("pagina", {listaClases});
});

router.post("/agregarClase", async (req, res) => {
    var e = new Clase(req.body);
    await e.save();
    res.redirect("/");
});

router.get("/eliminarClase/:id", async (req, res) => {
    const {id} = req.params;
    await Clase.remove({_id:id});
    res.redirect("/");
});

router.post('/profesores', async (req, res) => {
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

router.get('/profesores/me', auth, async(req, res) => {
    res.send(req.profesor)
})

router.get('/clases/', auth, async(req, res) => {
    const listaClases = await Clase.find();
    res.send(listaClases);
});

router.get('/estudiantes/', auth, async(req, res) => {
    const listaEstudiantes = await Estudiante.find();
    res.send(listaEstudiantes);
});

router.post('/estudiantes/', auth, async(req, res) => {
    try {
        const estudiante = new Estudiante(req.body)
        console.log(estudiante);
        await estudiante.save()
        //const token = await estudiante.generateAuthToken()
        //res.status(201).send({ estudiante, token })
        res.status(201).send({ estudiante })
    } catch (error) {
        res.status(400).send(error)
    }
});

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