var mongoose = require('mongoose');
mongoose.connect('mongodb://cmalhi:quickjoinv2@ds013495.mlab.com:13495/quickjoinv2', {useMongoClient: true});
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var gameSchema = mongoose.Schema({
  name: String,
  system: String,
  message: String,
  user: String,
  gamertag: String
});

var Game = mongoose.model('Game', gameSchema);
module.exports.games = Game;

var userSchema = mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User', userSchema);
module.exports.users = User;