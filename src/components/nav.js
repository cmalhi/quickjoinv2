import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Home from './home';
import Match from './match';
import About from './about';

class Nav extends React.Component {

  render () {
    return (
      <Router>
        <div>
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
        </div>
      </Router>
    );
  }
}

export default Nav;


//TODO: 
//logout route/handler
//home component