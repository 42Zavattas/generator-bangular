'use strict';

angular.module('<%= _.camelize(appname) %>')
  .filter('<%= camelName %>', function () {
    return function (input) {
      return input;
    };
  });
