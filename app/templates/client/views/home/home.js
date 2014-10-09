'use strict';

angular.module('<%= _.slugify(appname) %>')
  .config(function ($routeProvider) {

    $routeProvider
      .when('/home', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });
  });
