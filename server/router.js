var express = require('express');
var requestHandler = require('./requestHandlers');
var router = express.Router();

router.route('/handlelogin').post(requestHandler.login);

router.route('/handlesignup').post(requestHandler.signup);

router.route('/handlelogout').post(requestHandler.logout);

router.route('/handlegamepost').post(requestHandler.postGames);

router.route('/getgames').post(requestHandler.getGames)

router.route('/handlematch').get(requestHandler.getMatches);

router.route('/getauth').get(requestHandler.getAuth);

module.exports = router;
