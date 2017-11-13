var timestamp = require('./timestamp/server.js');
var metadata = require('./metadata/server.js');
var bitlink = require('./bitlink/server.js');
var headerparser = require('./headerparser/server.js');
var abstraction = require('./abstraction/server.js');
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

router.use('/timestamp', timestamp);
router.use('/metadata', metadata);
router.use('/bitlink', bitlink);
router.use('/headerparser', headerparser);
router.use('/abstraction', abstraction);

//app.use('/', express.static(path.join(__dirname + "public")));

module.exports = router;
