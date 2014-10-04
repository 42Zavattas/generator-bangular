'use strict';

module.exports = {
  ip : process.env.IP || undefined<% if (filters.backend === 'mongo') { %>,
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
        'mongodb://localhost/<%= _.slugify(appname) %>'
  }<% } %>
};
