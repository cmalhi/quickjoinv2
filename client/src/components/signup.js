import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { ref, firebaseAuth } from '../auth/firebase';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameTaken: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  saveUser(user) {
    return ref.child(`users/${user.uid}/info`)
      .set({ email: user.email, uid: user.uid })
        .then(() => user)
  }

  handleSubmit(e) {
    e.preventDefault();    
    firebase.auth().createUserWithEmailAndPassword(this.refs.username.value, this.refs.password.value)
      .then(this.saveUser)
        .catch(e => this.setState({error: e}, ()=>{console.log('Firebase Authentication Error: ', this.state.error)}))
  }

  render() {

    return (
      <div className="form-container">
        <div className="form">
          <div className="form-title">SIGN UP FOR QUICKJOIN</div>
          <form className="login-form" onSubmit={this.handleSubmit}>        
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
