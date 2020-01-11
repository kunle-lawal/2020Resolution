import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import UserProfile from './components/dashboard/UserProfile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main_container">
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/user/:id' component={UserProfile} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
