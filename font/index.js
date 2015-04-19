'use strict';

var async = require('async');
var yeoman = require('yeoman-generator');
var mkdir = require('mkdirp');
var _ = require('underscore.string');

var utils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.name = _.slugify(this.name);
  },

  prompting: function () {

    var done = this.async();

    this.types = {};

    this.prompt([{
      type: 'checkbox',
      name: 'types',
      message: 'What font file do you have?',
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

    mkdir.sync('client/assets/fonts/' + this.name);

    if (!utils.fileExists('client/styles/fonts.scss')) {
      this.template('fonts.scss', 'client/styles/fonts.scss');

      utils.appendNeedleOrOnTop({
        needle: '// imports',
        file: 'client/styles/app.scss',
        append: '@import \'fonts\';\n'
      }, function (err) {
        /* istanbul ignore if */
        if (err) {
          utils.bangLog('There was an error importing the font file.', 'red');
        } else {
          utils.bangLog('Your font was successfully injected.', 'green');
        }
      });

    } else {

      var self = this;
      this.template('fonts.scss', '.tmp/fonts.scss');

      // For now we will use this since the template is created asynchronously and there is no callback.
      async.retry(20, function (cb) {
        setTimeout(function () {
          try {
            utils.appendTo(self, { src: '.tmp/fonts.scss', dest: 'client/styles/fonts.scss' });
            cb(null, true);
          } catch (e) {
            /* istanbul ignore next */
            cb(e, null);
          }
        }, 5);
      }, function (err) {
        /* istanbul ignore if */
        if (err) {
          utils.bangLog('There was an error copying the template to your font file.', 'red');
        } else {
          utils.bangLog('Your font was successfully injected.', 'green');
        }
      });

    }

  }

});

module.exports = BangularGenerator;
