import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Test from './Test';

var request = require('request');

export default class ListadoClaseMaestro extends Component {

    state = {
        clases: null
    }

    constructor(props) {
        super(props);
        this.obtenerClase(this.props.token, this.props.id);
    }

    obtenerClase = (token, idProfesor) => {
        var url = 'http://localhost:2000/clases/maestro/' + idProfesor;

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
                console.log(this.state.clases[0])
                console.log(this.state.clases[1])
            }
        });
    };

    render() {
        if (this.state.clases === null) {
            return <h1>"jojo"</h1>
        } else {
            return this.state.clases.map(clase => 
                <Test clase={clase}/>     
            ) 
        }
    }
};

ListadoClaseMaestro.propTypes = {
    token: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};