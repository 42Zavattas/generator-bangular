'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp       = require('gulp');
var fs         = require('fs');
var nodemon    = require('gulp-nodemon');
var open       = require('gulp-open');
var livereload = require('gulp-livereload');

var config = require('../server/config/environment');

var openOpts = {
  url: 'http://localhost:' + config.port,
  already: false
};

function waitForExpress (cb) {
  var id;

  id = setInterval(function () {
    fs.readFile('.bangular-refresh', 'utf-8', function (err, status) {
      if (err) {
        if (err.code === 'ENOENT') {
          clearTimeout(id);
          return fs.writeFileSync('.bangular-refresh', 'waiting');
        }
        throw err;
      }
      if (status === 'done') {
        fs.unlink('.bangular-refresh', function (err) {
          if (err) { throw err; }
          clearTimeout(id);
          cb();
        });
      }
    });
  }, 100);
}

module.exports = function () {
  return nodemon({
      script: 'server/server.js',
      ext: 'js',
      ignore: ['client', 'dist', 'node_modules', 'gulpfile.js']
    })
    .on('start', function () {
      fs.writeFileSync('.bangular-refresh', 'waiting');

      if (!openOpts.already) {
        openOpts.already = true;
        waitForExpress(function () {
          gulp.src('client/index.html')
            .pipe(open('', openOpts));
        });
      } else {
        waitForExpress(function () {
          livereload.changed('/');
        });
      }
    });
};
