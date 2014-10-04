'use strict';

var gulp = require('gulp');
var del = require('del');
var chalk = require('chalk');
var bowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var sq = require('streamqueue');
var path = require('path');
var $ = require('gulp-load-plugins')();

process.env.NODE_ENV = $.util.env.env || 'development';

var config = require('./server/config/environment');

var openOpts = {
  url: 'http://localhost:' + config.port
};

var toInject = [
  'client/app.js',
  'client/directives/**/*.js', '!client/directives/**/*.spec.js',
  'client/filters/**/*.js', '!client/filters/**/*.spec.js',
  'client/services/**/*.js', '!client/services/**/*.spec.js',
  'client/views/**/*.js', '!client/views/**/*.spec.js',
  'client/styles/css/app.css'
];

var toDelete = [];

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
gulp.task('inject', ['sass'], function () {
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
    '!client/bower_components/**'
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
    'client/bower_components/angular-route/angular-route.js',<% if (filters.ngCookies) { %>
    'client/bower_components/angular-cookies/angular-cookies.js',<% } %><% if (filters.ngResource) { %>
    'client/bower_components/angular-resource/angular-resource.js',<% } %>
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
gulp.task('serve', ['watch'], function () {
  require('./server/server');
  return gulp.src('client/index.html')
    .pipe($.open('', openOpts));
});

gulp.task('serve:dist', ['build'], function () {
  process.env.NODE_ENV = 'production';
  require('./dist/server/server');
  return gulp.src('client/index.html')
    .pipe($.open('', openOpts));
});

/**
 * Build
 */
gulp.task('clean:dist', function (cb) {
  del(['dist/**', '!dist', '!dist/.git{,/**}'], cb);
});

gulp.task('clean:finish', function (cb) {
  del([
    '.tmp/**',
    'dist/client/app.{css,js}'
  ].concat(toDelete), cb);
});

gulp.task('copy:dist', function () {
  var main = gulp.src(['server/**/*', 'package.json'], { base: './' });
  var assets = gulp.src('client/assets/**/*', { base: './' });

  return sq({ objectMode: true }, main, assets)
    .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', ['inject'], function () {
  return gulp.src('client/index.html')
    .pipe($.usemin())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('imagemin', function () {
  return gulp.src('dist/client/assets/images/*.{png,gif,jpg,jpeg,svg}')
    .pipe($.imagemin())
    .pipe(gulp.dest('dist/client/assets/images/'));
});

gulp.task('cssmin', function () {
  return gulp.src('dist/client/app.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('scripts', function () {
  var tpl = gulp.src('client/views/**/*.html')
    .pipe($.angularTemplatecache({
      root: 'views',
      module: '<%= _.slugify(appname) %>'
    }));

  var app = gulp.src('dist/client/app.js');

  return sq({ objectMode: true }, app, tpl)
    .pipe($.concat('app.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('rev', function () {
  return gulp.src('dist/client/**')
    .pipe($.revAll({
      ignore: ['favicon.ico', '.html'],
      quiet: true,
      transformFilename: function (file, hash) {
        toDelete.push(path.resolve(file.path));
        var ext = path.extname(file.path);
        return path.basename(file.path, ext) + '.' + hash.substr(0, 8) + ext;
      }
    }))
    .pipe(gulp.dest('dist/client/'))
});

gulp.task('build', function (cb) {
  runSequence(
    ['clean:dist', 'sass'],
    ['usemin', 'copy:dist'],
    ['scripts', 'imagemin', 'cssmin'],
    'rev',
    'clean:finish',
    cb);
});

gulp.task('default', ['serve']);
