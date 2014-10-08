'use strict';

angular.module('<%= _.slugify(appname) %>', [
  'ngRoute'<% if (filters.ngCookies) { %>,
  'ngCookies'<% } %><% if (filters.ngResource) { %>,
  'ngResource'<% } %><% if (filters.ngSanitize) { %>,
  'ngSanitize'<% } %><% if (filters.ngAnimate) { %>,
  'ngAnimate'<% } %>
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });

    $locationProvider.html5Mode(true);
  });
