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

  initializing: {
    getVars: function () {
      this.appname = this.appname || path.basename(process.cwd());
      this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
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
    if (this.skipConfig) { return ; }

    this.config.set('version', this.pkg.version);
    this.config.set('filters', this.filters);
  },

  generate: function () {
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.processDirectory(this, '.', '.');

    this.mkdir('client/assets/fonts');
    this.mkdir('client/assets/images');
  },

  end: function () {
    /* istanbul ignore if */
    if (!this.options.skipInstall) {
      bangLog('Installing dependencies...', 'yellow');
    }
    this.installDependencies({
      skipInstall: this.options.skipInstall,
      skipMessage: true,
      callback: function () {
        bangLog('Everything is ready !\n', 'green');
      }
    });
  }
});

module.exports = BangularGenerator;
