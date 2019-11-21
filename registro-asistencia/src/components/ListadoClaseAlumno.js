import React, { Component } from 'react';
import PropTypes from 'prop-types';

var request = require('request');

export default class ListadoClaseAlumno extends Component {

    state = {
        clase: null
    }

    constructor(props) {
        super(props);
        this.obtenerClase(this.props.token, this.props.clase);
    }

    obtenerClase = (token, idClase) => {
        var url = 'http://localhost:2000/clases/' + idClase;

        const options = {
            url: url,
            headers: {
                'Authorization': token
            }
        };

        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                this.setState({
                    clase: JSON.parse(body)
                });
            }
        });
    };

    render() {
        return this.state.clase === null ? 
            <tr>
                <td>Cargando</td>
                <td>Cargando</td>
                <td>Cargando</td>
                <td>Cargando</td>
                <td>Cargando</td>
            </tr>
            :
            <tr>
                <td>{this.state.clase.nombre}</td>
                <td>{this.state.clase.aula}</td>
                <td>{this.state.clase.horaInicio}</td>
                <td>{this.state.clase.horaFin}</td>
                <td><button>Registrar asistencia</button></td>
            </tr>
    };
};

ListadoClaseAlumno.propTypes = {
    token: PropTypes.string.isRequired,
    clase: PropTypes.string.isRequired
};