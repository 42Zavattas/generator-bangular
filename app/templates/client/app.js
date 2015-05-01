'use strict';

angular.module('<%= appname %>', [
  'ngRoute'<% if (filters.ngCookies) { %>,
  'ngCookies'<% } %><% if (filters.ngResource) { %>,
  'ngResource'<% } %><% if (filters.ngSanitize) { %>,
  'ngSanitize'<% } %><% if (filters.ngAnimate) { %>,
  'ngAnimate'<% } %><% if (filters.sockets) { %>,
  'btford.socket-io'<% } %>
])
  .config(function ($routeProvider, $locationProvider<% if (filters.auth) { %>, $httpProvider<% } %>) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);<% if (filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>

  })<% if (filters.auth) { %>
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

  .run(function ($rootScope, $location, Auth) {

    $rootScope.Auth = Auth;

    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isReadyLogged().catch(function () {
        if (next.authenticate) {
          $location.path('/');
        }
      });
    });

  })<% } %>;
