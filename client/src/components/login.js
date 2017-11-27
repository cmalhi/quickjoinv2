import React from 'react';
import axios from 'axios';
import Signup from './signup';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { ref, firebaseAuth } from '../auth/firebase';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      badLogin: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(e) {
    const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.login) {
      const userObj = { username: this.refs.username.value, password: this.refs.password.value }
      console.log('login pressed');
      let validEmail = this.validateEmail(this.refs.username.value);
      if (validEmail) {      
        firebaseAuth().signInWithEmailAndPassword(this.refs.username.value, this.refs.password.value)
          .catch((error) => {
              this.setState({error: 'Invalid username/password.', badlogin: true})
            })
      }
    } else {
      this.setState({login: true, signup: false, badLogin: false});
      this.refs.username.value = "";
      this.refs.password.value = "";
    }
  }

  render() {
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