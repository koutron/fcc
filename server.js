var timestamp = require('./timestamp/server.js');
var metadata = require('./metadata/server.js');
var bitlink = require('./bitlink/server.js');
var headerparser = require('./headerparser/server.js');
var abstraction = require('./abstraction/server.js');
var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (request, response) {
  console.log('fuck' + request.path);
  response.sendFile(__dirname + '/index.html');
});

app.use('/timestamp', timestamp);
app.use('/metadata', metadata);
app.use('/bitlink', bitlink);
app.use('/headerparser', headerparser);
app.use('/abstraction', abstraction);

//app.use('/', express.static(path.join(__dirname + "public")));





app.listen(3000);
