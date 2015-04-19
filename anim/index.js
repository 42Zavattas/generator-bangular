'use strict';

var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.camelName = _.camelize(this.name, true);
    this.dashName = _.dasherize(_.decapitalize(this.name));
    this.events = {};
  },

  prompting: function () {

    if (this.skipConfig) { return ; }

    var done = this.async();
    var self = this;

    this.prompt([{
      type: 'checkbox',
      name: 'events',
      message: 'Which events do you want to capture?',
      choices: [{
        value: 'all',
        name: 'all',
        checked: false
      }, {
        value: 'enter',
        name: 'enter',
        checked: false
      }, {
        value: 'leave',
        name: 'leave',
        checked: false
      }, {
        value: 'move',
        name: 'move',
        checked: false
      }, {
        value: 'addClass',
        name: 'addClass',
        checked: false
      }, {
        value: 'removeClass',
        name: 'removeClass',
        checked: false
      }]
    }], function (props) {
      var orderedEvents = ['enter', 'leave', 'move', 'addClass', 'removeClass'];
      self.hasEvents = !!props.events.length;
      if (self.hasEvents) {
        props.events.forEach(function (e) {
          self.events[e] = true;
        });
      }
      if (self.events.all === true) {
        orderedEvents.forEach(function (e) {
          self.events[e] = true;
        });
      }
      self.commaOrNot = function (e) {
        var subTab = orderedEvents.slice(0, orderedEvents.indexOf(e));
        for (var i = 0; i < subTab.length; i++) {
          if (self.events[subTab[i]] === true) {
            return ',';
          }
        }
        return '';
      };
      done();
    });

  },

  writing: function () {

    var basePath = 'client/animations/';
    this.template('animation.js', basePath + '/' + this.dashName + '.js');

  }

});

module.exports = BangularGenerator;
