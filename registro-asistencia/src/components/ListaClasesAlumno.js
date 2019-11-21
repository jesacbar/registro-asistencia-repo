import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListadoClaseAlumno from './ListadoClaseAlumno';

export default class ListaClasesAlumno extends Component {

    render() {
        return this.props.clases.map(clase =>
            <ListadoClaseAlumno key={clase} token={this.props.token} clase={clase} />
        );
    };
};

ListaClasesAlumno.propTypes = {
    token: PropTypes.string.isRequired,
    clases: PropTypes.array.isRequired
};