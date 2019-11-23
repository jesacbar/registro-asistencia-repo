import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListaClasesProfesor from './ListaClasesProfesor';

export default class TablaClasesProfesor extends Component {

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
                        <ListaClasesProfesor token={this.props.token} id={this.props.id}/>
                    </tbody>
                </table>
            </div>
        );
    };
};

TablaClasesProfesor.propTypes = {
    id: PropTypes.string.isRequired
};