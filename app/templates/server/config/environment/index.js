'use strict';

var path = require('path');
var _ = require('lodash');

var all = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000<% if (filters.backend === 'mongo') { %>,

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }<% } %><% if (filters.auth) { %>,

  secrets: {
    session: process.env.SESSION_SECRET || 'secretKey'
  }<% } %>
};

module.exports = _.merge(all, require('./' + all.env + '.js'));
