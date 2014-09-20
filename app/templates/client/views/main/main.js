'use strict';

angular.module('<%= _.slugify(appname) %>')
  .config(function ($routeProvider) {

    $routeProvider
      .when('/main', {
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl'
      });
  });
