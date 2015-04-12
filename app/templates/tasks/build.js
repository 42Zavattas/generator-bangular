'use strict';

/**
 * Build task
 */

var gulp                 = require('gulp');
var path                 = require('path');
var sq                   = require('streamqueue');
var runSequence          = require('run-sequence');
var del                  = require('del');
var plumber              = require('gulp-plumber');
var usemin               = require('gulp-usemin');
var cssRebaseUrls        = require('gulp-css-rebase-urls');
var autoprefixer         = require('gulp-autoprefixer');
var minifyCss            = require('gulp-minify-css');
var angularTemplatecache = require('gulp-angular-templatecache');
var concat               = require('gulp-concat');
var ngAnnotate           = require('gulp-ng-annotate');
var uglify               = require('gulp-uglify');<% if (filters.reload === 'livereload') { %>
var replace              = require('gulp-replace');<% } %>
var revAll               = require('gulp-rev-all');

var toDelete = [];

module.exports = function (done) {
  runSequence(
    ['clean:dist', 'sass'],
    ['usemin', 'copy:dist'],
    [<% if (filters.reload === 'livereload') { %>'replace', <% } %>'scripts', 'cssmin'],
    'rev',
    'clean:finish',
    done);
};

gulp.task('clean:dist', function (done) {
  del(['dist/**', '!dist', '!dist/.git{,/**}'], done);
});

gulp.task('clean:finish', function (done) {
  del([
    '.tmp/**',
    'dist/client/app.{css,js}'
  ].concat(toDelete), done);
});

gulp.task('copy:dist', function () {
  var main = gulp.src(['server/**/*', 'package.json'], { base: './' });
  var assets = gulp.src('client/assets/**/*', { base: './' });

  return sq({ objectMode: true }, main, assets)
    .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', ['inject'], function () {
  return gulp.src('client/index.html')
    .pipe(plumber())
    .pipe(usemin({ css: [cssRebaseUrls({ root: 'client' }), 'concat'] }))
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('cssmin', function () {
  return gulp.src('dist/client/app.css')
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('scripts', function () {
  var views = gulp.src('client/views/**/*.html')
    .pipe(angularTemplatecache({
      root: 'views',
      module: '<%= appname %>'
    }));

  var tpls = gulp.src('client/directives/**/*.html')
    .pipe(angularTemplatecache({
      root: 'directives',
      module: '<%= appname %>'
    }));

  var app = gulp.src('dist/client/app.js');

  return sq({ objectMode: true }, app, views, tpls)
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/client/'));
});<% if (filters.reload === 'livereload') { %>

gulp.task('replace', function () {
  return gulp.src('dist/client/index.html')
    .pipe(replace(/\s*<script.*livereload.*><\/script>/, ''))
    .pipe(gulp.dest('dist/client'));
});<% } %>

gulp.task('rev', function () {

  var rev = new revAll({
    dontRenameFile: ['index.html', 'favicon.ico'],
    transformFilename: function (file, hash) {
      var filename = path.basename(file.path);
      if (filename === 'index.html' || filename === 'favicon.ico') {
        return filename;
      }
      toDelete.push(path.resolve(file.path));
      var ext = path.extname(file.path);
      return path.basename(file.path, ext) + '.' + hash.substr(0, 8) + ext;
    }
  });

  return gulp.src('dist/client/**')
    .pipe(rev.revision())
    .pipe(gulp.dest('dist/client/'));
});
