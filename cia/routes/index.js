const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const Clase = require("../models/clase");
const auth = require("../middleware/auth");

// Agregar elementos del stub a la base de datos

router.get("/generarstub", async(req, res) => {
    usuario1 = new Usuario({ id: "00000000001", password: "123", nombre: "Edgar Fulano", clases: ["0001", "0002", "0005"]});
    usuario2 = new Usuario({ id: "00000000002", password: "123", nombre: "Pedro Asola", clases: ["0002", "0003", "0004"]});
    usuario3 = new Usuario({ id: "00000000003", password: "123", nombre: "Gilberto Borrego", clases: ["0002", "0004"]});
    usuario4 = new Usuario({ id: "00000000004", password: "123", nombre: "Juan Taplio", clases: ["0001", "0002", "0003", "0004" ,"0005"]});
    usuario5 = new Usuario({ id: "00000000005", password: "123", nombre: "Lucas Marcos", clases: ["0004"]});

    clase1 = new Clase({ id: "0001",
                        nombre: "Topico 1: Temas emergentes",
                        idProfesor: "00000000003",
                        aula: "AV1803",
                        horaInicio: "07:00:00 a. m.",
                        horaFin: "08:00:00 a. m."});
    clase2 = new Clase({ id: "0002",
                        nombre: "Metodologías ágiles",
                        idProfesor: "00000000004",
                        aula: "AV1802",
                        horaInicio: "08:00:00 a. m.",
                        horaFin: "09:00:00 a. m."});
    clase3 = new Clase({ id: "0003",
                        nombre: "Modelado 3D",
                        idProfesor: "00000000002",
                        aula: "AV702",
                        horaInicio: "09:00:00 a. m.",
                        horaFin: "10:00:00 a. m."});
    clase4 = new Clase({ id: "0004",
                        nombre: "Calidad de Software",
                        idProfesor: "00000000001",
                        aula: "LV1801",
                        horaInicio: "10:00:00 a. m.",
                        horaFin: "11:00:00 a. m."});
    clase5 = new Clase({ id: "0005",
                        nombre: "Topico 2: Introducción IoT",
                        idProfesor: "00000000003",
                        aula: "AV1804",
                        horaInicio: "11:00:00 a. m.",
                        horaFin: "12:00:00 p. m."});

    try {
        await usuario1.save();
        await usuario2.save();
        await usuario3.save();
        await usuario4.save();
        await usuario5.save();
        await clase1.save();
        await clase2.save();
        await clase3.save();
        await clase4.save();
        await clase5.save();
        res.status(201).send("Se agregaron los elementos a la base de datos correctamente.")
    } catch (error) {
        res.status(400).send(error)
    }
});

// Rutas de usuarios

router.get("/usuarios", auth, async (req, res) => {
    const listaUsuarios = await Usuario.find();
    res.send(listaUsuarios);
});

router.get('/usuarios/:id', async(req, res) => {
    var id = req.params.id;
    const usuario = await Usuario.findOne({id: id});
    res.send(usuario);
})

router.post('/usuarios', async (req, res) => {
    try {
        const usuario = new Usuario(req.body)
        console.log(usuario);
        await usuario.save()
        const token = await usuario.generateAuthToken()
        res.status(201).send({ usuario, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/usuarios/yo', auth, async(req, res) => {
    res.send(req.usuario)
})

router.post('/usuarios/login', async (req, res) => {
    try {
        const { id, password } = req.body
        const usuario = await Usuario.findByCredentials(id, password)
        if (!usuario) {
            return res.status(401).send({error: 'Error de inicio de sesión. Revise sus credenciales de acceso.'})
        }
        const token = await usuario.generateAuthToken()
        res.send({ usuario, token })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

router.post("/usuarios/me/logout", auth, async (req, res) => {
    try {
        req.usuario.tokens = req.usuario.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/usuarios/me/logoutall', auth, async(req, res) => {
    try {
        req.usuario.tokens.splice(0, req.usuario.tokens.length)
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Rutas de clases

router.get('/clases/', async(req, res) => {
    const listaClases = await Clase.find();
    res.send(listaClases);
});

router.get('/clases/:id', async(req, res) => {
    var id = req.params.id;
    const clase = await Clase.findOne({id: id});
    res.send(clase);
})

module.exports = router;