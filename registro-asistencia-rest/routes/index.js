const express = require("express");
const router = express.Router();
const Asistencia = require("../models/asistencia");
const schedule = require("node-schedule");
const http = require('http');
const WebSocketServer = require('websocket').server;
const randomstring = require("randomstring");
const moment = require('moment');

var conexiones = new Map();
var codigosClase = new Map();

const server = http.createServer();
const puertoSocket = 7000;
server.listen(puertoSocket);
console.log("Servidor del WebSocket de códigos iniciado en puerto " + puertoSocket + ".")

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    const conexion = request.accept(null, request.origin);

    // Cuando se reciba un mensaje de un cliente del WebSocket
    // generar (si es necesario) y mandarle el código de la clase
    // que le solicite en el mensaje.
    conexion.on('message', function (message) {
        console.log('Mensaje recibido: ' + message.utf8Data);
        var mensajePartes = message.utf8Data.split(",");
        var idClase = mensajePartes[0];
        var horaInicioString = mensajePartes[1];
        var horaFinString = mensajePartes[2];

        // Formato esperado: 07:00
        var horaInicioPartes = horaInicioString.split(':');
        var horaFinPartes = horaFinString.split(':');

        var horaInicio = moment().set({ 'hour': parseInt(horaInicioPartes[0]), 'minute': parseInt(horaInicioPartes[1]) });
        var horaFin = moment().set({ 'hour': parseInt(horaFinPartes[0]), 'minute': parseInt(horaFinPartes[1]) });

        conexiones.set(conexion, idClase);

        // Si la hora actual está dentro de la hora de clases,
        // generar el código.
        if (moment().isBetween(horaInicio, horaFin)) {
            // Si no está registrada la clase en el mapa de
            // codigos de clase, generar un código para esa
            // clase y registrarla.
            if (!codigosClase.has(idClase)) {
                console.log("<Proceso de generar codigos iniciado>")
                var codigo = randomstring.generate({ length: 5, charset: "numeric" });
                codigosClase.set(idClase, codigo);
                console.log("Se generó un código de clase.");
                console.log(codigo);
            }

            conexion.sendUTF(codigosClase.get(idClase));
            console.log("Se mandó código de clase.")
        } else {
            conexion.sendUTF("Aún no es la hora de la clase.");
            console.log("Se mandó notificación de que aún no es la hora de la clase.")
        };

    });
    conexion.on('close', function (reasonCode, description) {
        console.log('Se ha desconectado el cliente.')
        conexiones.delete(conexion);
    })
})

// Tarea para generar nuevos códigos cada minuto para las clases
// que lo han solicitado.
generarCodigoTarea = schedule.scheduleJob('*/1 * * * *', function () {
    console.log('<Tarea de generar claves iniciada>');
    for (var [idClase, codigo] of codigosClase) {
        var codigoNuevo = randomstring.generate({ length: 5, charset: "numeric" });
        codigosClase.set(idClase, codigoNuevo);
        console.log("Clase: " + idClase + " Código: " + codigoNuevo);
        for (var [conexion, idClaseConexion] of conexiones) {
            if (idClaseConexion === idClase) {
                conexion.sendUTF(codigoNuevo);
                console.log(codigoNuevo);
            };
        };
    };
});

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