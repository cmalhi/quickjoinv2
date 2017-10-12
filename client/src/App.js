import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import Home from './components/home';
import Match from './components/match';
import About from './components/about';
import Login from './components/login';
import Signup from './components/signup';
import axios from'axios';
import auth from './auth';

var loggedIn = auth('not logged in');

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
    this.handleLogout = this.handleLogout.bind(this);
    this._inactive = 'nav-entry';
    this._active = 'nav-entry-active';
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: '/api/getgames',
    })
    .then((res) => {
      console.log('get games function ran', res)
      //redirect to login screen
    })
    console.log('APP MOUNTED')
  }

  componentWillMount() {
    this.handleAuth();
  }

  handleAuth() {
    axios({
      method: 'GET',
      url: '/api/getauth',
    })
    .then((res) => {
      //this.handleMatchGet(gamePostObj);
      console.log(res.data, 'auth happened')
      if (res.data === 'logged in') {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    })
    console.log('getting auth')
  }

  handleLogout() {
    console.log('handle logout function')
    axios({
      method: 'POST',
      url: '/api/handlelogout',
    })
    .then((res) => {
      console.log('logout function ran', res)
      return <Redirect to={"/login"}/>
    })
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        this.state.loggedIn ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
          }}/>
        )
      )}/>
    )
    return (
      <Router>
        <div>
          <div className="title">QuickJoin</div>
          <div className="nav">
            <Link className="nav-entry" to="/about">ABOUT</Link>
            {<Link className="nav-entry" to="/home">HOME</Link>}
            {<Link className="nav-entry" to="/match">MATCH</Link>}
            {<Link className="nav-entry" to="/login">LOGIN</Link>}
            {<Link className="nav-entry" to="/signup">SIGNUP</Link>}
            {<div className="nav-entry" onClick={this.handleLogout}>LOGOUT</div>}
          </div>
          <Route exact path="/" component={About} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/match" component={Match} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}


