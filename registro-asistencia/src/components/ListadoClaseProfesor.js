import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Test extends Component {

    render() {
        return <tr>
            <td>{this.props.clase.nombre}</td>
            <td>{this.props.clase.aula}</td>
            <td>{this.props.clase.horaInicio}</td>
            <td>{this.props.clase.horaFin}</td>
            <td><button>Registrar asistencia</button></td>
        </tr>
    };
};

Test.propTypes = {
    clase: PropTypes.object.isRequired
};
