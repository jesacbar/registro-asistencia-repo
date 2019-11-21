import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListadoClaseMaestro from './ListadoClaseMaestro';

export default class ListaClasesMaestro extends Component {

    render() {
        return <ListadoClaseMaestro token={this.props.token} id={this.props.id} />
    };
};

ListaClasesMaestro.propTypes = {
    token: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};