'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var genUtils = require('../util');

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
      genUtils.rewriteFile({
        file: 'client/styles/app.scss',
        needle: '// Imports',
        splicable: [
          '@import \'' + this.name + '\';'
        ]
      });
    }
  }
});

module.exports = BangularGenerator;
