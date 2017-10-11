import React from 'react'
// import axios from 'axios'
// import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    }
  }

  render() {
    return (
      <div className="form-container">
        <div className=" form">
          <div className="form-title">ABOUT QUICKJOIN</div>
          <br />
          <div>
            <ul>
              <li>Ever play an online video game that none of your lame real-life friends play?</li>
              <li>Do you love that game dearly?</li>
              <li>Do you want to make friends with people who play that same online game?</li>
              <li>Do you like going on radical adventures with complete strangers?</li>
            </ul>
              <br/>
              <div>If you answered yes to any of these questions, QuickJoin is right for you!</div>
              <br/>
          </div>
          <div className="home-subtitle">
            What is QuickJoin?
          </div>
          <br/>
          <div>
            QuickJoin is an amazing new platform where you can easily find people who want to play the same online game as you.
            Simply tell us what game you want to play and we'll match you up with some other guy who is looking for friends to play the same game!
            Sounds exciting? 
          </div>
          <br/>
          <div>WELL WUT R U WATING 4 BRUH. Signup and get started!</div>
          <div>Created by Chetanpreet Malhi</div>
        </div>
      </div>
    )
  }
}

export default Login;