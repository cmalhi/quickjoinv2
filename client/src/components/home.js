import React, { Component } from 'react';

export default class Home extends Component {
  render () {
    return (
      <div className="home-container">
        <div className="home">
          <div className="home-title">Welcome to QuickJoin</div>
          <br/>
          <div className="home-subtitle">Make New Friends!</div>
          <div className="home-list-item">Tell us all the games you are currently playing</div>
          <div className="home-list-item">Our Quickengine will suggest competitively matched players based on the games you have in common</div>
          <div className="home-list-item">Chat with your new friends and set up a time to play</div>
          <div className="home-subtitle">Have an epic online battle!</div>
        </div>
      </div>
    )
  }
}