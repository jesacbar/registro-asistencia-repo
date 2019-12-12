import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListaClasesAlumno from './ListaClasesAlumno';

export default class TablaClasesAlumno extends Component {

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
                            <th width="100">Marcar asistencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListaClasesAlumno token={this.props.token} clases={this.props.clases} setClase={this.props.setClase}/>
                    </tbody>
                </table>
            </div>
        );
    };
};

TablaClasesAlumno.propTypes = {
    clases: PropTypes.array.isRequired,
    setClase: PropTypes.func.isRequired
};