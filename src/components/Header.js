import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const Menu = [{
  to: '/private/dashboard',
  label: 'Escritorio'
}, {
  to: '/private/users',
  label: 'Usuarios'
}]

export default class Header extends Component {
  navigate = (to) => {
    window.$('#navbarNav').collapse('hide');
    if (to !== this.props.history.location.pathname) {
      this.props.history.push(to)
    }
  }

  render() {
    let path = this.props.history.location.pathname
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark da-bg-primary">
        <Link className="navbar-brand" to="/">Dispensador</Link>
        <button id="toggler" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {Menu.map((m, i) => (
              <li key={i} className={"nav-item" + (m.to === path ? " active" : "")}>
                <a className="nav-link" onClick={e => this.navigate(m.to)}>{m.label}</a>
              </li>
            ))}
          </ul>
          <div className="dropdown-divider"></div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" onClick={e => this.navigate("/private/settings")}>Nombre del Usuario</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
