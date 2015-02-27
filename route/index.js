'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var genUtils = require('../util');

function bangLog (msg, color) {
  console.log('[' + chalk.blue('bangular') + ']: ' + chalk[color](msg));
}

var BangularGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.appName = this._.camelize(this.appname);
    this.controllerName = this._.capitalize(this._.camelize(this.name)) + 'Ctrl';
    this.dashName = this._.dasherize(this.name);
  },

  prompting: function () {
    var self = this;
    var done = self.async();
    self.prompt([{
      type: 'input',
      name: 'route',
      message: 'Choose an url route',
      default: '/' + self.dashName
    }, {
      type: 'confirm',
      name: 'import',
      message: 'Do you want to create and import the ' + chalk.blue(this.dashName + '.scss') + ' style in your app.scss?',
      default: false
    }], function (props) {
      self.route = props.route;
      self.import = props.import;
      done();
    });
  },

  writing: function () {

    this.template(
      'index.js',
      'client/views/'
      + this.dashName
      + '/'
      + this.dashName
      + '.js'
    );

    this.template(
      'controller.js',
      'client/views/'
      + this.dashName
      + '/'
      + this.dashName
      + '.controller.js'
    );

    this.template(
      'spec.js',
      'client/views/'
      + this.dashName
      + '/'
      + this.dashName
      + '.spec.js'
    );

    this.template(
      'view.html',
      'client/views/'
      + this._.dasherize(this.name)
      + '/'
      + this._.dasherize(this.name)
      + '.html'
    );

    if (this.import) {

      this.template(
        'style.scss',
        'client/views/'
        + this.dashName
        + '/'
        + this.dashName
        + '.scss'
      );

      genUtils.appendNeedleOrOnTop({
        needle: '// imports',
        file: 'client/styles/app.scss',
        append: '@import "../views/' + this.dashName + '/' + this.dashName + '";'
      }, function importCallback (err) {
          /* istanbul ignore if */
          if (err) {
            bangLog('There was an error importing the style.', 'red');
          } else {
            bangLog('Your style was successfully injected.', 'green');
          }
      });

    }

  }

});

module.exports = BangularGenerator;
