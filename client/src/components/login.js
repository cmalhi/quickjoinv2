import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../auth/firebase';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();     
    firebaseAuth().signInWithEmailAndPassword(this.refs.username.value, this.refs.password.value)
      .catch((e) => {
          this.setState({error: e}, ()=>{console.log('Firebase Authentication Error: ', this.state.error)})
        })
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