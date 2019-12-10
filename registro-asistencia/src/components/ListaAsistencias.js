import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListadoAsistencia from './ListadoAsistencia';

export default class ListaAsistencias extends Component {

    render() {
        return this.props.asistencias.map(asistencia =>
            <ListadoAsistencia asistencia={asistencia} />
        );
    };
};

ListaAsistencias.propTypes = {
    asistencias: PropTypes.array.isRequired
};