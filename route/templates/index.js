'use strict';

angular.module('<%= _.camelize(appname) %>')
  .config(function ($routeProvider) {
    $routeProvider
      .when('<%= route %>', {
        templateUrl: 'views/<%= dashName %>/<%= dashName %>.html',
        controller: '<%= controllerName %>',
        controllerAs: 'vm'
      });
  });
