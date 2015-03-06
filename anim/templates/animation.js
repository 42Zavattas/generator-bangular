'use strict';

angular.module('<%= appname %>')
  .animation('.<%= dashName %>', function () {
    return {<% if (events.enter) { %>

      enter: function (element, done) {

        // animate enter

        return function (isCancelled) {
          if (isCancelled) {
          }
        };
      }<% }; if (events.leave) { %><%= commaOrNot('leave') %>

      leave: function (element, done) {

        // animate leave

        return function (isCancelled) {
          if (isCancelled) {
          }
        };
      }<% }; if (events.move) { %><%= commaOrNot('move') %>

      move: function (element, done) {

        // animate move

        return function (isCancelled) {
          if (isCancelled) {
          }
        };
      }<% }; if (events.addClass) { %><%= commaOrNot('addClass') %>

      addClass: function (element, className, done) {
      }<% }; if (events.removeClass) { %><%= commaOrNot('removeClass') %>

      removeClass: function (element, className, done) {
      }<% }; if (hasEvents) { %>
<% } %>
    };
  });
