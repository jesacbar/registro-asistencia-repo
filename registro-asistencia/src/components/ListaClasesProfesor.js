import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListadoClaseProfesor from './ListadoClaseProfesor';

var request = require('request');

export default class ListaClasesProfesor extends Component {

    state = {
        clases: null
    }

    constructor(props) {
        super(props);
        this.obtenerClase(this.props.token, this.props.id);
    }

    obtenerClase = (token, idProfesor) => {
        var url = 'http://localhost:2000/clases/profesor/' + idProfesor;

        const options = {
            url: url,
            headers: {
                'Authorization': token
            }
        };

        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                this.setState({
                    clases: JSON.parse(body),
                });
            }
        });
    };

    render() {
        if (this.state.clases === null) {
            return <tr>
            <td>Cargando</td>
            <td>Cargando</td>
            <td>Cargando</td>
            <td>Cargando</td>
            <td><button>Registrar asistencia</button></td>
        </tr>
        } else {
            return this.state.clases.map(clase => 
                <ListadoClaseProfesor key={clase.id} clase={clase} setClase={this.props.setClase}/>     
            ) 
        }
    }
};

ListaClasesProfesor.propTypes = {
    token: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setClase: PropTypes.func.isRequired
};