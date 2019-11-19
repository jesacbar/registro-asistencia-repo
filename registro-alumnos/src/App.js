import React, { Component } from 'react';
import './App.css'
import logo from './itson.png';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import LoginForm from './components/LoginForm'
import ListadoClasesAlumno from './components/ListadoClasesAlumno';

var request = require('request');

class App extends Component {

  state = {

  };
  
  identificarse = (id, password) => {
    request.post( 
        'http://localhost:2000/usuarios/login',
        { json: { id: id, password: password } },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
              localStorage.setItem('token', body.token);
              localStorage.setItem('usuario', body.usuario);
            } else {
              console.log("Error al iniciar sesión")
            }
        }
    );
  }

  render() {
    return <div>
      <Router>
        {/*Pantalla de login*/}
        <Route exact path="/" render={() => {
          //if (localStorage.getItem('token') !== null) return <Redirect to='/listadoClases'/>;
          return <div>
            <div className="imgcontainer">
              <img src={logo} alt="Avatar" className="avatar"/>
            </div>
            <LoginForm identificarse={this.identificarse}/>
          </div>
        }}> 
        </Route>
        {/*Pantalla de listado de clases de alumno*/} 
        <Route exact path="/listadoClases" render={() => {
          return <div>
            <h1>Listado de clases</h1>
            <ListadoClasesAlumno/>
          </div>
        }}>
        </Route>
      </Router>
    </div>
  };
};

export default App;
