import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default class ListadoClaseProfesor extends Component {

    state = {
        mostrarCodigo: false
    };

    mostrarCodigo = async () => {
        this.props.setClase(this.props.clase);
        await this.setState({
            mostrarCodigo: true
        });
    };

    render() {
        if (this.state.mostrarCodigo === false) {
            return <tr>
                <td>{this.props.clase.nombre}</td>
                <td>{this.props.clase.aula}</td>
                <td>{this.props.clase.horaInicio}</td>
                <td>{this.props.clase.horaFin}</td>
                <td><button div class ="Asistencia" onClick={(e) => this.mostrarCodigo()}>
                        Generar código
                </button></td>
            </tr>
        } else {
            return <Redirect to='/mostrarCodigo/'/>;
        }
    };
};

ListadoClaseProfesor.propTypes = {
    clase: PropTypes.object.isRequired,
    setClase: PropTypes.func.isRequired
};
