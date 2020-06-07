import React from 'react'
import { withRouter } from 'react-router-dom'

import Login from './Login'

class Home extends React.Component {
  render() {
    const { isAdmin, history } = this.props

    if(isAdmin) {
      history.push('/dashboard')
      return null;
    }

    return (
      <div className="container">
        <div className="login-container">
          <Login setIsAdmin={this.props.setIsAdmin} />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
