import React from 'react';
import Login from './login';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTaken: false,
      signedIn: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(userObj) {
    axios({
      method: 'POST',
      url: '/api/handlesignup',
      data: userObj,
    })
    .then((res) => {
      console.log('ran post request for submitting signup info on front end', res.data);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    //store username and pass
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var userObj = {
      username: username,
      password: password
    }
    this.handlePost(userObj);
    this.refs.username.value = '';
    this.refs.password.value = '';
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
              <input className="form-input" id="signupUsername" type="text" autoFocus placeholder="choose username wisely" ref="username" />
              <br />
              <br />
              <div>Create a password</div>
              <input className="form-input" id="signupPassword" type="password" placeholder="enter a good password" ref="password" />
              <br />
              <input className="form-button" type="submit" value="SUBMIT" />
            </label>
          </form>
          <br />
          <button className="form-button"><Link to="/Login">Login</Link></button>
          <br />
        </div>
      </div>
    );
  }
}

export default Signup;
