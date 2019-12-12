import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

var request = require('request');

export default class ListadoClaseAlumno extends Component {

    state = {
        clase: null,
        registrarAsistencia: false
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

    registrarAsistencia = async () => {
        this.props.setClase(this.state.clase);
        await this.setState({
            registrarAsistencia: true
        });
    };

    render() {
        if (!this.state.registrarAsistencia) {
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
                <td><button onClick={(e) => this.registrarAsistencia()}>Registrar asistencia</button></td>
            </tr>
        } else {
            return <Redirect to='/registrarAsistencia/'/>;
        };
    };
};

ListadoClaseAlumno.propTypes = {
    token: PropTypes.string.isRequired,
    clase: PropTypes.string.isRequired,
    setClase: PropTypes.func.isRequired
};