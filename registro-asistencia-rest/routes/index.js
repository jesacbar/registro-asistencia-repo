const express = require("express");
const router = express.Router();
const Asistencia = require("../models/asistencia");
const schedule = require("node-schedule");
const http = require('http');
const WebSocketServer = require('websocket').server;
const randomstring = require("randomstring");
const moment = require('moment');

var conexiones = new Map();
var clases = new Map();

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

        var horaInicio = moment().set({ 'hour': parseInt(horaInicioPartes[0]), 'minute': parseInt(horaInicioPartes[1]), 'seconds': 0});
        var horaFin = moment().set({ 'hour': parseInt(horaFinPartes[0]), 'minute': parseInt(horaFinPartes[1]), 'seconds': 0 });

        conexiones.set(conexion, idClase);

        // Si la hora actual está dentro de la hora de clases,
        // generar el código.
        if (moment().isBetween(horaInicio, horaFin)) {
            // Si no está registrada la clase en el mapa de
            // codigos de clase, generar un código para esa
            // clase y registrarla.
            if (!clases.has(idClase)) {
                console.log("<Proceso de generar codigos iniciado>")
                var codigo = randomstring.generate({ length: 5, charset: "numeric" });
                var clase = {
                    horaInicio: horaInicio,
                    horaFin: horaFin,
                    codigo: codigo
                };
                clases.set(idClase, clase);
                console.log("Se generó un código de clase.");
                console.log(codigo);
            }
            conexion.sendUTF('codigo,' + clases.get(idClase).codigo);
            console.log("Se mandó código de clase.")
        } else {
            conexion.sendUTF("codigo,Aún no es la hora de la clase");
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
    for (var [idClase, clase] of clases) {
        if (moment().isBetween(clase.horaInicio, clase.horaFin.subtract(1, 'minute'))) {
            var codigoNuevo = randomstring.generate({ length: 5, charset: "numeric" });
            clases.get(idClase).codigo = codigoNuevo;
            console.log("Clase: " + idClase + " Código: " + codigoNuevo);
            for (var [conexion, idClaseConexion] of conexiones) {
                if (idClaseConexion === idClase) {
                    conexion.sendUTF('codigo,' + codigoNuevo);
                };
            };
        } else {
            for (var [conexion, idClaseConexion] of conexiones) {
                if (idClaseConexion === idClase) {
                    conexion.sendUTF("codigo,Se acabó la hora de la clase");
                    conexiones.delete(conexion);
                    conexion.close();
                };
            };
            clases.delete(idClase);
            console.log("Se quitó una clase del listado de clases")
        };
    };
});

// Regresa todas las asistencias de la clase en la fecha que 
// que se le pase como parámetro. La fecha debe estar en formato
// DD-MM-AAAA.
router.get("/asistencias/:idClase/:fecha", async (req, res) => {
    var idClase = req.params.idClase;
    var fecha = moment(req.params.fecha, 'DD-MM-YYYY');
    const listaAsistencias = await Asistencia.find(
        {
            idClase: idClase, fecha: { $gt: fecha, $lt: moment(fecha).add(1, 'day').startOf('day') }
        }
    );
    res.send(listaAsistencias);    
});

// Agrega la asistencia que se le pase en el cuerpo de la
// petición.
router.post('/asistencias', async (req, res) => {
    var idClase = req.body.idClase;
    var idAlumno = req.body.idAlumno;
    var fecha = moment(req.body.fecha);
    console.log("idClase:",idClase,"idAlumno",idAlumno,"fecha",fecha);
    var asistencia = await Asistencia.findOne(
        {
            idClase: idClase, idAlumno: idAlumno, fecha: { $gt: moment(fecha).startOf('day'), $lt: moment(fecha).add(1, 'day').startOf('day') }
        }
    );
    if (asistencia === null) {
        try {
            const asistencia = new Asistencia(req.body)
            console.log("<Registro de asistencia exitoso>");
            await asistencia.save()
            res.status(201).send({ asistencia })
        } catch (error) {
            res.status(400).send(error)
        }
    } else {
        console.log("<No se hizo el registro de asistencia porque ya existía uno de ese alumno>");
        res.status(201).send();
    }
});

module.exports = router;