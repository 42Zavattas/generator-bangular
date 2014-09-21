'use strict';

var config = require('./config/environment');

module.exports = function (app) {
  <% if (filters.mongo) { %>
  app.use('/api/things', require('./api/thing'));
  <% } %>
  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.send(404);
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

};
