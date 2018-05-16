import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Menu = [{
  to: '/',
  label: 'Escritorio'
}, {
  to: '/users',
  label: 'Usuarios'
}]

export default class Header extends Component {
  state = {
    path: '/'
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark da-bg-primary">
        <Link className="navbar-brand" to="/">Dispensador</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {Menu.map((m, i) => (
              <li key={i} className={"nav-item" + (m.to === this.state.path ? " active" : "")}>
                <Link className="nav-link" to={m.to} onClick={() => this.setState({path: m.to})}>{m.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/settings">usuario A</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
