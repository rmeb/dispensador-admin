import React, { Component } from 'react';
import {accounts, getWeiBalance} from '../lib/Eth'

export default class Settings extends Component {
  state = {

  }

  componentDidMount() {
    accounts().then(console.log).catch(console.error)
    //console.log('accounts', accounts())
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card bg-light">
            <div className="card-body">
              <div className="card-title">Palabras secretas</div>
              <h6 className="card-subtitle mb-2 text-muted">Guarda estas palabras en un lugar seguro</h6>
              <p className="card-text">words</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
