import React from 'react';
import { Background, Parallax } from 'react-parallax';
import destinyBackground from './images/wallpaper.jpg';
import arrow from './images/arrow.png';
import { Link } from 'react-router-dom';

const ImageHero = () => (
  <div style={styles.container}>
    <img src={destinyBackground} style={styles.image} />
    <div style={styles.content}>
      <div style={styles.welcome}>Welcome</div>
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          <li style={styles.listItem}>Tell us the games you are currently playing</li>
          <li style={styles.listItem}>Find a competitive match</li>
          <li style={styles.listItem}>Chat with your new friends</li>
        </ul>
      </div>
      <div style={styles.subtitle}>Go on an eipc online adventure!</div>
      <Link to="/mygames" style={styles.find}>FIND PLAYERS</Link>

    </div>
  </div>
);

export default ImageHero;
const styles = {
  container: {
   fontFamily: 'Poiret One',
   textAlign: 'left',
   width: '100%',
   height: '1080px',
   position: 'relative',
   overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
  },
  image: {
    minWidth: '100%',
    pointerEvents: 'none',
    userSelect: 'none',
    margin: 'auto',
    position: 'absolute',
    zIndex: 1,
  },
  welcome: {
    fontSize: '5.5em',
    color: 'white',
    paddingLeft: '30px',
    paddingTop: '10%',
    position: 'fixed',
  },
  listItem: {
    marginBottom: '13px',
    textShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
  list: {
    listStyleType: 'none',
    fontSize: '1.75em',
    width: '650px'
  },
  listContainer: {
    color: 'white',
    position: 'absolute',
    paddingTop: '30px',
    paddingLeft: '30px',
    paddingRight: '30px',
    bottom: 70,
  },
  find: {
    whiteSpace: 'nowrap',
    position: 'absolute',
    zIndex: 2,
    right: '30px',
    bottom: 0,
    color: 'white',
    fontSize: '2em',
    border: '1px solid white',
    background: 'rgba(240,32,0,0.85)',
    padding: '20px',
    marginBottom: '30px',
    textDecoration: 'none',
    cursor: 'hand',
  },
  subtitle: {
    position: 'absolute',
    bottom: 0,
    fontSize: '2.5em',
    color: 'white',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingBottom: '30px',
    paddingTop: '5px',
  }
}
