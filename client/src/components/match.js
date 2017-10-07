import React from 'react';
// import axios from 'axios';
import MatchEntry from './matchentry'

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    }
    this.handleMatchesResult = this.handleMatchesResult.bind(this);
  }

  componentDidMount() {
  }

  handleMatchGet() {
    // axios({
    //   method: 'GET',
    //   url: '/handlematch',
    // })
    // .then((res) => {
    //   console.log('ran get request for getting match on front end', res.data);
    //   this.setState({matches: res.data})
    //   console.log('Match: state: matches ', this.state.matches)
    // })
  }

  //pass in the match prop if match exists, 
  //otherwise send an alert that there is no match
  handleMatchesResult() {
    return <div>HANDLE RESULT MATCHES</div>
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
        </div >
      </div>
      )
  }
}

export default Match;