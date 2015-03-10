'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var utils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {

    var done = this.async();

    this.prompt([{
      type: 'confirm',
      name: 'import',
      message: 'Do you want to import the ' + chalk.blue(this.name) + ' style in your app.scss?',
      default: true
    }], function (props) {
      this.import = props.import;
      done();
    }.bind(this));

  },

  writing: function () {

    function importCallback (err) {
      /* istanbul ignore if */
      if (err) {
        utils.bangLog('There was an error importing the style.', 'red');
      } else {
        utils.bangLog('Your style was successfully injected.', 'green');
      }
    }

    this.template('style.scss', 'client/styles/' + this.name + '.scss');

    if (this.import) {

      utils.appendNeedleOrOnTop({
        needle: '// imports',
        file: 'client/styles/app.scss',
        append: '@import "' + this.name + '";'
      }, importCallback);

    }

  }

});

module.exports = BangularGenerator;
