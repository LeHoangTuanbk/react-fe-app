import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';

import Home from 'screens/Home';
import Dashboard from 'screens/Dashboard';

require('dotenv').config();

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
