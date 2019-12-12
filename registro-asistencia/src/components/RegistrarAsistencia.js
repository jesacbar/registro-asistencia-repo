import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const request = require('request');
const moment = require('moment');

export default class RegistrarAsistencia extends Component {

    state = {
        mensaje: '',
        codigo: '',
        asistenciaRegistrada: false,
        error: ''
    };

    onSubmit = e => {
        e.preventDefault();
        // Request con datos del registro de asistencia que se quiere crear y
        // el codigo de la clase.

        var hoy = moment();
        request.put(
            'http://localhost:5000/asistencias',
            {
                json:
                {
                    idClase: this.props.clase.id,
                    idAlumno: this.props.usuario.id,
                    fecha: hoy,
                    estado: "Asistencia",
                    codigo: this.state.codigo
                }
            },
            async (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    console.log("Se actualizó un registro de asistencia correctamente.")
                    this.setState({
                        asistenciaRegistrada: true
                    });
                } else {
                    console.log("Error al actualizar un registro de asistencia")
                    this.setState({
                        error: "Error: código de clase incorrecto."
                    });
                }
            }
        );
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        var hoy = moment().format("DD-MM-YYYY")
        console.log(this.props.clase.horaInicio);
        console.log(this.props.clase.horaFin);

        var horaInicioPartes = this.props.clase.horaInicio.split(':');
        var horaFinPartes = this.props.clase.horaFin.split(':');

        var horaInicio = moment().set({ 'hour': parseInt(horaInicioPartes[0]), 'minute': parseInt(horaInicioPartes[1]), 'seconds': 0 });
        var horaFin = moment().set({ 'hour': parseInt(horaFinPartes[0]), 'minute': parseInt(horaFinPartes[1]), 'seconds': 0 });

        // Si la hora actual está dentro de la hora de clases,
        // realizar lo siguiente.
        if (moment().isBetween(horaInicio, horaFin)) {
            var url = 'http://localhost:5000/asistencias/' + this.props.clase.id + "/" + hoy + "/" + this.props.usuario.id;

            const options = {
                url: url,
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    if (body !== "") {
                        if (JSON.parse(body).estado === "Asistencia") {
                            this.setState({
                                mensaje: "Su asistencia ya está registrada"
                            });
                        } else {
                            var htmlInputCodigo = document.getElementById("codigo");
                            htmlInputCodigo.oninvalid = e => {
                                e.target.setCustomValidity("Por favor ingresa el código de la clase.");
                            };
                            htmlInputCodigo.oninput = e => {
                                e.target.setCustomValidity('');
                            };
                        }
                    } else {
                        this.setState({
                            mensaje: "Usted no forma parte de la clase"
                        });
                    };
                };
            });
        } else {
            this.setState({
                mensaje: "Aún no es la hora de la clase"
            });
        }
    }

    render() {
        if (this.state.mensaje !== "") {
            return <div>
                <h3 style={{ textAlign: "center" }}>{this.state.mensaje}</h3>
                <Link to="/listadoClasesAlumno">
                    <button>Regresar al listado de clases</button>
                </Link>
            </div>
        }
        else if (!this.state.asistenciaRegistrada) {
            return <div>
                <h3>Registrar asistencia</h3>
                <div className="container">
                    <h3 style={{ textAlign: "center" }}>Ingrese el código de la clase</h3>
                    <form onSubmit={this.onSubmit}>
                        <p><font color="red">{this.state.error}</font></p>
                        <input
                            id="codigo"
                            type="text"
                            name="codigo"
                            placeholder="00000"
                            maxLength="5"
                            onChange={this.onChange}
                            required
                        />
                        <button type="submit"> Enviar </button>
                    </form>
                </div>
                <Link to="/listadoClasesAlumno">
                    <button>Regresar al listado de clases</button>
                </Link>
            </div>
        } else {
            return <Redirect to='/listadoClasesAlumno' />
        }
    }
}

RegistrarAsistencia.propTypes = {
    clase: PropTypes.object.isRequired,
    usuario: PropTypes.object.isRequired
};