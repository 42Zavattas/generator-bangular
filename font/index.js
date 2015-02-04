'use strict';

var async = require('async');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var genUtils = require('../util');

function bangLog (msg, color) {
  console.log('[' + chalk.blue('bangular') + ']: ' + chalk[color](msg));
}

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {

    var done = this.async();

    this.name = this._.slugify(this.name);
    this.types = {};

    this.prompt([{
      type: 'checkbox',
      name: 'types',
      message: 'What font file do you have ?',
      choices: [{
        value: 'otf',
        name: 'otf',
        checked: true
      }, {
        value: 'ttf',
        name: 'ttf',
        checked: false
      }, {
        value: 'eot',
        name: 'eot',
        checked: false
      }, {
        value: 'woff',
        name: 'woff',
        checked: false
      }, {
        value: 'svg',
        name: 'svg',
        checked: false
      }]
    }], function (props) {

      props.types.forEach(function (type) {
        this.types[type] = true;
      }.bind(this));

      done();
    }.bind(this));
  },

  writing: function () {

    this.mkdir('client/assets/fonts/' + this.name);

    if (!genUtils.fileExists('client/styles/fonts.scss')) {
      this.template('fonts.scss', 'client/styles/fonts.scss');

      genUtils.appendOnTop({
        dest: 'client/styles/app.scss',
        append: '@import \'fonts\';\n'
      }, function (err) {
        if (err) {
          bangLog('There was an error importing the font file.', 'red');
        } else {
          bangLog('Your font was successfully injected.', 'green');
        }
      });

    } else {

      var self = this;
      this.template('fonts.scss', '.tmp/fonts.scss');

      // For now we will use this since the template is created asynchronously and there is no callback.
      async.retry(20, function (cb) {
        setTimeout(function () {
          try {
            genUtils.appendTo(self, { src: '.tmp/fonts.scss', dest: 'client/styles/fonts.scss' });
            cb(null, true);
          } catch (e) {
            cb(e, null);
          }
        }, 5);
      }, function (err) {
        if (err) {
          bangLog('There was an error copying the template to your font file.', 'red');
        } else {
          bangLog('Your font was successfully injected.', 'green');
        }
      });

    }

  }

});

module.exports = BangularGenerator;
