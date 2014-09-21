'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var genUtils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {
    var done = this.async();

    this.name = this._.slugify(this.name);
    this.pluralName = this.name + 's';

    this.prompt([{
      type: 'input',
      name: 'url',
      message: 'On which url do you want to attach the ' + chalk.red(this.name) + ' endpoint ? ',
      default: '/api/' + this.pluralName
    }], function (props) {
      this.url = props.url;

      done();
    }.bind(this));
  },

  writing: function () {

    this.template('index.js', 'server/api/' + this.name + '/index.js');

    ['controller.js', 'model.js', 'spec.js'].forEach(function (file) {
      this.template(file, 'server/api/' + this.name + '/' + this.name + '.' + file);
    }.bind(this));

    genUtils.rewriteFile({
      file: 'server/routes.js',
      needle: '// API',
      splicable: [
        'app.use(\'' + this.url + '\', require(\'./api/' + this.name + '\'));'
      ]
    });
  }
});

module.exports = BangularGenerator;
