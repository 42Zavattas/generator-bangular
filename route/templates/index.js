'use strict';

angular.module('<%= appname %>')
  .config(function ($routeProvider) {
    $routeProvider
      .when('<%= route %>', {
        templateUrl: 'views/<%= dashName %>/<%= dashName %>.html',
        controller: '<%= controllerName %>',
        controllerAs: 'vm'
      });
  });
