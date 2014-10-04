'use strict';

angular.module('<%= _.camelize(appname) %>')
  .directive('<%= camelName %>', function () {
    return {
      restrict: 'EA',
      templateUrl: 'directives/<%= slugName %>/<%= slugName %>.html',
      link: function (scope, element) {
        element.text('<%= camelName %> directive');
      }
    };
  });
