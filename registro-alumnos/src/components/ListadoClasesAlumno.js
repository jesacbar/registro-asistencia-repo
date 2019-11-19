import React, { Component } from 'react';

export default class ListadoClasesAlumno extends Component {
    
    state = {
        id: '',
        password: ''
    };

    onSubmit = e => {
        this.props.identificarse(this.state.id, this.state.password);
        e.preventDefault();
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <table className="materias" id="materias" align="center" border="1" cellpadding="2" >
                <thead>
                    <tr>
                        <th width="300">Materia</th>
                        <th width="100">Aula</th>
                        <th width="200">Hora inicio</th>
                        <th width="200">Hora fin</th>
                        <th width="100">Marcar asistencia</th>
                    </tr>
                </thead>
            </table>
        );
    };
};