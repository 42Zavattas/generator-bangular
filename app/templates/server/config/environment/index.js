'use strict';

var path = require('path');
var _ = require('lodash');

var all = {

  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js'));
