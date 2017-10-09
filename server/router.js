var express = require('express');
var requestHandler = require('./requestHandlers');
var router = express.Router();

router.route('/handlelogin').post(requestHandler.login);

router.route('/handlesignup').post(requestHandler.signup);

router.route('/handlelogout').post(requestHandler.logout);

router.route('/handlegamepost').post(requestHandler.postGames);

router.route('/handlematch').get(requestHandler.getMatches);

router.route('/getgames').get(requestHandler.getGames)

module.exports = router;
