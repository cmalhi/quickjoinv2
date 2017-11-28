import React, { Component } from 'react';

export default class Home extends Component {
  render () {
    return (
      <div className="home-container" style={{backgroundImage: `url(../images/wallpaper)`}}>
        <div className="home">
          <div className="home-title">Welcome to QuickJoin</div>
          <br/>
          <div className="home-subtitle">Make New Friends!</div>
          <br/>
          <ul>
            <li className="home-list-item">Tell us all the games you are currently playing</li>
            <li className="home-list-item">Our Quickengine will suggest competitively matched players based on the games you have in common</li>
            <li className="home-list-item">Chat with your new friends and set up a time to play</li>
          </ul>
          <br/>
          <div className="home-subtitle">Go on an epic adventure!</div>
        </div>
      </div>
    )
  }
}