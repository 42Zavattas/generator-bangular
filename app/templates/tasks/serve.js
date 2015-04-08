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
    if (fs.readFileSync('.bangular-refresh', 'utf-8') === 'done') {
      clearTimeout(id);
      fs.unlinkSync('.bangular-refresh');
      cb();
    }
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
