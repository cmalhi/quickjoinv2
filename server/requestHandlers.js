// var config = require('../../config');
var db = require('./db');
var { promisify } = require('bluebird');
var bcrypt = require('bcrypt');

var promisifiedFind = promisify(db.users.findOne.bind(db));
var sessionUser;
//if there is a session go directly to /GameForm

// global['3scaleKey'] = config.IGDBKey;
// const client = igdb();

exports.login = (req, res) => {
  //extract user
  var username = req.body.username;
  var password = req.body.password;
  //check if the usrname exists
  getUser(username, (err, userExists) => {
    if (err) throw err;
    if (!userExists) {
      badLogin(req, res);
    }
    if (userExists) {
      //if exists check password
      bcrypt.compare(password, userExists.password)
      .then((matching) => {
        console.log('DID THE HASH MATCH?', matching);
        if (matching) {
          // createSession(req, res, username);
        } else {
          badLogin(req, res);
        }
      })
    }
  });
}

getUser = (username, callback) => {
  db.users.findOne({username}, callback)
}

badLogin = (req, res) => {
  console.log('bad Login');
  res.send('Login failed');
}

createSession = (req, res, user) => {
  req.session.regenerate((err) => {
    if (err) throw err;
    req.session.user = user;
    sessionUser = req.session.user;
    //add the user to the session for easy access when doing match requests.
    //add user to newGame schema so that you can reject your own results when filtering.
    console.log('a new session was created by', user)
    res.send(req.session)
  })
}


exports.signup = (req, res) => {
  //extract user
  var username = req.body.username;
  var password = req.body.password;
  var encrypetdUser = {};
  //check if the usrname exists
  getUser(username, (err, users) => {
    if (err) throw err;
    if (users) {
      console.log('the username exists');
      res.send(false);
    } else {
      //if doesnt exist create new user and encrypt and store password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          encrypetdUser.username = username;
          encrypetdUser.password = hash;
          postUser(encrypetdUser, (err, newUser) => {
            if (err) throw err;
            console.log('logging the req', req ,'req session', req.session)
            // createSession(req.session, username, res);
          })
        })
      })
    }
  });
}

postUser = (user, callback) => {
  db.users.create(user, callback)
}

exports.postGames = (req, res) => {
  var newGame = {};
  newGame.name = req.body.name;
  newGame.system = req.body.system;
  newGame.mic = req.body.mic;
  newGame.user = sessionUser;
  newGame.gamertag = req.body.gamertag;
  console.log('newgame variable', newGame)
  postGame(newGame, (err, game) => {
    if (err) throw err;
    else res.send(game);
  })
}

getGames = (gameObj, callback) => {
  var name = gameObj.name;
  var system = gameObj.system;
  db.games.find({name: name, system: system}, callback)
}

postGame = (newGame, callback) => {
  db.games.create(newGame, callback)
}

getGamesByUser = (username, callback) => {
  db.games.find({user: username}, callback)
}

exports.getMatches = (req, res) => {
  //create obj to store game submitted by user
  var userGame = {};
  //grab that game and store the value into the obj
  getGamesByUser(sessionUser, (err, games) => {
    console.log('the session user is ', sessionUser)
    if (err) throw err;
    //console.log('grabbed all the games the user posted', games);
    userGame.name = games[0].name;
    userGame.system = games[0].system;
    console.log('userGame', userGame)
    var userChoice = {
      name: userGame.name,
      system: userGame.system
    }

    getGames(userChoice, (err, games) => {
      if (err) throw err;
      //console.log('in get matches the games returned are ', games);
      var filteredGameArray = games.filter((game) => {
        return game.user !== sessionUser;
      });
      //console.log('The filtered Game Array: ', filteredGameArray)
      res.send(filteredGameArray);
    })
    
  })
  //find all games that match without the username matching 
  //filter out and send all the games that are the same not by the user
}

exports.getGamesFromAPI = (req, res) => {
  client.games({
      fields: '*', // Return all fields
      limit: 5, // Limit to 5 results
      offset: 15 // Index offset for results
  }).then(res => {
      // response.body contains the parsed JSON response to this query
      console.log('response form api call');
      res.send(res.data)
  }).catch(error => {
      throw error;
  });
}

