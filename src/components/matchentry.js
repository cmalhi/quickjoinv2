import React from 'react';

class MatchEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: {}
    }
  }

  componentDidMount() {
    this.setState({match: this.props.match})
  }

  render() {
    return (
      <div className="match-entry">
        <div>Someone wants to play {this.state.match.name} with you!</div>
        <div>On {this.state.match.system}</div>
        <div>Matched player has a mic: {this.state.match.mic}</div>
        <div>Their gamertag is: {this.state.match.gamertag}</div>
        <br />
      </div>
    )
  }
}

export default MatchEntry;