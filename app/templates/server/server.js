'use strict';

var express = require('express');
var config = require('./config/environment');<% if (filters.mongo) { %>
var mongoose = require('mongoose');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);<% } %>

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, 'localhost', function () {
  console.log(
    'Express server listening on port %d, in %s mode',
    config.port,
    app.get('env')
  );
});

exports = module.exports = server;
