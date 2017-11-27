import React from 'react';
import Login from './login';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { ref, firebaseAuth } from '../auth/firebase'


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTaken: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(e) {
    const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
  }

  saveUser(user) {
    return ref.child(`users/${user.uid}/info`)
      .set({
        email: user.email,
        uid: user.uid
      })
      .then(() => user)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.signup) {
      console.log('signup pressed')
      const userObj = { username: this.refs.username.value, password: this.refs.password.value }
      let validEmail = this.validateEmail(this.refs.username.value);
      if (validEmail && this.refs.password.value.length){      
        firebaseAuth().createUserWithEmailAndPassword(this.refs.username.value, this.refs.password.value)
          .then(this.saveUser)
            .catch(e => this.setState({error: e, badlogin: true}))
      }
    } else {
      this.setState({signup: true, login: false, badLogin: false});
      this.refs.username.value = "";
      this.refs.password.value = "";
    }
  }

  render() {

    return (
      <div className="form-container">
        <div className="form">
          <div className="form-title">SIGN UP FOR QUICKJOIN</div>
          <form onSubmit={this.handleSubmit} className="login-form">        
            <label>
              <br />
              <div>Choose username wisely</div>
              <input className="form-input" id="signupUsername" type="text" autoFocus ref="username" />
              <br />
              <br />
              <div>Create a password</div>
              <input className="form-input" id="signupPassword" type="password" ref="password" />
              {this.state.usernameTaken ? <div style={{color: 'red'}}>Username is already taken.</div> : <br />}
              <br />
              <input className="form-button" type="submit" value="SUBMIT" />
            </label>
          </form>
          <br />
          <Link className="form-button" to="/login">LOGIN</Link>
          <br />
        </div>
      </div>
    );
  }
}

export default Signup;
