'use strict';

/**
 * Inject css/js files in index.html
 */

var gulp       = require('gulp');
var bowerFiles = require('main-bower-files');
var fileSort   = require('gulp-angular-filesort');
var inject     = require('gulp-inject');

var toInject   = require('./config/filesToInject');
var toExclude  = require('./config/bowerFilesToExclude');

module.exports = function () {
  return gulp.src('client/index.html')
    .pipe(inject(gulp.src(bowerFiles(), { read: false }), {
      name: 'bower',
      relative: 'true',
      ignorePath: toExclude
    }))
    .pipe(inject(
      gulp.src(toInject).pipe(fileSort()), { relative: true }
    ))
    .pipe(gulp.dest('client'));
};
