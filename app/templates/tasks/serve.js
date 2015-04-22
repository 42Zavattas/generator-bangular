'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp       = require('gulp');
var ripe       = require('ripe');
var nodemon    = require('gulp-nodemon');
var open       = require('gulp-open');<% if (filters.reload === 'livereload') { %>
var livereload = require('gulp-livereload');<% } else { %>
var bsync      = require('browser-sync');<% } %>

var config = require('../server/config/environment');

var openOpts = {
  url: 'http://localhost:' + config.port,
  already: false
};

module.exports = {

  nodemon: function (<% if (filters.reload === 'browsersync') { %>cb<% } %>) {
    return nodemon({
        script: 'server/server.js',
        ext: 'js',
        ignore: ['client', 'dist', 'node_modules', 'gulpfile.js']
      })
      .on('start', function () {
        if (!openOpts.already) {
          openOpts.already = true;
          ripe.wait(<% if (filters.reload === 'livereload') { %>function () {
            gulp.src('client/index.html')
              .pipe(open('', openOpts));
          }<% } else { %>cb<% } %>);
        } else {
          ripe.wait(function () {<% if (filters.reload === 'livereload') { %>
            livereload.changed('/');<% } else { %>
            bsync.reload({ stream: false });<% } %>
          });
        }
      });
  }<% if (filters.reload === 'browsersync') { %>,

  bsync: function () {
    bsync.init({
      proxy: 'localhost:9000',
      browser: process.env.BROWSER || 'google chrome',
      online: false,
      notify: false,
      watchOptions: {
        interval: 500
      }
    });
  }<% } %>

};
