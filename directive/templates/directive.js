'use strict';

angular.module('<%= _.camelize(appname) %>')
  .directive('<%= camelName %>', function () {
    return {
      restrict: 'EA',
      <% if (needTemplate) { %>templateUrl: 'directives/<%= dashName %>/<%= dashName %>.html',
      <% } %>link: function (scope, element) {
        element.text('<%= camelName %> directive');
      }
    };
  });
