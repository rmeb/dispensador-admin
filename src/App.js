import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import {Dashboard, Users, Settings, Login, CreateAccount} from './screens'
import Header from './components/Header'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Login}/>
          <Route exact path="/account" component={CreateAccount}/>
          <Route path="/private" component={Header}/>
          <div className="da-body-margin">
            <Route path="/private/dashboard" component={Dashboard}/>
            <Route path="/private/users" component={Users}/>
            <Route path="/private/settings" component={Settings}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
