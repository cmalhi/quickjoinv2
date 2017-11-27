import React, { Component } from 'react'

export default class Home extends Component {
  render () {
    return (
      <div className="home-container">
        <div className="home">
          <div className="home-title">Welcome to my Hello Fresh coding challenge!</div>
          <br/>
          <div className="home-subtitle">This site features the following:</div>
          <div className="home-list-item">React</div>
          <div className="home-list-item">Redux</div>
          <div className="home-list-item">React Router V4</div>
          <div className="home-list-item">SCSS stylesheets</div>
          <div className="home-list-item">Firebase authentication</div>
          <br />
          <div className="home-subtitle">How to use:</div>
          <div className="home-list-item">You must signup with an email address and a password that is at least 6 characters.</div>
        </div>
      </div>
    )
  }
}