import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {get_keystore} from '../lib/Api'

export default class Login extends Component {
  state = {
    rut: '',
    password: ''
  }

  submit = (e) => {
    e.preventDefault()
    let rut = this.state.rut.trim()
    let password = this.state.password.trim()

    if (rut.length === 0 || password.length === 0) {
      return
    }

    let data = {
      rut, password
    }
    get_keystore(data).then(console.log).catch(console.error)
    //this.props.history.push('/private/dashboard')
  }

  onChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
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
                  <input className="form-control" id="rut" aria-describedby="emailHelp" placeholder="Ingrese el rut"
                    value={this.state.rut} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña"
                    value={this.state.password} onChange={this.onChange}/>
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
