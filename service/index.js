'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var BangularGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.camelName = this.name;
  },

  writing: function () {

    this.template(
      'service.js',
      'client/services/'
      + this._.slugify(this.name)
      + '/'
      + this._.slugify(this.name)
      + '.js'
    );

    this.template(
      'spec.js',
      'client/services/'
      + this._.slugify(this.name)
      + '/'
      + this._.slugify(this.name)
      + '.spec.js'
    );

  }
});

module.exports = BangularGenerator;
