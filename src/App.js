import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/home';
import Match from './components/match';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';
import Nav from './components/nav';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="title">QuickJoin</div>
          <div className="nav">
            <div className="nav-entry">
              <Link to="/about">About</Link>
            </div>
            <div className="nav-entry">
              <Link to="/home">Home</Link> 
            </div>
            <div className="nav-entry">
              <Link to="/match">Match</Link>
            </div>
            <div className="nav-entry">
              <Link to="/login">Login</Link>
            </div>
            <div className="nav-entry">
              <Link to="/signup">Signup</Link>
            </div>
            <div className="nav-entry">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/match" component={Match} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/logout" render={() => <h1>Process LOGOUT</h1>} />
        </div>
      </Router>
    );
  }
}

export default App;
