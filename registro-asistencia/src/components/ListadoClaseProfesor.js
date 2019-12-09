import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default class ListadoClaseProfesor extends Component {

    state = {
        mostrarCodigo: false
    };

    mostrarCodigoPre = async () => {
        this.props.mostrarCodigo(this.props.clase);
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
                <td><button onClick={(e) => this.mostrarCodigoPre()}>
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
    mostrarCodigo: PropTypes.func.isRequired
};
