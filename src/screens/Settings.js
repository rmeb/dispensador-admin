import React, { Component } from 'react';
import {get_accounts, getWeiBalance, from_wei} from '../lib/Eth'

export default class Settings extends Component {
  state = {
    accounts: [],
    balance: 0
  }

  componentDidMount() {
    let accounts = get_accounts()
    if (accounts.length > 0) {
      getWeiBalance('0x' + accounts[0]).then(r => {
        this.setState({balance: parseInt(from_wei(r.toString()), 10)})
      }).catch(console.error)
    }
    this.setState({accounts})
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="display-5">{this.state.balance} eth</h1>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-header">Direcciones</div>
            <ul className="list-group list-group-flush text-center">
              {this.state.accounts.map((a, i) => (
                <li key={i} className="list-group-item">0x{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
