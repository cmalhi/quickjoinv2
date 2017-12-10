import React from 'react';
import MatchEntry from './matchentry';
import { app } from '../auth/firebase';

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
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
      this.setState({matches: extractedGames}, ()=>{console.log(this.state.matches)});
    })
  }

  render() {
    return (
      <div className="match">
        <br />
        {this.state.matches.map((match, key) => {
          return <MatchEntry match={match} key={key} />
        })}
      </div>
    );
  }
}

export default Match;