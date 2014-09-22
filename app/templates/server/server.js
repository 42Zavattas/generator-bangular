'use strict';

var express = require('express');
var chalk = require('chalk');
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
    chalk.yellow('\nExpress server listening on port ') +
    chalk.cyan('%d') +
    chalk.yellow(', in ') +
    chalk.cyan('%s') +
    chalk.yellow(' mode.\n'),
    config.port,
    app.get('env')
  );

});

exports = module.exports = server;
