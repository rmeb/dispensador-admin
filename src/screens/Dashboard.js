import React, { Component } from 'react';
import Error from '../components/Error'

const AUTHORIZED = 'AUTHORIZED'
const DENY = 'DENY'

export default class Dashboard extends Component {
  state = {
    address: '',
    status: '',
    error_address: '',
    error: ''
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({status: AUTHORIZED})
  }

  authorize = (e) => {
    e.preventDefault()
    this.setState({status: AUTHORIZED})
  }

  deny = (e) => {
    e.preventDefault()
    this.setState({status: DENY})
  }

  onAddress = (e) => {
    let address = e.target.value
    let error_address = ''

    if (address.trim().length === 0) {
      error_address = 'La dirección es requerida'
    }
    this.setState({address, error_address})
  }

  render() {
    let {address, error_address} = this.state
    return (
      <div className="row">
        <div className="col-sm-12">
          <Error message={this.state.error} onClose={() => this.setState({message: ''})} />
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
                <button className="btn btn-primary btn-block">Estado</button>
                {this._renderButton()}
              </form>
            </div>
          </div>
        </div>
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
    if (this.state.status === AUTHORIZED)
      return <button className="btn btn-danger btn-block" onClick={this.deny}>Denegar</button>
    if (this.state.status === DENY)
      return <button className="btn btn-success btn-block" onClick={this.authorize}>Autorizar</button>
    return null
  }
}

const MessageCard = ({message}) => (
  <div className="card mb-3">
    <div className="card-body">
      <strong>{message}.</strong>
    </div>
  </div>
)

const SuccessMessage = ({children, close}) => (
  <div className="alert alert-success alert-dismissible fade show" role="alert">
    {children}
    <button type="button" className="close" onClick={close} aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)

function valid(e) {
  return 'form-control' + (e.length !== 0 ? ' is-invalid' : '')
}
