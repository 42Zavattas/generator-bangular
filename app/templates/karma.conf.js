'use strict';

module.exports = function (config) {
  config.set({

    basePath: 'client',

    frameworks: ['jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/',
      moduleName: 'templates'
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-route/angular-route.js',<% if (filters.ngAnimate) { %>
      'bower_components/angular-animate/angular-animate.js',<% } if (filters.ngSanitize) { %>
      'bower_components/angular-sanitize/angular-sanitize.js',<% } if (filters.ngCookies) { %>
      'bower_components/angular-cookies/angular-cookies.js',<% } if (filters.ngResource) { %>
      'bower_components/angular-resource/angular-resource.js',<% } if (filters.sockets) { %>
      'bower_components/angular-socket-io/socket.min.js',<% } %>
      'app.js',
      'views/**/*.js',
      'services/**/*.js',
      'directives/**/*.js',
      'directives/**/*.html',
      'filters/**/*.js'
    ],<% if (filters.sockets) { %>

    exclude: [
      'services/socket/socket.service.js',
    ],<% } %>

    reporters: ['progress'],

    port: 9876,

    colors: true,

    // possible values:
    // config.LOG_DISABLE
    // config.LOG_ERROR
    // config.LOG_WARN
    // config.LOG_INFO
    // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
