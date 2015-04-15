'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var utils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {
    var done = this.async();

    this.instanceName = _.camelize(this.name);
    this.instancesName = _.camelize(this.name) + 's';

    this.fileName = _.decapitalize(_.dasherize(this.name));
    this.routeName = this.fileName + 's';

    this.objectName = _.capitalize(_.camelize(this.name));
    this.objectsName = this.objectName + 's';

    var filters = this.config.get('filters');
    this.filters = filters || {};

    var prompts = [{
      type: 'input',
      name: 'url',
      message: 'On which url do you want to attach the ' + chalk.red(this.objectName) + ' endpoint? ',
      default: '/api/' + this.routeName
    }];

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
        default: false
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
      mongo: ['controller.js', 'model.js'],
      json: ['controller.js', 'data.json'],
      restock: ['controller.js']
    };

    if (filters && filters.mocha) {
      filesByBackendType.mongo.push('spec.js');
    }

    this.template('index.js', 'server/api/' + this.fileName + '/index.js');

    filesByBackendType[filters.backend].forEach(function (file) {
      this.template(filters.backend + '/' + file, 'server/api/' + this.fileName + '/' + this.fileName + '.' + file);
    }.bind(this));

    utils.rewriteFile({
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

      utils.rewriteFile({
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
