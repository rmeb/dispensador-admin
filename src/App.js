import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'
import {Dashboard, Users, Settings, Login, CreateAccount} from './screens'
import Header from './components/Header'

import session from './lib/Session'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Login}/>
          <Route exact path="/account" component={CreateAccount}/>
          <PrivateRoute path="/private" component={Header}/>
          <div className="da-body-margin">
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
