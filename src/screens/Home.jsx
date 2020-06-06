import React from 'react'

import Login from './Login'

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="login-container">
          <Login />
        </div>
      </div>
    )
  }
}

export default Home
