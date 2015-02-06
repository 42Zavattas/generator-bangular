'use strict';

angular.module('<%= appname %>', [
  'ngRoute'<% if (filters.ngCookies) { %>,
  'ngCookies'<% } %><% if (filters.ngResource) { %>,
  'ngResource'<% } %><% if (filters.ngSanitize) { %>,
  'ngSanitize'<% } %><% if (filters.ngAnimate) { %>,
  'ngAnimate'<% } %><% if (filters.sockets) { %>,
  'btford.socket-io'<% } %>
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });
