'use strict';

angular.module('<%= _.slugify(appname) %>', [
  'ngRoute'
])

  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/main'
      });

    $locationProvider.html5Mode(true);
  });
