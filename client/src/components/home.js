import React, { Component } from 'react';
import ImageHero from './imagehero';
import destinyBackground from '../images/wallpaper.jpg';

export default class Home extends Component {
  render () {
    return (
      <div className="home-container">
        <ImageHero image={destinyBackground} />
        <div className="home">
          <div className="home-title">Welcome to QuickJoin</div>
          <br/>
          <div className="home-subtitle">Make New Friends!</div>
          <br/>
          <ul>
            <li className="home-list-item">Enter your games</li>
            <li className="home-list-item">Find a competitive match</li>
            <li className="home-list-item">Chat with your new friends</li>
          </ul>
          <br/>
          <div className="home-subtitle">Go on an epic adventure!</div>
        </div>
      </div>
    )
  }
}

