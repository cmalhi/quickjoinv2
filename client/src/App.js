import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/home';
import Match from './components/match';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';

class App extends Component {
  constructor(props) {
    super(props);
    this._inactive = 'nav-entry',
    this._active = 'nav-entry-active'
  }

  componentDidMount() {
    console.log('props in app', this.props)
  }

  render() {
    return (
      <Router>
        <div>
          <div className="title">QuickJoin</div>
          <div className="nav">
            <Link className="nav-entry" to="/about">ABOUT</Link>
            <Link className="nav-entry" to="/home">HOME</Link> 
            <Link className="nav-entry" to="/match">MATCH</Link>
            <Link className="nav-entry" to="/login">LOGIN</Link>
            <Link className="nav-entry" to="/signup">SIGNUP</Link>
            <Link className="nav-entry" to="/logout">LOGOUT</Link>
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
