import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import logo from '../logo.svg'

export default class Login extends Component {
  submit = (e) => {
    e.preventDefault()
    this.props.history.push('/private/dashboard')
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center da-logo">
            <img src={logo} width={300} height={300} alt="logo"/>
          </div>
          <div className="card">
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
                <p className="text-right text-muted font-italic">¿No tienes cuenta? Crea una <Link to="/account">aqui</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
