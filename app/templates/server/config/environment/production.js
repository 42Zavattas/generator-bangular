'use strict';

module.exports = {
  mongo: {
    uri: 'mongodb://localhost/<%= _.slugify(appname) %>'
  }
};
