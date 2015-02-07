'use strict';

var yeoman = require('yeoman-generator');

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
    }], function (props) {
      self.route = props.route;
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

  }

});

module.exports = BangularGenerator;
