import React, { Component } from 'react';

export default class LoginForm extends Component {
    
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
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    name="id"
                    placeholder="Ingresa tu ID" 
                    onChange={this.onChange} 
                    value={this.state.titulo}
                />
                <br/>
                <br/>
                <input 
                    type="password" 
                    name="password"
                    placeholder="Ingresa tu contraseña" 
                    onChange={this.onChange} 
                    value={this.state.titulo}
                />
                <br/>
                <br/>
                <button type="submit">
                    Enviar
                </button>
            </form>
        );
    };
};