import React from 'react';
import axios from 'axios';
// import Match from './Match.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      games: null,
      cover: null,
      searchData: [{url: '', title: ''}],
      selected: false,
      chosenSystem: null,
      chosenGame: null,
    };
    this.handlePost = this.handlePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleMatchGet = this.handleMatchGet.bind(this);
    this.handleSearchCall = this.handleSearchCall.bind(this);
  }

  componentDidMount() {
    console.log('gameform')
  }

  handleMatchGet(gamePostObj) {
    console.log('game post obj', gamePostObj)
  }

  handlePost(gamePostObj) {
    axios({
      method: 'POST',
      url: '/api/handlegamepost',
      data: gamePostObj
    })
    .then((res) => {
      //this.handleMatchGet(gamePostObj);
      console.log('ran post request for submitting post on front end');
    })
    console.log('attempted to post: ', gamePostObj)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('THE GAME U WANT TO PLAY IS', this.state.chosenGame, this.state.selected)
    var gamePostObj = {};
    if (this.state.selected) {    
      gamePostObj.name = this.state.chosenGame;
      gamePostObj.system = this.state.chosenSystem;
      gamePostObj.message = this.refs.message.value;
      gamePostObj.gamertag = this.refs.gamertag.value;

      if (this.refs.system.value === 'xbox one') {
        alert('Xbox is garbage fam')
      }
      console.log('gamepostobj', gamePostObj)
      this.handlePost(gamePostObj);

      //reset all the input fields
      this.refs.message.value = ''; 
      this.refs.gamertag.value = '';
      //after submit you should be ridirected to the Match page
    } else {
      console.log('you have to select a game first');
    }
  }

  handleSearch(e) {
    e.preventDefault();
    var gameSearchObj = {};
    gameSearchObj.name = this.refs.name.value;
    gameSearchObj.system = this.refs.system.value;
    this.setState({chosenSystem: this.refs.system.value});
    this.handleSearchCall(gameSearchObj)

    this.refs.name.value = '';
    this.refs.system.value = '';
  }

  handleSearchCall(gameSearchObj) {
    axios({
      method: 'POST',
      url: '/api/getgames',
      data: gameSearchObj
    })
    .then((res) => {
      //this.handleMatchGet(gameSearchObj);
      console.log('ran post request for submitting post on front end');
      var data = res.data;
      var searchData = [];
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].cover && res.data[i].name) {        
          var url = 'https:' + res.data[i].cover.url;
          searchData.push({
            url: url,
            name: res.data[i].name,
          })
        }
      }
      console.log(searchData, "DIS THE DATA=======")
      this.setState({searchData: searchData})
    })
    console.log('attempted to post: ', gameSearchObj)
  }

  handleChoice(name) {
    this.setState({chosenGame: name, selected: true})
  }

  // <input className="form-input" id= "newGameSystem" type="text" ref="system" />
  render() {
    const images = this.state.searchData.map((game, i) => {
      console.log(game,i)
      return (
        <div onClick={this.handleChoice.bind(this, game.name)} className="game-search">
          <img className="game-search-image" src={game.url} key={i} />
          <div>{game.name}</div>
        </div>
      )
    });
    return (
      <div className="form-container">
        <div className="form">
        <div className="form-title">SEARCH FOR PLAYERS</div>
        <form onSubmit={this.handleSearch.bind(this)} className="login-form">
          <label>
            <br />
            <div className="form-element">
              <div>Search game titles</div>
              <input className="form-input" id= "newGameName" type="text" autoFocus ref="name" />
            </div>
            <br />
            <div className="form-element">
              <div>System</div>
              <select ref="system">
                <option>PS4</option>
                <option>Xbox One</option>
              </select>
            </div>
            <br />                              
            <input className="form-button" type="submit" value="SEARCH" />
          </label>
        </form>
        <br/>
        <div className="game-search-container">
          {images}
        </div>
        <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <label>
            <div className="form-element">
              <div>PSN/Gamertag</div>
              <input className="form-input" id= "newGameGamerTag" type="text" ref="gamertag" />
            </div>
            <br />  
            <div className="form-element">
              <div>A breif message to go along with your post</div>
              <input className="form-input" id= "newGameMessage" type="text" ref="message" />
            </div>
            <br />                    
            <input className="form-button" type="submit" value="SUBMIT" />
          </label>
        </form>
      </div>
    </div>
    );
  }
}

export default Home;