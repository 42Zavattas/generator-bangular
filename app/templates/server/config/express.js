'use strict';

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');<% if (filters.auth) { %>

// auth purpose
var session = require('express-session');
var passport = require('passport');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');<% } %>

var config = require('./environment');

module.exports = function (app) {

  var env = config.env;

  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(morgan('dev'));<% if (filters.auth) { %>
  app.use(passport.initialize());<% } %>
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', 'client');<% if (filters.auth) { %>

  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
  }));<% } %>

  if (env === 'development' || env === 'test') {
    app.use(require('errorhandler')());
  }

};
