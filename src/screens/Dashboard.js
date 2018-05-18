import React, { Component } from 'react';
import Loading from '../components/Loading'

export default class Dashboard extends Component {
  state = {
    loading: false
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <div className="row">
        <h1 className="display-4">Dashboard</h1>
      </div>
    )
  }
}
