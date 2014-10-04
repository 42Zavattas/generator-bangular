'use strict';

var path = require('path');
var _ = require('lodash');

var all = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,<% if (filters.backend === 'mongo') { %>

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }<% } %>
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
