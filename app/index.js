'use strict';
var util = require('util');
var genUtils = require('../util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var BangularGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.pkg = require('../package.json');
  },

  prompting: function () {

    var done = this.async();
    this.log(yosay('Welcome to the ace Bangular generator!'));

    this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
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
        value: 'ngAnimate',
        name: 'angular-animate',
        checked: true
      }, {
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
      }]
    }], function (props) {
      //console.log(props);
      this.appname = props.name;
      this.mongo = props.mongo;

      done();
    }.bind(this));
  },

  generate: function () {
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.processDirectory(this, '.', '.');
  },

  end: function () {
    console.info('\n[Bangular] Installing dependencies\n');
    this.installDependencies({
      skipMessage: true,
      callback: function () {
        console.info('\n[Bangular] Everything is ready !"');
      }
    });
  }
});

module.exports = BangularGenerator;
