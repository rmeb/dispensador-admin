import React, { Component } from 'react';
import {isAllowed, denyUser, allowUser, isRegistrar} from '../lib/Eth'

const AUTHORIZED = 'AUTHORIZED'
const DENY = 'DENY'

export default class Dashboard extends Component {
  state = {
    address: '',
    status: '',
    error_address: '',
    registrar: false,
    loading: false,
    password: ''
  }

  componentDidMount() {
    isRegistrar().then(registrar => this.setState({registrar})).catch(this.onError)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true, status: ''})
    this.checkAddress().then(isAllowed).then(status => {
      this.setState({status: status ? AUTHORIZED : DENY, loading: false})
    }).catch(this.onError)
  }

  onError = (e) => {
    this.setState({loading: false})
    this.props.onError(e.message ? e.message : e)
  }

  checkAddress = () => {
    let address = this.state.address.trim()
    if (address.length === 0) {
      return Promise.reject('Direccion requerida.')
    }
    return Promise.resolve(address)
  }

  submit = (e) => {
    e.preventDefault()
    let password = this.state.password
    let status = this.state.status
    let func = status === AUTHORIZED ? denyUser : allowUser

    this.props.onError('')
    this.setState({loading: true, password: ''})
    this.checkAddress().then(address => func(address, password)).then(r => {
      this.setState({status: status === AUTHORIZED ? DENY : AUTHORIZED, loading: false})
    }).catch(this.onError)
  }

  onAddress = (e) => {
    let address = e.target.value
    let error_address = ''

    if (address.trim().length === 0) {
      error_address = 'La dirección es requerida'
    }
    this.setState({address, error_address})
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value

    this.setState({[id]: value})
  }

  render() {
    let {address, error_address} = this.state
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card bg-light">
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="address">Dirección</label>
                  <input id="address" className={valid(error_address)} placeholder="0x0"
                    value={address} onChange={this.onAddress}/>
                  <div className="invalid-feedback">{error_address}</div>
                </div>
                {this._renderMessage()}
                <button className="btn btn-primary btn-block" disabled={this.state.loading}>Estado</button>
                {this._renderButton()}
              </form>
            </div>
          </div>
        </div>
        <RequirePassword onClick={this.submit} password={this.state.password} onChange={this.onChange}/>
      </div>
    );
  }

  _renderMessage = (status) => {
    if (this.state.status === AUTHORIZED)
      return <MessageCard message="El dispensador esta autorizado" />
    if (this.state.status === DENY)
      return <MessageCard message="El dispensador no esta autorizado" />
    return null
  }

  _renderButton = () => {
    if (!this.state.registrar || this.state.status.length === 0) return null
    let label = this.state.status === AUTHORIZED ? 'Denegar' : 'Autorizar'
    let className = this.state.status === AUTHORIZED ? "btn btn-danger btn-block" : "btn btn-success btn-block"

    return (
      <button type="button" className={className} data-toggle="modal" data-target="#passwordModal" disabled={this.state.loading}>
        {this.state.loading ? <i className="fa fa-circle-notch fa-spin"></i> : label}
      </button>
    )
  }
}

const RequirePassword = ({onClick, password, onChange}) => (
  <div className="modal fade" id="passwordModal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Requiere Contraseña</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Contraseña</label>
            <input id="password" className="form-control" type="password" value={password} onChange={onChange} />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onClick}>Continuar</button>
        </div>
      </div>
    </div>
  </div>
)

const MessageCard = ({message}) => (
  <div className="card mb-3">
    <div className="card-body">
      <strong>{message}.</strong>
    </div>
  </div>
)
/*
const SuccessMessage = ({children, close}) => (
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    {children}
    <button type="button" className="close" onClick={close} aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)*/

function valid(e) {
  return 'form-control' + (e.length !== 0 ? ' is-invalid' : '')
}
