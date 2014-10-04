'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var genUtils = require('../util');

function bangLog (msg, color) {
  console.log('[' + chalk.blue('bangular') + ']: ' + chalk[color](msg));
}

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {
    var done = this.async();

    this.prompt([{
      type: 'confirm',
      name: 'import',
      message: 'Do you want to import the ' + chalk.red(this.name) + ' style in your app ?',
      default: true
    }], function (props) {
      this.import = props.import;
      done();
    }.bind(this));
  },

  writing: function () {

    this.template('style.scss', 'client/styles/' + this.name + '.scss');

    if (this.import) {

      genUtils.appendOnTop({
        dest: 'client/styles/app.scss',
        append: '@import \'' + this.name + '\';\n'
      }, function (err) {
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
