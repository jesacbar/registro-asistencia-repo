import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MostrarCodigo extends Component {

    state = {
        codigo: ""
    };

    componentDidMount() {
        var ws = new WebSocket('ws://localhost:7000/');

        ws.onopen = () => {
            console.log('Cliente WebSocket conectado');
            var mensaje = this.props.clase.id + "," + this.props.clase.horaInicio + "," + this.props.clase.horaFin;
            ws.send(mensaje);
            console.log(mensaje);
        }

        // Desplegar notificaciones recibidas.
        ws.onmessage = (e) => {
            console.log('Recibido: ' + e.data);
            this.setState({
                codigo: e.data
            });
        }
    };

    render() {
        return (
            <div>
                <h1>{this.state.codigo}</h1>
            </div>
        );
    };
};

MostrarCodigo.propTypes = {
    clase: PropTypes.object.isRequired
};