import React, { Component } from 'react';

export default class LoginForm extends Component {

    state = {
        id: '',
        password: ''
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.identificarse(this.state.id, this.state.password);
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentDidMount() {
        var htmlInputId = document.getElementById("id");
        htmlInputId.oninvalid = e => {
            e.target.setCustomValidity("Por favor ingresa tu ID.");
        };
        htmlInputId.oninput = e => {
            e.target.setCustomValidity('');
        };

        var htmlInputPass = document.getElementById("password");
        htmlInputPass.oninvalid = e => {
            e.target.setCustomValidity("Por favor ingresa tu contraseña.");
        };
        htmlInputPass.oninput = e => {
            e.target.setCustomValidity('');
        };
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <p><font color="red">{this.props.error}</font></p>
                    <input
                        id="id"
                        type="text"
                        name="id"
                        placeholder="Ingresa tu ID"
                        onChange={this.onChange}
                        value={this.state.titulo}
                        required
                    />
                    <br />
                    <br />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={this.onChange}
                        value={this.state.titulo}
                        required
                    />
                    <br />
                    <br />
                    <button type="submit">
                        Enviar
                </button>
                </form>
            </div>
        );
    };
};