import React from 'react';
import axios from 'axios';
import auth from '../auth';
import Signup from './signup';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { promisify } from 'bluebird';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTaken: false,
      signedIn: false,
      badLogin: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    this.setState({signedIn: auth('status')}, ()=>{
      if (auth('status') === 'logged in') {
        return <Redirect to={{pathname: "/home"}} />;
      }
    });
  }

  handlePost(userObj) {
    axios({
      method: 'POST',
      url: '/api/handlelogin',
      data: userObj,
    })
    .then((res) => {
      console.log('ran post request for submitting login info on front end', res.data);
      if (res.data === 'Login failed') {
        this.setState({badLogin: true});
        auth('not logged in');
      } else {
        this.setState({signedIn: true});
        auth('logged in');
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    //grab username data from refs
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    //create user object payload
    var userObj = {
      username: username,
      password: password,
    }
    //check if usename exists
    //if exists hash and salt password and sign in 
    this.handlePost(userObj);
    //reset form values
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    if (this.state.signedIn) {
      return (
        <Router>
         <Redirect to={{pathname: '/about'}} />
        </Router>
      )
    }
    return (
      <div className="form-container">
        <div className=" form">
          <div className="form-title">LOG INTO QUICKJOIN</div>
          <form onSubmit={this.handleSubmit} className="login-form">        
            <label>
              <br />
              <div>Enter username</div>
              <input className="form-input" id="loginUsername" type="text" autoFocus ref="username" />
              <br />
              <br />
              <div>Enter password</div>
              <input className="form-input" id="loginPassword" type="password" ref="password" />
              <br />
              {this.state.badLogin ? <div style={{color: 'red'}}>Incorrect username or password.</div> : <br/>}
              <input className="form-button" type="submit" value="SUBMIT"/>
            </label>
          </form>
          <br />
          <Link className="form-button"to="/signup">SIGNUP</Link>
          <br />
        </div>
      </div>
    ) 
  }
}

export default Login;