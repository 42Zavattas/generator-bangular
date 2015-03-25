var gulp        = require('gulp'),
    chalk       = require('chalk'),
    spritesmith = require('gulp.spritesmith'),
    jshint      = require('gulp-jshint'),
    jscs        = require('gulp-jscs'),
    jscsStylish = require('gulp-jscs-stylish'),
    fs          = require('fs');

gulp.task('default', ['control']);

gulp.task('logos', function (done) {

  log('Building logos sprite ...');
  log('Done');

  gulp.src([
   'logos/yeoman.png',
   'logos/gulp.png',
   'logos/angular.png',
   'logos/node.png',
   'logos/socket.png',
   'logos/passport.png',
   'logos/express.png',
   'logos/mongo.png',
   'logos/sass.png',
   'logos/karma.png',
   'logos/protractor.png',
   'logos/jscs.png',
   'logos/bower.png'
  ])
    .pipe(spritesmith({
      imgName       : 'logos-sprite.png',
      cssName       : 'sprite.css',
      algorithm     : 'left-right',
      algorithmOpts : { sort: false },
      padding       : 10
    }))
    .pipe(gulp.dest('logos/'))
    .on('end', function () {
      fs.unlinkSync('logos/sprite.css');
      done();
    });

});

gulp.task('control', function (done) {

  var paths = [
    '!./node_modules/**',
    '!./**/templates/**/index.js',
    './**/index.js',
    './test/*.js'
  ];

  gulp.src(paths)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('finish', function () {
      gulp.src(paths)
        .pipe(jscs())
        .on('error', function () {})
        .pipe(jscsStylish())
        .on('end', done);
    });

});

gulp.task('changelog', function (done) {
  require('conventional-changelog')({
    repository: 'https://github.com/42Zavattas/generator-bangular',
    version: require('./package.json').version,
    from: '0.9.2',
    to: '0.9.3'
  }, function (err, log) {
    fs.writeFile('CHANGELOG.md', log, done);
  });
});

// utils
// =====

function log (str) {
  console.log(chalk.blue(' >>> [ ') + chalk.green(pad(str, 30, ' ')) + chalk.blue(' ]'));
}

function pad (n, w, z) {
  z = z || '0';
  n = n + '';
  return n.length >= w ? n : n + new Array(w - n.length + 1).join(z);
}
