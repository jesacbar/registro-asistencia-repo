const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const Clase = require("../models/clase");
const auth = require("../middleware/auth");

// Al hacer esta petición se generan varios alumnos y clases para pruebas
// del sistema.
router.get("/generarstub", async(req, res) => {
    usuario0 = new Usuario({ id: "0", password: "123", nombre: "Terry Testing", esProfesor: true })
    usuario1 = new Usuario({ id: "00000000001", password: "123", nombre: "Edgar Fulano", esProfesor: true });
    usuario2 = new Usuario({ id: "00000000002", password: "123", nombre: "Pedro Asola", esProfesor: true });
    usuario3 = new Usuario({ id: "00000000003", password: "123", nombre: "Gilberto Borrego", esProfesor: true });
    usuario4 = new Usuario({ id: "00000000004", password: "123", nombre: "Juan Taplio", esProfesor: true });
    usuario5 = new Usuario({ id: "00000000005", password: "123", nombre: "Lucas Marcos", esProfesor: true });

    usuario6 = new Usuario({ id: "00000164812", 
                             password: "123", 
                             nombre: "Jesús Aceves Barco", 
                             esProfesor: false, 
                             clases: ["0001", "0002", "0005"] });
    usuario7 = new Usuario({ id: "00000164758", 
                             password: "123", 
                             nombre: "Jesús Manuel Almada Aragón", 
                             esProfesor: false, 
                             clases: ["0002", "0003", "0004"] });
    usuario8 = new Usuario({ id: "00000165454", 
                             password: "123", 
                             nombre: "Joel Ramón Luna Valenzuela", 
                             esProfesor: false, 
                             clases: ["0002", "0004"] });
    usuario9 = new Usuario({ id: "00000148548", 
                             password: "123", 
                             nombre: "Fernando Alberto Rodríguez Vega", 
                             esProfesor: false, 
                             clases: ["0001", "0002", "0003", "0004" ,"0005"] });

    clase0 = new Clase({ id: "0000",
                        nombre: "Proyecto integrador de Software",
                        idProfesor: "0",
                        aula: "AV1801",
                        horaInicio: "13:00",
                        horaFin: "15:00"});
    clase1 = new Clase({ id: "0001",
                        nombre: "Topico 1: Temas emergentes",
                        idProfesor: "00000000003",
                        aula: "AV1803",
                        horaInicio: "07:00",
                        horaFin: "08:00"});
    clase2 = new Clase({ id: "0002",
                        nombre: "Metodologías ágiles",
                        idProfesor: "00000000004",
                        aula: "AV1802",
                        horaInicio: "08:00",
                        horaFin: "09:00"});
    clase3 = new Clase({ id: "0003",
                        nombre: "Modelado 3D",
                        idProfesor: "00000000002",
                        aula: "AV702",
                        horaInicio: "09:00",
                        horaFin: "10:00"});
    clase4 = new Clase({ id: "0004",
                        nombre: "Calidad de Software",
                        idProfesor: "00000000001",
                        aula: "LV1801",
                        horaInicio: "10:00",
                        horaFin: "11:00"});
    clase5 = new Clase({ id: "0005",
                        nombre: "Topico 2: Introducción IoT",
                        idProfesor: "00000000003",
                        aula: "AV1804",
                        horaInicio: "11:00",
                        horaFin: "12:00"});

    try {
        await usuario0.save();
        await usuario1.save();
        await usuario2.save();
        await usuario3.save();
        await usuario4.save();
        await usuario5.save();
        await usuario6.save();
        await usuario7.save();
        await usuario8.save();
        await usuario9.save();
        await clase0.save();
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

// --- Rutas de usuarios ---

// Regresa todos los usuarios registrados en la BD.
router.get("/usuarios", auth, async (req, res) => {
    const listaUsuarios = await Usuario.find();
    res.send(listaUsuarios);
});

// Regresa el usuario cuya ID coincide con la que se le pasa
// en la URL.
router.get('/usuarios/:id', async(req, res) => {
    var id = req.params.id;
    const usuario = await Usuario.findOne({id: id});
    res.send(usuario);
})

// Ingresa el usuario que se le pase en el cuerpo de la petición.
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

/* 
router.get('/usuarios/yo', auth, async(req, res) => {
    res.send(req.usuario)
})
*/

// Identifica a un usuario dado un ID y una contraseña que se le pasen
// en el cuerpo de la petición. En caso de ser datos de ingreso válidos
// se genera un token,  y se regresan los datos del usuario y el token generado.
// El token regresado se puede usar para poder hacer peticiones a las rutas
// protegidas de esta apliación.
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

// Desacopla el token que se le pase como encabezado "Autorization" de la petición 
// del usuario al que pertenece.
router.post("/usuarios/yo/logout", auth, async (req, res) => {
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

// Desacopla todos los tokes que pertenecen al usuario que tiene el
// token que se le pase como encabezado "Autorization".
router.post('/usuarios/yo/logouttodos', auth, async(req, res) => {
    try {
        req.usuario.tokens.splice(0, req.usuario.tokens.length)
        await req.usuario.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// --- Rutas de clases ---

// Regresa todas las clases registradas en la BD.
router.get('/clases/', async(req, res) => {
    const listaClases = await Clase.find();
    res.send(listaClases);
});

// Regresa la clase cuya ID coincide con la que se le pasa
// en la URL.
router.get('/clases/:id', async(req, res) => {
    var id = req.params.id;
    const clase = await Clase.findOne({id: id});
    res.send(clase);
});

// Regresa todas las clases impartidas por el profesor cuya
// ID coincida con la que se le pase como parámetro.
router.get('/clases/profesor/:id', async(req, res) => {
    var idProfesor = req.params.id;
    const clases = await Clase.find({idProfesor: idProfesor});
    res.send(clases);
});

module.exports = router;