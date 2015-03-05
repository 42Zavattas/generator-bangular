'use strict';

var gulp = require('gulp');
var del = require('del');
var chalk = require('chalk');
var bowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var sq = require('streamqueue');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
var karma = require('karma').server;
var $ = require('gulp-load-plugins')();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/environment');

var openOpts = {
  url    : 'http://localhost:' + config.port,
  already: false
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

  gulp.watch('bower.json', function () {
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(bowerFiles(), { read: false }), {
        name: 'bower',
        relative: 'true'
      }))
      .pipe(gulp.dest('client'));
  });

  gulp.watch(['client/index.html', 'client/app.js'])
    .on('change', $.livereload.changed);

  $.watch(['client/styles/**/*.scss', 'client/views/**/*.scss'], function () {
    gulp.src('client/styles/app.scss')
      .pipe($.plumber())
      .pipe($.sass())
      .pipe(gulp.dest('client/styles/css'))
      .pipe($.livereload());
  });

  $.watch([
    'client/views',
    'client/views/**/*.html',
    'client/views/**/*.js',
    '!client/views/**/*.scss',
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
  ], function () {
    gulp.src('client/index.html')
      .pipe($.wait(100))
      .pipe($.inject(gulp.src(toInject), { relative: true }))
      .pipe(gulp.dest('client'));
  });

});

/**
 * Control things
 */
gulp.task('control', function (done) {

  function getConfig (file) {
    return _.merge(
      JSON.parse(fs.readFileSync('./.jshintrc', 'utf-8')),
      JSON.parse(fs.readFileSync(file, 'utf-8'))
    );
  }

  function control (name, paths, conf) {
    return function (done) {
      gulp.src(paths)
        .pipe($.jshint(conf))
        .pipe($.jshint.reporter('jshint-stylish'))
        .on('finish', function () {
          gulp.src(paths)
            .pipe($.jscs())
            .on('error', function () {})
            .pipe($.jscsStylish())
            .on('end', done);
        });
    };
  }

  async.series([
    control('client', ['client/**/*.js', '!client/bower_components/**'], getConfig('./client/.jshintrc')),
    control('server', ['server/**/*.js'], getConfig('./server/.jshintrc'))
  ], done);

});


/**
 * Protractor
 */
gulp.task('e2e:update', $.protractor.webdriver_update);

gulp.task('e2e', ['serve'], function () {
  gulp.src('client/views/**/*.e2e.js')
    .pipe($.protractor.protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', function (e) {
      $.util.log(e.message);
      process.exit(-1);
    })
    .on('end', function () {
      process.exit(0);
    });
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

  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
}

gulp.task('test', function (done) {
  process.env.NODE_ENV = 'test';
  var arg = process.argv[3] ? process.argv[3].substr(2) : false;
  if (arg === 'client') {
    return testClient(function () {
      process.exit();
      done();
    });
  } else if (arg === 'server') {
    return testServer(function () {
      process.exit();
      done();
    });
  } else if (arg === false) {
    return testClient(function () {
      testServer(function () {
        process.exit();
        done();
      });
    });
  } else {
    console.log('Wrong parameter [%s], availables : --client, --server', arg);
  }
});

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

/**
 * Launch server
 */
gulp.task('serve', ['watch'], function () {
  return $.nodemon({
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
            .pipe($.open('', openOpts));
        });
      } else {
        waitForExpress(function () {
          $.livereload.changed('/');
        });
      }
    });
});

gulp.task('preview', ['build'], function () {
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
    .pipe($.plumber())
    .pipe($.usemin())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('cssmin', function () {
  return gulp.src('dist/client/app.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('scripts', function () {
  var views = gulp.src('client/views/**/*.html')
    .pipe($.angularTemplatecache({
      root: 'views',
      module: '<%= appname %>'
    }));

  var tpls = gulp.src('client/directives/**/*.html')
    .pipe($.angularTemplatecache({
      root: 'directives',
      module: '<%= appname %>'
    }));

  var app = gulp.src('dist/client/app.js');

  return sq({ objectMode: true }, app, views, tpls)
    .pipe($.concat('app.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('replace', function () {
  return gulp.src('dist/client/index.html')
    .pipe($.replace(/\s*<script.*livereload.*><\/script>\n*/, ''))
    .pipe(gulp.dest('dist/client'));
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
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('build', function (cb) {
  runSequence(
    ['clean:dist', 'sass'],
    ['usemin', 'copy:dist'],
    ['replace', 'scripts', 'cssmin'],
    'rev',
    'clean:finish',
    cb);
});

/**
 * Git versioning and bump
 */

gulp.task('version', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe($.bump({
      type: process.argv[3] ? process.argv[3].substr(2) : 'patch'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('bump', ['version'], function () {
  fs.readFile('./package.json', function (err, data) {
    if (err) { return ; }
    return gulp.src(['./package.json', './bower.json'])
      .pipe($.git.add())
      .pipe($.git.commit('chore(core): bump to ' + JSON.parse(data).version));
  });
});

gulp.task('default', ['serve']);
