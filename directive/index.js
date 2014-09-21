'use strict';

var yeoman = require('yeoman-generator');

var BangularGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.camelName = this._.camelize(this.name);
    this.slugName = this._.slugify(this.name);
  },

  prompting: function () {

    var self = this;
    var done = self.async();

    self.prompt([{
      type: 'confirm',
      name: 'template',
      message: 'Do this directive needs an html template ?',
      default: true
    }], function (props) {
      self.needTemplate = props.template;
      done();
    });

  },

  writing: function () {

    this.template(
      'directive.js',
      'client/directives/'
      + this.slugName
      + '/'
      + this.slugName
      + '.directive.js'
    );

    this.template(
      'directive.js',
      'client/directives/'
      + this.slugName
      + '/'
      + this.slugName
      + '.spec.js'
    );

    if (this.needTemplate) {
      this.template(
        'directive.html',
        'client/directives/'
        + this.slugName
        + '/'
        + this.slugName
        + '.html'
      );
    }

  }

});

module.exports = BangularGenerator;
