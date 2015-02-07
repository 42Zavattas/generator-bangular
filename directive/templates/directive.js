'use strict';

angular.module('<%= appname %>')
  .directive('<%= camelName %>', function () {
    return {
      restrict: 'EA',
      <% if (needTemplate) { %>templateUrl: 'directives/<%= dashName %>/<%= dashName %>.html',
      <% } %>link: function (scope, element) {
        element.text('<%= camelName %> directive');
      }
    };
  });
