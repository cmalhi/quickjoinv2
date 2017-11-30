import React from 'react';
import { Background, Parallax } from 'react-parallax';
import destinyBackground from './images/wallpaper.jpg';
import arrow from './images/arrow.png';

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
      <img src={arrow} style={styles.arrow} />
    </div>
  </div>
);

export default ImageHero;
const styles = {
  container: {
   fontFamily: 'Poiret One',
   textAlign: 'left',
   width: '100vmax',
   height: '100vh',
   position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 2,
    height: '100%',
  },
  image: {
    width: '100%',
    minWidth: '800px',
    height: 'auto',
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
    paddingTop: '70px',
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
    padding: '30px',
    alignSelf: 'flex-end',
  },
  arrow: {
    width: '300px',
    height: 'auto',
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 2,
  },
  subtitle: {
    fontSize: '2em',
    color: 'white',
  }
}
