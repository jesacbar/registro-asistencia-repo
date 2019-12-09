import React, { Component } from 'react';
import './App.css'
import logo from './itson.png';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import LoginForm from './components/LoginForm'
import TablaClasesAlumno from './components/TablaClasesAlumno';
import TablaClasesProfesor from './components/TablaClasesProfesor';
import MostrarCodigo from './components/MostrarCodigo';

var request = require('request');

class App extends Component {

  state = {
    usuario: JSON.parse(localStorage.getItem("usuario")),
    token: localStorage.getItem("token"),
    error: '',
    clase: null
  };
  
  identificarse = (id, password) => {
    request.post( 
        'http://localhost:2000/usuarios/login',
        { json: { id: id, password: password } },
        async (error, response, body) => {
            if (!error && response.statusCode === 200) {
              localStorage.setItem("usuario", JSON.stringify(body.usuario));
              localStorage.setItem("token", body.token);
              this.setState({
                usuario: JSON.parse(localStorage.getItem("usuario")),
                token: localStorage.getItem("token"),
                error: ""
              })
            } else {
              this.setState({
                error: "Error al iniciar sesión: Verifica tus datos de ingreso."
              })
            }
        }
    );
  }

  // Cierra la sesión del usuario tanto en la página del CIA
  // como en el sistema registro de asistencias.
  cerrarSesion = () => {
    const options = {
      url: 'http://localhost:2000/usuarios/yo/logout',
      headers: {
        'Authorization': this.state.token
      }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Cierre de sesión exitoso.");
      }
    }

    request.post(options, callback);

    localStorage.clear();
    this.setState({
        usuario: null,
        token: null,
        error: null,
        clase: null
    })
  };

  mostrarCodigo = async (clase) => {
    await this.setState({
      clase: clase
    });
  };

  render() {
    //localStorage.clear();
    return <div>
      <Router>
        {/*Pantalla de login*/}
        <Route exact path="/" render={() => {
          if (this.state.usuario !== null) {
            if (this.state.usuario.esProfesor === false) {
              return <Redirect to='/listadoClasesAlumno'/>;
            } else {
              return <Redirect to='/listadoClasesProfesor'/>
            }
          } 
          return <div>
            <div className="imgcontainer">
              <img src={logo} alt="Avatar" className="avatar"/>
            </div>
            <LoginForm identificarse={this.identificarse} error={this.state.error}/>
          </div>
        }}> 
        </Route>
        {/*Pantalla de listado de clases de alumno*/} 
        <Route exact path="/listadoClasesAlumno" render={() => {
          if (this.state.usuario !== null && this.state.usuario.esProfesor === false) {
            return <div>
          <h1>Listado de clases</h1>
              <TablaClasesAlumno token={this.state.token} clases={this.state.usuario.clases}/>
              <button onClick={this.cerrarSesion}>
                    Cerrar sesión
              </button>
            </div>
          } else {
            return <Redirect to='/'/>;
          }
        }}>
        </Route>
        {/*Pantalla de listado de clases de profesor*/} 
        <Route exact path="/listadoClasesProfesor" render={() => {
          if (this.state.usuario !== null && this.state.usuario.esProfesor === true) {
            return <div>
              <h1>Listado de clases</h1>
              <TablaClasesProfesor token={this.state.token} id={this.state.usuario.id} mostrarCodigo={this.mostrarCodigo}/>
              <button onClick={this.cerrarSesion}>
                    Cerrar sesión
              </button>
            </div>
          } else {
            return <Redirect to='/'/>;
          }
        }}>
        </Route>
        <Route exact path="/mostrarCodigo" render={() => {
          if (this.state.usuario !== null && this.state.usuario.esProfesor === true && this.state.clase !== null) {
            return <MostrarCodigo clase={this.state.clase}/>
          } else {
            return <Redirect to='/'/>;
          }
        }}>
        </Route>
      </Router>
    </div>
  };
};

export default App;
