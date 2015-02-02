'use strict';

var yeoman = require('yeoman-generator');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.dashName = this._.dasherize(this.name);
    this.camelName = this._.camelize(this.name);
  },

  writing: function () {
    this.template('filter.js', 'client/filters/' + this.dashName + '/' + this.dashName + '.js');
    this.template('filter.spec.js', 'client/filters/' + this.dashName + '/' + this.dashName + '.spec.js');
  }

});

module.exports = BangularGenerator;
