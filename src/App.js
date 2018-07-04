import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {Dashboard, Settings, Login, CreateAccount} from './screens'
import Error from './components/Error'
import Header from './components/Header'
import Battery from './components/Battery'
import Loading from './components/Loading'

import session from './lib/Session'

import './App.css';

class App extends Component {
  state = {
    error: '',
    loading: true
  }

  componentDidMount() {
    session.init().then(() => this.setState({loading: false})).catch(() => this.setState({loading: false}))
  }

  logout = (e) => {
    session.logout()
    window.$('#exitModal').modal('toggle')
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Login}/>
          <Route exact path="/account" component={CreateAccount}/>
          <PrivateRoute path="/private" component={Header}/>
          <div className="da-body-margin">
            <PrivateRoute path="/private" component={BatteryPanel} onError={error => this.setState({error})}/>
            <PrivateRoute path="/private" component={Error} message={this.state.error} onClick={() => this.setState({error: ''})}/>
            <PrivateRoute path="/private/dashboard" component={Dashboard} onError={error => this.setState({error})}/>
            <PrivateRoute path="/private/settings" component={Settings}/>
          </div>
          <ExitModal onClick={this.logout}/>
        </div>
      </Router>
    );
  }
}

const BatteryPanel = ({onError}) => (
  <div className="row mb-3 justify-content-end">
    <div className="col-sm-12">
      <Battery onError={onError} />
    </div>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => session.valid() ? (
      <Component {...props} {...rest}/>
    ) : (
      <Redirect to={{pathname: "/", state: { from: props.location }}}/>
    )
  }/>
);

const ExitModal = ({onClick}) => (
  <div className="modal fade" id="exitModal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Salir</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>¿Desea salir de la aplicación?</p>
        </div>
        <div className="modal-footer">
          <Link to="/" className="btn btn-primary" onClick={onClick}>Si</Link>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
)

export default App;
