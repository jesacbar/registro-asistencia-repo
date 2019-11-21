import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListaClasesMaestro from './ListaClasesMaestro';

export default class TablaClasesMaestro extends Component {

    render() {
        return (
            <div>
                <table className="materias" id="materias" align="center" border="1" cellPadding="2" >
                    <thead>
                        <tr>
                            <th width="300">Materia</th>
                            <th width="100">Aula</th>
                            <th width="200">Hora inicio</th>
                            <th width="200">Hora fin</th>
                            <th width="100">Verificar Asistencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListaClasesMaestro token={this.props.token} id={this.props.id}/>
                    </tbody>
                </table>
            </div>
        );
    };
};

TablaClasesMaestro.propTypes = {
    id: PropTypes.string.isRequired
};