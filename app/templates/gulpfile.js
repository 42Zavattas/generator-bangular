'use strict';

var gulp = require('gulp');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('default',    ['serve']);<% if (filters.reload === 'browsersync') { %>
gulp.task('nodemon',    ['watch'],    require('./tasks/serve').nodemon);<% } %>
gulp.task('serve',      [<% if (filters.reload === 'livereload') { %>'watch'],  <% } else { %>'nodemon'],<% } %>  require('./tasks/serve')<% if (filters.reload === 'browsersync') { %>.bsync<% } else { %>.nodemon<% } %>);
gulp.task('watch',      ['inject'],   require('./tasks/watch'));
gulp.task('inject',     ['sass'],     require('./tasks/inject'));
gulp.task('sass',                     require('./tasks/sass'));
gulp.task('preview',    ['build'],    require('./tasks/preview'));
gulp.task('build',                    require('./tasks/build'));
gulp.task('bump',       ['version'],  require('./tasks/chore').bump);
gulp.task('version',                  require('./tasks/chore').version);<% if (filters.control) { %>
gulp.task('control',                  require('./tasks/control'));<% } if (filters.e2e) { %>
gulp.task('e2e:update',               require('./tasks/test').e2eUpdate);
gulp.task('e2e',        ['serve'],    require('./tasks/test').e2eTests);<% } if (filters.karma || filters.mocha) { %>
gulp.task('test',                     require('./tasks/test').test);<% } %>
