'use strict';

module.exports = {<% if (filters.backend === 'mongo') { %>
  mongo: {
    uri: 'mongodb://localhost/<%= _.slugify(appname) %>'
  }<% } %>
};
