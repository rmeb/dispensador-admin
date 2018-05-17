import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {createKeystore, restoreKeystore} from '../lib/Lightwallet'
import {create_keystore} from  '../lib/Api'

export default class CreateAccount extends Component {
  state = {
    rut: '',
    password: '',
    repassword: ''
  }

  submit = (e) => {
    e.preventDefault()
    let rut = this.state.rut.trim()
    let password = this.state.password.trim()
    let repassword = this.state.repassword.trim()

    if (rut.length === 0 || password.length === 0) {
      return
    }
    if (password !== repassword) {
      return
    }

    createKeystore(password).then(keys => {
      console.log(keys)
      console.log(restoreKeystore(keys.keystore).getAddresses())
      //TODO guardar rut, password, serialized keystore
      let data = {
        rut, password,
        addresses: keys.addresses,
        keystore: keys.keystore
      }
      create_keystore(data).then(console.log).catch(console.error)
    })
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
            <h1 className="display-5">Nuevo Usuario</h1>
          </div>
          <div className="card bg-light">
            <div className="card-body">
              <form onSubmit={this.submit}>
                <div className="form-group">
                  <label htmlFor="rut">Rut</label>
                  <input className="form-control" id="rut" aria-describedby="emailHelp" placeholder="Ingrese el rut"
                    value={this.state.rut} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña"
                    value={this.state.password} onChange={this.onChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="repassword">Reingrese Contraseña</label>
                  <input type="passrepasswordword" className="form-control" id="repassword" placeholder="Ingrese nuevamente su contraseña"
                    value={this.state.repassword} onChange={this.onChange} required/>
                </div>
                <button type="submit" className="btn btn-success btn-block">Ingresar</button>
                <Link className="btn btn-link btn-block" to="/">Volver</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
