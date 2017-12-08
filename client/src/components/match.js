import React from 'react';
import axios from 'axios';
import MatchEntry from './matchentry';
import firebase from 'firebase';
import { config, app } from '../auth/firebase';

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    }
    this.db = app.database().ref().child('games');
  }

  componentWillMount() {
    this.db.on('value', snap => {
      const extractedGames = [];
      const games = snap.val();
      for(let key in games){
        extractedGames.push(games[key].game);
      }
      this.setState({matches: extractedGames}, ()=>{console.log(this.state.matches)})
    })
  }

  render() {
    return (
      <div className="form-container">
        <div>
          <div className="match-count">{this.state.matches.length} hot singles in your area</div>
          <br />
          {this.state.matches.map((match, key) => {
            return <MatchEntry match={match} key={key} />
          })}
        </div>
      </div>
      )
  }
}

export default Match;