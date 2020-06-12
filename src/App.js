import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';

import Home from 'screens/Home';
import Dashboard from 'screens/Dashboard';

import AuthService from 'services/auth'
import PrivateRoute from 'components/PrivateRoute';

require('dotenv').config();

export default class App extends React.PureComponent {
  state = {
    loading: true,
    isAdmin: false,
    currentAdmin: null
  }

  componentDidMount = async () => {
    this.setState({ loading: true })

    const token = localStorage.getItem('token')

    if (token) {
      try {
        const data = await AuthService.me(token)
        this.setState({ isAdmin: data.body.isAdmin, currentAdmin: data.body })
      } catch (e) {
        
      }
    }

    this.setState({ loading: false })
  }

  logout = () => {
    localStorage.clear()
    this.setState({ isAdmin: false })
  }


  render() {
    const { loading, isAdmin, currentAdmin } = this.state
    
    if(loading) {
      return null
    }

    return (
      <div>
        <div className="header" >
          <h1 style={{textAlign: 'right', width: '62%'}}>Website quản lí mở cửa nhà</h1>
        </div>
        <Router>
        <Switch>
          <Route path="/" exact>
            <Home isAdmin={isAdmin} setIsAdmin={() => this.setState({ isAdmin: true })} />
          </Route>
          <PrivateRoute component={Dashboard} isAdmin={isAdmin} logout={this.logout} currentAdmin={currentAdmin} />
        </Switch>
      </Router>
      <div className="footer" style={{ position: "absolute", bottom: 20, left: "50%", transform: "translate(-50%, 0)", fontSize: "20px" }}>
        DATN20192 - Lê Hoàng Tuấn 20154089
      </div>
      </div>
    )
  }
}
