import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListadoAsistencia extends Component {

    render() {
        return <tr>
                <td>{this.props.asistencia.idAlumno}</td>
                <td>{this.props.asistencia.nombreAlumno}</td>
                <td>{this.props.asistencia.estado}</td>
                <td><button>Quitar asistencia</button></td>
            </tr>
    };
};

ListadoAsistencia.propTypes = {
    asistencia: PropTypes.object.isRequired
};