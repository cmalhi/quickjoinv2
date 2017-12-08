var db = require('./db');
var config = require('./config');
var { promisify } = require('bluebird');
var igdb = require('igdb-api-node').default;
var promisifiedFind = promisify(db.users.findOne.bind(db));

global['3scaleKey'] = config.IGDBKey;
const client = igdb();

exports.getGames = (req, res) => {
  if (req.body.name && req.body.system) {
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
          "release_dates.platform-eq" : system,
          // "version_parent-exists" : 0,
        }
    }).then(response => {
        // response.body contains the parsed JSON response to this query
        console.log('COMING BACK FROM THE IGDB API', response.body);
        res.send(response.body);
    }).catch(error => {
        throw error;
    });   
  }
}
