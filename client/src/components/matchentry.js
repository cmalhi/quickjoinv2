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
  // TODO, make it expand to the second row when clicked
  render() {
    return (
      <div className="match-entry">
        <div className="match-gamertag">{this.state.match.gamertag}</div>
        <div className="match-title">{this.state.match.name} | {this.state.match.system}</div>
        <br />
        <div className="match-message">{this.state.match.message}</div>
      </div>
    )
  }
}

export default MatchEntry;
