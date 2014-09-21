'use strict';
var util = require('util');
var genUtils = require('../util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

function bangLog (msg, color) {
  console.log('[' + chalk.blue('Bangular') + ']: ' + chalk[color](msg));
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
    this.log(yosay('Welcome to the ace Bangular generator!'));
    var self = this;

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: self.appname
    }, {
      type: 'confirm',
      name: 'mongo',
      message: 'Would you like to include Mongo ?',
      default: true
    }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Which module do you want to load ?',
      choices: [{
        value: 'ngCookies',
        name: 'angular-cookies',
        checked: true
      }, {
        value: 'ngResource',
        name: 'angular-resource',
        checked: true
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
      self.mongo = props.mongo;

      if (props.modules.length) {
        props.modules.forEach(function (module) {
          self.filters[module] = true;
        });
      }

      done();
    });
  },

  generate: function () {
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.processDirectory(this, '.', '.');
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
