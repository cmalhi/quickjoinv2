import React from 'react';
import axios from 'axios';
import { BrowserRouter as Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { app } from '../auth/firebase';

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
      search: false,
      submit: false,
    };
    this.db = app.database().ref().child('games');
    this.handlePost = this.handlePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleSearchCall = this.handleSearchCall.bind(this);
  }

  componentWillMount() {
    this.db.on('child_added', snap => {
      console.log('Snapshot id,', snap.key, 'Value: ', snap.val());
    })
  }

  handlePost(myGame) {
    this.db.push().set({game: myGame});
    this.setState({submit: true});
  }

  handleSubmit(e) {
    e.preventDefault();
    const myGame = {};
    const userId = firebase.auth().currentUser.uid;     
    if (this.state.selected) {    
      myGame.name = this.state.chosenGame;
      myGame.system = this.state.chosenSystem;
      myGame.message = this.refs.message.value;
      myGame.gamertag = this.refs.gamertag.value;
      myGame.userID = userId;
      this.handlePost(myGame);
      //reset the input fields
      this.refs.message.value = ''; 
      this.refs.gamertag.value = '';
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const gameToSearch = {};
    gameToSearch.name = this.refs.name.value;
    gameToSearch.system = this.refs.system.value;
    this.setState({chosenSystem: this.refs.system.value});
    this.handleSearchCall(gameToSearch)
    this.setState({search: true})
    this.refs.name.value = '';
    this.refs.system.value = '';
  }

  handleSearchCall(gameToSearch) {
    axios({
      method: 'POST',
      url: '/api/getgames',
      data: gameToSearch
    })
    .then((res) => {
      const data = res.data;
      const searchData = [];
      var url;
      for (let i = 0; i < data.length; i++) {
        if (data[i].cover && data[i].name) {  
          // if https: is missing in the url, this will fix it 
          if (data[i].cover.url.includes('https:')){ 
            url = data[i].cover.url;
          } else {
            url = 'https:' + data[i].cover.url;
          }    
          searchData.push({
            url: url,
            name: data[i].name,
          })
        }
      }
      this.setState({searchData: searchData})
    })
  }

  handleChoice(name) {
    this.setState({chosenGame: name, selected: true});
  }

  // <input className="form-input" id= "newGameSystem" type="text" ref="system" />
  render() {
    const images = this.state.searchData.map((game, i) => {
      return (
        <div onClick={this.handleChoice.bind(this, game.name)} key={i + "_id"} className="game-search">
          <img className="game-search-image" src={game.url} />
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
          {this.state.search && images}
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
        {this.state.submit ? <Redirect to={"/match"}/> : <br/>}
      </div>
    </div>
    );
  }
}

export default Home;