var gulp        = require('gulp'),
    chalk       = require('chalk'),
    spritesmith = require('gulp.spritesmith'),
    fs          = require('fs');

gulp.task('default', ['logos']);

gulp.task('logos', function (done) {

  log('Building logos sprite ...');
  log('Done');

  gulp.src([
   'logos/yeoman.png',
   'logos/gulp.png',
   'logos/angular.png',
   'logos/node.png',
   'logos/socket.png',
   'logos/express.png',
   'logos/mongo.png',
   'logos/sass.png',
   'logos/bower.png'
  ])
    .pipe(spritesmith({
      imgName   : 'logos-sprite.png',
      cssName   : 'sprite.css',
      algorithm : 'left-right',
      padding   : 10
    }))
    .pipe(gulp.dest('logos/'))
    .on('end', function () {
      fs.unlinkSync('logos/sprite.css');
      done();
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
