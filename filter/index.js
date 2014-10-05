'use strict';

var yeoman = require('yeoman-generator');

var BangularGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.slugName = this._.slugify(this.name);
	  this.camelName = this._.camelize(this.name);
  },

  writing: function () {
	  this.template('filter.js', 'client/filters/' + this.slugName + '/' + this.slugName + '.js');
	  this.template('filter.spec.js', 'client/filters/' + this.slugName + '/' + this.slugName + '.spec.js');
  }

});

module.exports = BangularGenerator;
