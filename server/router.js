var express = require('express');
var requestHandler = require('./requestHandlers');
var router = express.Router();

router.route('/getgames').post(requestHandler.getGames)

module.exports = router;
