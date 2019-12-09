import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListaClasesProfesor from './ListaClasesProfesor';

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
                <h1 style={{textAlign: "center"}}>{this.state.codigo}</h1>
                <table className="materias" id="materias" align="center" border="1" cellPadding="2" >
                    <thead>
                        <tr>
                            <th width="150">ID</th>
                            <th width="300">Nombre</th>
                            <th width="200">Estado</th>
                            <th width="200">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListaClasesProfesor token={this.props.token} id={this.props.id} mostrarCodigo={this.props.mostrarCodigo}/>
                    </tbody>
                </table>
                <Link to="/listadoClasesProfesor">
                    <button>Regresar al listado de clases</button>
                </Link>
            </div>
        );
    };
};

MostrarCodigo.propTypes = {
    clase: PropTypes.object.isRequired
};