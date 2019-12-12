import React, { Component } from 'react';
import PropTypes from 'prop-types';

const request = require('request');
const moment = require('moment');

export default class ListadoAsistencia extends Component {

    quitarAsistencia = () => {
        var hoy = moment();
        request.put(
            'http://localhost:5000/asistencias',
            {
                json:
                {
                    idClase: this.props.asistencia.idClase,
                    idAlumno: this.props.asistencia.idAlumno,
                    fecha: hoy,
                    estado: "Falta"
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

    render() {
        return <tr>
                <td>{this.props.asistencia.idAlumno}</td>
                <td>{this.props.asistencia.nombreAlumno}</td>
                <td>{this.props.asistencia.estado}</td>
                <td><button onClick={(e) => this.quitarAsistencia()}>Quitar asistencia</button></td>
            </tr>
    };
};

ListadoAsistencia.propTypes = {
    asistencia: PropTypes.object.isRequired
};