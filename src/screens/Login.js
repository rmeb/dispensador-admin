import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Login extends Component {
  submit = (e) => {
    e.preventDefault()
    this.props.history.push('/private/dashboard')
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center">
            <img src="img/logo.png" alt="logo"/>
            <h1 className="display-5">Dispensador Admin</h1>
          </div>
          <div className="card bg-light">
            <div className="card-body">
              <form onSubmit={this.submit}>
                <div className="form-group">
                  <label htmlFor="rut">Rut</label>
                  <input className="form-control" id="rut" aria-describedby="emailHelp" placeholder="Ingrese el rut"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                <Link className="btn btn-link btn-block" to="/account">Registrarse</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
