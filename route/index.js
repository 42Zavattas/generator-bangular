'use strict';

var yeoman = require('yeoman-generator');

var BangularGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
  },

  prompting: function () {
    var self = this;
    var done = self.async();
    self.prompt([{
      type: 'input',
      name: 'route',
      message: 'Choose an url route',
      default: '/' + self._.slugify(self.name)
    }], function (props) {
      self.route = props.route;
      done();
    });
  },

  writing: function () {

    this.template(
      'index.js',
      'client/views/'
      + this._.slugify(this.name)
      + '/'
      + this._.slugify(this.name)
      + '.js'
    );

    this.template(
      'controller.js',
      'client/views/'
      + this._.slugify(this.name)
      + '/'
      + this._.slugify(this.name)
      + '.controller.js'
    );

    this.template(
      'spec.js',
      'client/views/'
      + this._.slugify(this.name)
      + '/'
      + this._.slugify(this.name)
      + '.spec.js'
    );

    this.template(
      'view.html',
      'client/views/'
      + this._.slugify(this.name)
      + '/'
      + this._.slugify(this.name)
      + '.html'
    );

  }
});

module.exports = BangularGenerator;
