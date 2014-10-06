'use strict';

var genUtils = require('../util');
var path = require('path');
var yeoman = require('yeoman-generator');
var bangAscii = require('./ascii');
var chalk = require('chalk');

function bangLog (msg, color) {
  console.log('[' + chalk.blue('bangular') + ']: ' + chalk[color](msg));
}

var BangularGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    this.filters = {};
    this.pkg = require('../package.json');
  },

  prompting: function () {

    var done = this.async();
    this.log(bangAscii);
    var self = this;

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: self.appname
    }, {
      type: 'list',
      name: 'backend',
      message: 'Choose a backend type',
      choices: [{
        value: 'mongo',
        name: 'MongoDb, with Mongoose as ODM'
      }, {
        value: 'restock',
        name: 'Restock.io, for mocking purpose'
      }, {
        value: 'json',
        name: 'Good old JSON'
      }]
    }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Which module do you want to load ?',
      choices: [{
        value: 'ngCookies',
        name: 'angular-cookies',
        checked: false
      }, {
        value: 'ngResource',
        name: 'angular-resource',
        checked: false
      }, {
        value: 'ngSanitize',
        name: 'angular-sanitize',
        checked: false
      }, {
        value: 'ngAnimate',
        name: 'angular-animate',
        checked: false
      }]
    }], function (props) {
      self.appname = props.name;
      self.filters.backend = props.backend;

      if (props.modules.length) {
        props.modules.forEach(function (module) {
          self.filters[module] = true;
        });
      }

      done();
    });
  },

  saveSettings: function () {
    this.config.set('filters', this.filters);
  },

  generate: function () {
    this.sourceRoot(path.join(__dirname, './templates/base'));
    this.src.copy('../_.gitignore', '.gitignore');
    genUtils.processDirectory(this, '.', '.');
    this.mkdir('client/assets/fonts');
    this.mkdir('client/assets/images');
  },

  end: function () {
    bangLog('Installing dependencies...', 'yellow');
    this.installDependencies({
      skipMessage: true,
      callback: function () {
        bangLog('Everything is ready !', 'green');
      }
    });
  }
});

module.exports = BangularGenerator;
