var express = require('express');
var requestHandler = require('./requestHandlers');
var router = express.Router();

router.route('/handlelogin').post(requestHandler.login);

router.route('/handlesignup').post(requestHandler.signup);

router.route('/handlematch').get(requestHandler.getMatches);

router.route('/gamesapi').get(requestHandler.getGamesFromAPI);

module.exports = router;
