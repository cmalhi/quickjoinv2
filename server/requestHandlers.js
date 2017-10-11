var db = require('./db');
var bcrypt = require('bcrypt');
var config = require('./config');
var { promisify } = require('bluebird');
var igdb = require('igdb-api-node').default;
var promisifiedFind = promisify(db.users.findOne.bind(db));

global['3scaleKey'] = config.IGDBKey;
const client = igdb();

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
        console.log('DID THE HASH MATCH?', matching, userExists);
        if (matching) {
          createSession(req, res, username);
        } else {
          badLogin(req, res);
        }
      })
    }
  });
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
      res.send('the username is already taken');
    } else {
      //if doesnt exist create new user and encrypt and store password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          encrypetdUser.username = username;
          encrypetdUser.password = hash;
          postUser(encrypetdUser, (err, newUser) => {
            if (err) throw err;
            console.log('posting usesr to database')
            createSession(req, res, username);
          })
        })
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
    //add the user to the session for easy access when doing match requests.
    //add user to newGame schema so that you can reject your own results when filtering.
    console.log('a new session was created by', user)
    res.send(req.session)
  })
}

postUser = (user, callback) => {
  db.users.create(user, callback)
}

exports.postGames = (req, res) => {
  var newGame = {};
  console.log('the user posting is ', req.session.user)
  newGame.name = req.body.name;
  newGame.system = req.body.system;
  newGame.message = req.body.message;
  newGame.user = req.session.user;
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
  getGamesByUser(req.session.user, (err, games) => {
    console.log('the session user is ', req.session.user)
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
        return game.user !== req.session.user;
      });
      //console.log('The filtered Game Array: ', filteredGameArray)
      res.send(filteredGameArray);
    })
    
  })
  //find all games that match without the username matching 
  //filter out and send all the games that are the same not by the user
}

exports.logout = (req, res) => {
  req.session.destroy()
  console.log('session destroyed!')
  res.send('logout successful')
}

exports.getGames = (req, res) => {
  var name = req.body.name;
  var system = req.body.system;
  if (system === 'PS4') {
    system = 48;
  } else if (system === 'Xbox One') {
    system = 49;
  }
  client.games({
      fields: '*', // Return all fields
      limit: 15, // Limit to 5 results
      search: name,
      filters: {
        "release_dates.platform-eq" : system
      }
  }).then(response => {
      // response.body contains the parsed JSON response to this query
      console.log('COMING BACK FROM THE IGDB API', response.body);
      res.send(response.body);
  }).catch(error => {
      throw error;
  });
}

exports.getAuth = (req, res) => {
  if (req.session.user) {
    res.send('logged in');
  } else {
    console.log('no session')
    res.send('not logged in');
  }
}
