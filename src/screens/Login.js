import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {sha3_256} from 'js-sha3'
import Error from '../components/Error'
import LoadingButton from '../components/LoadingButton'
import {get_keystore} from '../lib/Api'
import {validate_rut} from '../lib/Validation'
import session from '../lib/Session'

export default class Login extends Component {
  state = {
    rut: '',
    password: '',
    error: '',
    error_rut: '',
    error_password: '',
    loading: false
  }

  componentDidMount() {
    if (session.valid()) {
      this.props.history.push('/private/users')
    }
  }

  submit = (e) => {
    e.preventDefault()
    let rut = this.state.rut.trim()
    let password = this.state.password.trim()

    if (rut.length === 0 || password.length === 0) {
      return
    }

    this.setState({loading: true})
    get_keystore(rut, sha3_256(password)).then(keystore => {
      session.new_session(keystore, rut)
      this.props.history.push('/private/users')
    }).catch(this.onError)
  }

  onError = (e) => {
    this.setState({error: e.message ? e.message : e, loading: false})
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value
    let err = ''

    if (value.trim().length === 0) {
      err = 'El campo es requerido'
    }
    if (id === 'rut' && !validate_rut(value)) {
      err = 'El rut no es valido'
    }

    this.setState({[e.target.id]: e.target.value, ['error_' + id]: err})
  }

  render() {
    let {rut, password, error_rut, error_password} = this.state
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
                  <input className={inputValid(error_rut)} placeholder="Ingrese el rut"
                    id="rut" value={rut} onChange={this.onChange}/>
                  <div className="invalid-feedback">{error_rut}.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" className={inputValid(error_password)} placeholder="Ingrese su contraseña"
                    id="password" value={password} onChange={this.onChange}/>
                  <div className="invalid-feedback">{error_password}.</div>
                </div>
                <Error message={this.state.error} onClick={() => this.setState({error: ''})}/>
                <LoadingButton loading={this.state.loading} label="Ingresar"/>
                <Link className="btn btn-link btn-block" to="/account">Registrarse</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function inputValid(err) {
  return 'form-control' + (err.length !== 0 ? ' is-invalid' : '')
}
