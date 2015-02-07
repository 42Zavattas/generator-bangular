'use strict';

module.exports = {
  ip : process.env.IP || undefined<% if (filters.backend === 'mongo') { %>,
  mongo: {
    uri: 'mongodb://localhost/<%= _.slugify(appname) %>'
  }<% } %>
};
