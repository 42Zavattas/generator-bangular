'use strict';

var yeoman = require('yeoman-generator');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.camelName = this._.capitalize(this._.camelize(this.name, true));
    // TODO use _.decapitalize instead of this trick when yeoman-generator will update its undercore.string dependency...
    this.dashName = this._.dasherize(this.name.substr(0, 1).toLowerCase() + this.name.substr(1));
  },

  writing: function () {

    var basePath = 'client/services/' + this.dashName + '/' + this.dashName;

    this.template('factory.js', basePath + '.js');

    var filters = this.config.get('filters');

    if (filters && filters.karma) {
      this.template('spec.js', basePath + '.spec.js');
    }

  }

});

module.exports = BangularGenerator;
