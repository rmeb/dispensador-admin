import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import {Dashboard, Users, Settings} from './screens'
import Header from './components/Header'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <div className="da-body-margin">
            <Route exact path="/" component={Dashboard}/>
            <Route path="/users" component={Users}/>
            <Route path="/settings" component={Settings}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
