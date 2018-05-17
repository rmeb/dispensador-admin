import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Error from '../components/Error'
import {createKeystore, restoreKeystore} from '../lib/Lightwallet'
import {create_keystore} from  '../lib/Api'

export default class CreateAccount extends Component {
  state = {
    rut: '',
    password: '',
    repassword: '',
    error: '',
    error_rut: '',
    error_password: '',
    error_repassword: '',
    loading: false
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

    this.setState({error: '', loading: true})
    createKeystore(password).then(keys => {
      console.log(keys)
      //console.log(restoreKeystore(keys.keystore).getAddresses())
      //TODO guardar rut, password, serialized keystore
      let data = {
        rut, password,
        addresses: keys.addresses,
        keystore: keys.keystore
      }
      create_keystore(data).then(() => {
        this.props.history.goBack()
      }).catch(this.onError)
    })
  }

  onError = (e) => {
    this.setState({error: e.message ? e.message : e, loading: false})
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value
    let equals = e.target.dataset.equals
    let err = ''

    if (value.trim().length === 0) {
      err = 'El campo es requerido'
    } else if (equals && value !== this.state[equals]) {
      err = 'Las contraseñas deben ser iguales'
    }

    this.setState({[e.target.id]: e.target.value, ['error_' + id]: err})
  }

  render() {
    let {rut, password, repassword, error_rut, error_password, error_repassword} = this.state
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
                  <input className={this.inputValid(error_rut)} id="rut" placeholder="Ingrese el rut"
                    value={rut} onChange={this.onChange} />
                  <div className="invalid-feedback">{error_rut}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className={this.inputValid(error_password)} id="password" placeholder="Ingrese su contraseña"
                    value={password} onChange={this.onChange} />
                  <div className="invalid-feedback">{error_password}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="repassword">Reingrese Contraseña</label>
                  <input type="password" className={this.inputValid(error_repassword)} id="repassword" placeholder="Ingrese nuevamente su contraseña"
                    value={repassword} onChange={this.onChange} data-equals="password" />
                  <div className="invalid-feedback">{error_repassword}
                  </div>
                </div>
                <Error message={this.state.error} onClick={() => this.setState({error: ''})}/>
                <button type="submit" className="btn btn-success btn-block">Ingresar</button>
                <Link className="btn btn-link btn-block" to="/">Volver</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  inputValid = (err) => {
    return 'form-control' + (err.length !== 0 ? ' is-invalid' : '')
  }
}
