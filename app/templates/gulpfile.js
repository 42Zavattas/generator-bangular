'use strict';

var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();

//$.util.log = $.util.noop;

process.env.NODE_ENV = $.util.env.env || 'development';

var config = require('./server/config/environment');

var toInject = [
  'client/app.js',
  'client/directives/**/*.js', '!client/directives/**/*.spec.js',
  'client/filters/**/*.js', '!client/filters/**/*.spec.js',
  'client/services/**/*.js', '!client/services/**/*.spec.js',
  'client/views/**/*.js', '!client/views/**/*.spec.js',
  'client/styles/css/app.css'
];

/**
 * Compile sass
 */
gulp.task('sass', function () {
  gulp.src('client/styles/app.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest('client/styles/css'));
});

/**
 * Inject css/js files in index.html
 */
gulp.task('inject', function () {
  var sources = gulp.src(toInject, { read: false });

  return gulp.src('client/index.html')
    .pipe($.inject(gulp.src(bowerFiles(), { read: false }), {
      name: 'bower',
      relative: 'true'
    }))
    .pipe($.inject(sources, { relative: true }))
    .pipe(gulp.dest('client'));
});

/**
 * Watch files and reload page.
 * Recompile scss if needed.
 * Reinject files
 */
gulp.task('watch', ['inject'], function () {

  $.livereload.listen();

  $.watch('client/styles/**/*.scss', function () {
    gulp.src('client/styles/app.scss')
      .pipe($.plumber())
      .pipe($.sass())
      .pipe(gulp.dest('client/styles/css'))
      .pipe($.livereload());
  });

  $.watch(['client/index.html', 'client/views/**/*.html'])
    .pipe($.livereload());

  $.watch(toInject, function () {
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(toInject), { relative: true, name: 'app' }))
      .pipe(gulp.dest('client'));
  });

  $.watch('bower.json', function () {
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(bowerFiles(), { read: false }), {
        name: 'bower',
        relative: 'true'
      }))
      .pipe(gulp.dest('client'));
  });

  $.watch('client/app.js')
    .pipe($.livereload());

});

/**
 * Tests
 */
gulp.task('test:server', function () {
  process.env.NODE_ENV = 'test';
  return gulp.src('server/**/*.spec.js', { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: 'spec' }))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('test:client', function () {
  return gulp.src([
    'client/bower_components/angular/angular.js',
    'client/bower_components/angular-mocks/angular-mocks.js',
    'client/bower_components/angular-route/angular-route.js',
    'client/app.js',
    'client/views/**/*.js',
    'client/services/**/*.js',
    'client/directives/**/*.js',
    'client/filters/**/*.js'
  ])
    .pipe($.karma({
      action: 'run',
      configFile: 'karma.conf.js'
    }))
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    });
});

gulp.task('test', ['test:server', 'test:client']);

/**
 * Launch server
 */
gulp.task('serve', ['inject', 'watch'], function () {
  var options = {
    url: 'http://localhost:' + config.port,
    app: 'chromium'
  };

  require('./server/server');
  return gulp.src('client/index.html').pipe($.open('', options));
});

gulp.task('default', ['serve']);
