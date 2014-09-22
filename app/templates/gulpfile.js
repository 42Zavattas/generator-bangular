'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
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
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '') +
    chalk.yellow(' > ' + msg) +
    (options.padding ? '\n' : '')
  );
}

/**
 * Compile sass
 */
gulp.task('sass', function () {
  return gulp.src('client/styles/app.scss')
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

  $.watch([
    'client/index.html',
    'client/app.js'
  ]).pipe($.livereload());

  $.watch([
    'client/views',
    'client/views/**/*.html',
    'client/views/**/*.js',
    '!client/views/**/*.spec.js',
    'client/directives',
    'client/directives/**/*.html',
    'client/directives/**/*.js',
    '!client/directives/**/*.spec.js',
    'client/services',
    'client/services/**/*.js',
    '!client/services/**/*.spec.js',
    'client/filters',
    'client/filters/**/*.js',
    '!client/filters/**/*.spec.js'
  ], function (ev, done) {
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(toInject), { relative: true }))
      .pipe(gulp.dest('client'));
    done();
  });

  $.watch('bower.json', function () {
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(bowerFiles(), { read: false }), {
        name: 'bower',
        relative: 'true'
      }))
      .pipe(gulp.dest('client'));
  });

});

/**
 * Control things
 */
gulp.task('control', function () {
  return gulp.src([
    'client/**/**/*.js',
    'server/**/**/*.js',
    '!client/bower_components/**',
  ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

/**
 * Tests
 */
function testServer (done) {

  log('Running server test...', { padding: true });

  gulp.src('server/**/*.spec.js', { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: 'spec' }))
    .once('end', function () {
      done();
    });

}


function testClient (done) {

  log('Running client test...', { padding: true });

  gulp.src([
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
      configFile: 'client/karma.conf.js'
    }))
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    })
    .once('end', function () {
      done();
    });

}

gulp.task('test', function (done) {
  process.env.NODE_ENV = 'test';
  var filter = process.argv[3] ? process.argv[3].substr(2) : false;
  if (filter === 'client') {
    return testClient(function () { process.exit(); done(); });
  } else if (filter === 'server') {
    return testServer(function () { process.exit(); done(); });
  } else if (filter === false) {
    return testClient(function () {
      testServer(function () {
        process.exit();
        done();
      });
    });
  } else {
    console.log('Wrong parameter [%s], availables : --client, --server', filter);
  }
});

/**
 * Launch server
 */
gulp.task('serve', ['sass', 'inject', 'watch'], function () {
  var options = {
    url: 'http://localhost:' + config.port,
    app: 'chromium'
  };

  require('./server/server');
  return gulp.src('client/index.html').pipe($.open('', options));
});

gulp.task('default', ['serve']);
