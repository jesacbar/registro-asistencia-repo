import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListaAsistencias from './ListaAsistencias';
//import ListadoAsistencia from './ListadoAsistencia';

var request = require('request');
const moment = require('moment');

export default class MostrarCodigo extends Component {

    state = {
        codigo: "",
        usuarios: {},
        asistencias: null
    };

    obtenerAsistencias = () => {
        console.log("Obteniendo asistencias...")
        var hoy = moment().format("DD-MM-YYYY");
        var url = 'http://localhost:5000/asistencias/' + this.props.clase.id + "/" + hoy;

        const options = {
            url: url
        };

        request(options, async (error, response, body) => {
            if (!error && response.statusCode === 200) {
                this.setState({
                    asistencias: JSON.parse(body),
                });
                console.log("Asistencias:", body)
            }
        });
    };

    registrarAsistenciasIniciales = async () => {
        console.log("Obteniendo clases...")
        var url = 'http://localhost:2000/usuarios/clase/' + this.props.clase.id;
        var alumnosClase = null;
        const options = {
            url: url
        };

        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var hoy = moment();
                alumnosClase = JSON.parse(body);
                for (var alumno of alumnosClase) {
                    request.post(
                        'http://localhost:5000/asistencias',
                        {
                            json:
                            {
                                idClase: this.props.clase.id,
                                idAlumno: alumno.id,
                                nombreAlumno: alumno.nombre,
                                fecha: hoy,
                                estado: "Falta"
                            }
                        },
                        async (error, response, body) => {
                            if (!error && response.statusCode === 201) {
                                console.log("Se agregó un registro de asistencia correctamente.")
                                this.obtenerAsistencias();
                            } else {
                                console.log("Error al agregar un registro de asistencia")
                            }
                        }
                    );
                };
            }
        });
    };

    componentDidMount() {
        var ws = new WebSocket('ws://localhost:7000/');

        ws.onopen = () => {
            console.log('Cliente WebSocket conectado');
            var mensaje = this.props.clase.id + "," + this.props.clase.horaInicio + "," + this.props.clase.horaFin;
            ws.send(mensaje);
            console.log(mensaje);
        }

        // Desplegar notificaciones recibidas.
        ws.onmessage = (e) => {
            console.log('Recibido: ' + e.data);
            var mensaje = e.data.split(',');
            if (mensaje[0] === 'codigo') {
                this.setState({
                    codigo: mensaje[1]
                });
            }
            else if (mensaje[0] === 'actualizacion') {
                this.obtenerAsistencias();
            }
            else if (mensaje[0] === 'registrar-iniciales') {
                this.registrarAsistenciasIniciales();
            };
        }
    };

    render() {
        if (this.state.asistencias !== null) {
            return (
                <div>
                    <h1 style={{ textAlign: "center" }}>{this.state.codigo}</h1>
                    <table className="materias" id="materias" align="center" border="1" cellPadding="2" >
                        <thead>
                            <tr>
                                <th width="150">ID</th>
                                <th width="300">Nombre</th>
                                <th width="200">Estado</th>
                                <th width="200">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListaAsistencias asistencias={this.state.asistencias} />
                        </tbody>
                    </table>
                    <Link to="/listadoClasesProfesor">
                        <button>Regresar al listado de clases</button>
                    </Link>
                </div>
            );
        } else {
            return <div>
                <h1 style={{ textAlign: "center" }}>{this.state.codigo}</h1>
                <Link to="/listadoClasesProfesor">
                    <button>Regresar al listado de clases</button>
                </Link>
            </div>
        }
    };
};

MostrarCodigo.propTypes = {
    clase: PropTypes.object.isRequired
};