'use strict';

angular.module('<%= _.camelize(appname) %>')
  .config(function ($routeProvider) {
    $routeProvider
      .when('<%= route %>', {
        templateUrl: 'views/<%= _.slugify(name) %>/<%= _.slugify(name) %>.html',
        controller: '<%= _.capitalize(_.camelize(name)) %>Ctrl',
        controllerAs: '<%= _.camelize(name) %>'
      });
  });
