'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var genUtils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {
    var done = this.async();

    this.instanceName = this._.camelize(this.name);
    this.instancesName = this._.camelize(this.name) + 's';

    this.fileName = this._.dasherize(this.name.substr(0, 1).toLowerCase() + this.name.substr(1));
    this.routeName = this.fileName + 's';

    this.objectName = this.name.substr(0, 1).toUpperCase() + this._.camelize(this.name).substr(1);
    this.objectsName = this.objectName + 's';

    var prompts = [{
      type: 'input',
      name: 'url',
      message: 'On which url do you want to attach the ' + chalk.red(this.objectName) + ' endpoint? ',
      default: '/api/' + this.routeName
    }];

    var filters = this.config.get('filters');

    if (filters && filters.ngResource) {
      prompts.push({
        type: 'confirm',
        name: 'resource',
        message: 'Do you want to generate the associated $resource?',
        default: false
      });
    }

    if (filters && filters.sockets && filters.backend === 'mongo') {
      prompts.push({
        type: 'confirm',
        name: 'sockets',
        message: 'Do you want to generate sockets integration for this model?',
        default: true
      });
    }

    this.prompt(prompts, function (props) {
      this.url = props.url;
      this.sockets = props.sockets;
      this.resource = props.resource;
      done();
    }.bind(this));
  },

  writing: function () {

    var filters = this.config.get('filters');
    var filesByBackendType = {
      mongo: ['controller.js', 'model.js', 'spec.js'],
      json: ['controller.js', 'data.json'],
      restock: ['controller.js']
    };

    this.template('index.js', 'server/api/' + this.fileName + '/index.js');

    filesByBackendType[filters.backend].forEach(function (file) {
      this.template(filters.backend + '/' + file, 'server/api/' + this.fileName + '/' + this.fileName + '.' + file);
    }.bind(this));

    genUtils.rewriteFile({
      file: 'server/routes.js',
      needle: '// API',
      splicable: [
        'app.use(\'' + this.url + '\', require(\'./api/' + this.fileName + '\'));'
      ]
    });

    if (this.resource) {
      this.template('service.js', 'client/services/' + this.fileName + '/' + this.fileName + '.resource.js');
    }

    if (this.sockets) {
      this.template('mongo/socket.js', 'server/api/' + this.fileName + '/' + this.fileName + '.socket.js');

      genUtils.rewriteFile({
        file: 'server/config/sockets.js',
        needle: '// sockets insert',
        splicable: [
          'require(\'../api/' + this.fileName + '/' + this.fileName + '.socket.js\').register(socket);'
        ]
      });
    }
  }
});

module.exports = BangularGenerator;
