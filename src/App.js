import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'
import {Dashboard, Users, Settings, Login, CreateAccount} from './screens'
import Header from './components/Header'
import Battery from './components/Battery'

import session from './lib/Session'
import {network, net_label, get_accounts, getWeiBalance} from './lib/Eth'

import './App.css';

class App extends Component {
  state = {
    network: '',
    balance: 0
  }

  componentDidMount() {
    network().then(netId => {
      this.setState({network: net_label(netId)})
    }).catch(console.error)
    let accounts = get_accounts()
    if (accounts.length > 0) {
      getWeiBalance('0x' + accounts[0]).then(balance => {
        this.setState({balance: balance.toNumber()})
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Login}/>
          <Route exact path="/account" component={CreateAccount}/>
          <PrivateRoute path="/private" component={Header}/>
          <div className="da-body-margin">
            <div className="row mb-3 justify-content-end">
              <div className="col-sm-12">
                <Battery balance={this.state.balance} version={this.state.network}/>
              </div>
            </div>
            <PrivateRoute path="/private/dashboard" component={Dashboard}/>
            <PrivateRoute path="/private/users" component={Users}/>
            <PrivateRoute path="/private/settings" component={Settings}/>
          </div>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => session.valid() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: "/", state: { from: props.location }}}/>
    )
  }/>
);

export default App;
