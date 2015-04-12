'use strict';

var utils = require('../util');
var path = require('path');
var yeoman = require('yeoman-generator');
var bangAscii = require('./ascii');

var BangularGenerator = yeoman.generators.Base.extend({

  initializing: {
    getVars: function () {
      this.appname = this.appname || path.basename(process.cwd());
      this.filters = {};
      this.pkg = require('../package.json');
    },
    info: function () {
      if (this.options.skipLog) { return ; }
      this.log(bangAscii);
    },
    checkConfig: function () {
      if (this.config.get('filters')) {

        var done = this.async();
        var self = this;

        this.prompt([{
          type: 'confirm',
          name: 'skipConfig',
          message: 'You have a .yo-rc file in this directory, do you want to skip install steps?',
          default: true
        }], function (props) {
          self.skipConfig = props.skipConfig;
          self.filters = self.config.get('filters');
          done();
        });
      }
    }
  },

  prompting: function () {

    if (this.skipConfig) { return ; }

    var done = this.async();
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
        value: 'json',
        name: 'Good old JSON'
      }, {
        value: 'restock',
        name: 'Restock.io, for mocking purpose'
      }]
    }, {
      type: 'list',
      name: 'reload',
      message: 'Which development tool do you want for browser reloading / synchronising?',
      choices: [{
        value: 'livereload',
        name: 'Livereload'
      }, {
        value: 'browsersync',
        name: 'BrowserSync'
      }]
    }, {
      type: 'checkbox',
      name: 'tests',
      message: 'Customize your test suite.',
      choices: [{
        value: 'control',
        name: 'JSHint & JSCS',
        checked: false
      }, {
        value: 'karma',
        name: 'Client tests using Karma',
        checked: false
      }, {
        value: 'mocha',
        name: 'Server tests using Mocha',
        checked: false
      }, {
        value: 'e2e',
        name: 'End to end tests using Protractor',
        checked: false
      }]
    }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Which module do you want to load?',
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
      self.appname = self._.camelize(self._.slugify(self._.humanize(props.name)));
      self.filters.backend = props.backend;
      self.filters.reload = props.reload;

      if (props.modules.length) {
        props.modules.forEach(function (module) {
          self.filters[module] = true;
        });
      }

      if (props.tests && props.tests.length) {
        props.tests.forEach(function (test) {
          self.filters[test] = true;
        });
      }

      self.filters.hasTests = self.filters.karma || self.filters.mocha;

      if (props.backend === 'mongo') {
        self.prompt([{
          type: 'confirm',
          name: 'sockets',
          message: 'Do you want to add socket support?',
          default: false
        }, {
          type: 'confirm',
          name: 'auth',
          message: 'Do you want to scaffold a passport authentication process?',
          default: false
        }], function (props) {
          self.filters.sockets = props.sockets;
          self.filters.auth = props.auth;
          if (props.auth) {
            self.filters.ngCookies = true;
          }
          done();
        });
      } else {
        done();
      }

    });
  },

  saveSettings: function () {
    if (this.skipConfig) { return ; }

    this.config.set('version', this.pkg.version);
    this.config.set('filters', this.filters);
  },

  generate: function () {
    this.sourceRoot(path.join(__dirname, './templates'));
    utils.processDirectory(this, '.', '.');

    this.mkdir('client/assets/fonts');
    this.mkdir('client/assets/images');
  },

  end: function () {
    /* istanbul ignore if */
    if (!this.options.skipInstall) {
      utils.bangLog('Installing dependencies...', 'yellow');
    }
    this.installDependencies({
      skipInstall: this.options.skipInstall,
      skipMessage: true,
      callback: function () {
        utils.bangLog('Everything is ready !\n', 'green');
      }
    });
  }
});

module.exports = BangularGenerator;
