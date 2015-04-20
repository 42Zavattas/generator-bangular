'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var exec = require('child_process').exec;
var chaiAssert = require('chai').assert;
var utils = require('../util');

function basicFileCheck () {
  assert.file([
    'gulpfile.js',
    'bower.json',
    'package.json',
    'server/routes.js',
    'server/server.js',
    'server/config/express.js',
    'server/config/environment/index.js',
    'server/config/environment/development.js',
    'server/config/environment/production.js',
    'server/config/environment/test.js',
    'client/index.html',
    'client/app.js',
    'client/assets/favicon.ico',
    'client/styles/app.scss',
    'client/views/home/home.controller.js',
    'client/views/home/home.html',
    'client/views/home/home.js',
    'README.md',
    '.editorconfig',
    '.gitignore'
  ]);
}

describe('Launching app generator tests', function () {

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        reload: 'livereload',
        modules: [],
        sockets: false
      }, done);

    });

    it('should creates all the files', basicFileCheck);

    it('should check name in some files', function () {
      assert.fileContent('README.md', '# Test');
      assert.fileContent('client/index.html', 'ng-app="test"');
      assert.fileContent('client/app.js', 'angular.module(\'test\'');
    });

    it('should have mongo dependency', function () {
      assert.fileContent('package.json', 'mongoose');
    });

    it('should have mongo connect', function () {
      assert.fileContent('server/server.js', 'mongoose.connect(config.mongo.uri, config.mongo.options);');
    });

    it('should not have request dependency', function () {
      assert.noFileContent('package.json', 'request');
    });

    it('should not have tests files', function () {
      assert.noFile([
        '.jscsrc',
        '.jshintrc',
        'server/.jshintrc',
        'client/.jshintrc',
        'client/views/login/login.spec.js',
        'client/views/login/login.e2e.js',
        'client/views/signup/signup.spec.js',
        'client/views/signup/signup.e2e.js',
        'client/views/home/home.spec.js',
        'client/views/home/home.e2e.js',
        'karma.conf.js',
        'protractor.conf.js'
      ]);
    });

    it('should not have the tests dependencies', function () {
      assert.noFileContent('package.json', 'mocha');
      assert.noFileContent('package.json', 'karma');
      assert.noFileContent('package.json', 'phantomjs');
      assert.noFileContent('package.json', 'jasmine');
      assert.noFileContent('package.json', 'protractor');
      assert.noFileContent('package.json', 'should');
      assert.noFileContent('package.json', 'supertest');
      assert.noFileContent('package.json', 'jscs');
      assert.noFileContent('package.json', 'jshint');
    });

    it('should not have the tests gulp tasks', function () {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'test\'');
      assert.noFileContent('gulpfile.js', 'gulp.task(\'control\'');
      assert.noFileContent('gulpfile.js', 'gulp.task(\'e2e\'');
      assert.noFileContent('gulpfile.js', 'gulp.task(\'e2e:update\'');
    });
  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        reload: 'livereload',
        modules: [],
        sockets: false,
        auth: true,
        tests: ['e2e', 'control', 'karma', 'mocha']
      }, done);

    });

    it('should creates all the files', basicFileCheck);

    it('should create the tests files', function () {
      assert.file([
        '.jscsrc',
        '.jshintrc',
        'server/.jshintrc',
        'client/.jshintrc',
        'client/views/login/login.spec.js',
        'client/views/login/login.e2e.js',
        'client/views/signup/signup.spec.js',
        'client/views/signup/signup.e2e.js',
        'client/views/home/home.spec.js',
        'client/views/home/home.e2e.js',
        'karma.conf.js',
        'protractor.conf.js'
      ]);
    });

    it('should check the package tests dependencies', function () {
      assert.fileContent('package.json', 'mocha');
      assert.fileContent('package.json', 'karma');
      assert.fileContent('package.json', 'phantomjs');
      assert.fileContent('package.json', 'jasmine');
      assert.fileContent('package.json', 'protractor');
      assert.fileContent('package.json', 'should');
      assert.fileContent('package.json', 'supertest');
      assert.fileContent('package.json', 'jscs');
      assert.fileContent('package.json', 'jshint');
    });

    it('should check the gulp tasks', function () {
      assert.fileContent('gulpfile.js', 'gulp.task(\'test\'');
      assert.fileContent('gulpfile.js', 'gulp.task(\'control\'');
      assert.fileContent('gulpfile.js', 'gulp.task(\'e2e\'');
      assert.fileContent('gulpfile.js', 'gulp.task(\'e2e:update\'');
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'restock',
        reload: 'livereload',
        modules: ['ngCookies', 'ngSanitize']
      }, done);

    });

    it('should create all the files', basicFileCheck);

    it('should have request dependency', function () {
      assert.fileContent('package.json', 'request');
    });

    it('should not have mongo dependency', function () {
      assert.noFileContent('package.json', 'mongoose');
    });

    it('should not have mongo connect', function () {
      assert.noFileContent('server/server.js', 'mongoose.connect(config.mongo.uri, config.mongo.options);');
    });

    it('should have loaded client dependencies', function () {
      assert.file('bower.json');
      assert.fileContent('bower.json', '"angular-cookies":');
      assert.fileContent('bower.json', '"angular-sanitize":');
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        reload: 'livereload',
        modules: [],
        sockets: true
      }, done);

    });

    it('should have socket dependency, config and requires', function () {
      assert.fileContent('package.json', '"socket.io":');
      assert.fileContent('bower.json', '"angular-socket-io":');
      assert.fileContent('client/index.html', 'socket.io/socket.io.js');
      assert.fileContent('client/app.js', 'btford.socket-io');
      assert.file('server/config/sockets.js');
      assert.fileContent('server/server.js', 'var socket = require(\'socket.io\')');
      assert.fileContent('server/server.js', 'require(\'./config/sockets.js\')(socket);');
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        reload: 'livereload',
        modules: ['ngResource', 'ngAnimate']
      }, done);

    });

    it('should create all the files', basicFileCheck);

    it('should not have request dependency', function () {
      assert.noFileContent('package.json', 'request');
    });

    it('should not have mongo dependency', function () {
      assert.noFileContent('package.json', 'mongoose');
    });

    it('should not have mongo connect', function () {
      assert.noFileContent('server/server.js', 'mongoose.connect(config.mongo.uri, config.mongo.options);');
    });

    it('should have loaded client dependencies', function () {
      assert.file('bower.json');
      assert.fileContent('bower.json', '"angular-resource":');
      assert.fileContent('bower.json', '"angular-animate":');
    });
  });

  describe('', function () {

    var bangDir = process.cwd();

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        reload: 'livereload',
        modules: []
      }, done);

    });

    it('should test a generation in an already generated directory', function (done) {

      var tmpBang = helpers.createGenerator('bangular', [bangDir + '/app'], false, { skipInstall: true });

      helpers.mockPrompt(tmpBang, { skipConfig: true });
      tmpBang.conflicter.force = true;
      tmpBang.run(done);

    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        reload: 'livereload',
        modules: [],
        sockets: true,
        auth: true
      }, done);

    });

    it('should test for auth files', function () {

      assert.file([
        'client/views/signup/signup.controller.js',
        'client/views/signup/signup.html',
        'client/views/signup/signup.js',
        'client/views/login/login.controller.js',
        'client/views/login/login.html',
        'client/views/login/login.js',
        'client/services/auth',
        'server/auth'
      ]);

      assert.fileContent('server/routes.js', 'app.use(\'/auth\', require(\'./auth\'));');
      assert.fileContent('server/config/express.js', 'express-session');
      assert.fileContent('server/config/express.js', 'app.use(session({');
      assert.fileContent('package.json', 'passport');
      assert.fileContent('package.json', 'passport-local');
      assert.fileContent('package.json', 'connect-mongo');

      assert.fileContent('client/index.html', 'nav-bar');
      assert.fileContent('bower.json', 'angular-cookies');
    });
  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        reload: 'browsersync',
        modules: [],
        sockets: true,
        auth: true
      }, done);

    });

    it('should create all the files', basicFileCheck);

    it('should check specific dependencies', function () {
      assert.fileContent('package.json', 'browser-sync');
      assert.noFileContent('package.json', 'gulp-livereload');
      assert.noFileContent('package.json', 'gulp-replace');
    });

    it('should check index', function () {
      assert.noFileContent('client/index.html', 'livereload');
    });

    it('should check serve task', function () {
      assert.fileContent('tasks/serve.js', 'bsync.init');
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        reload: 'livereload',
        modules: [],
        docs: ['sassdoc']
      }, done);

    });

    it('should create all the files', basicFileCheck);

    it('should check sassdoc dependency', function () {
      assert.fileContent('package.json', 'sassdoc');
    });

    it('should check sassdoc task is present', function () {
      assert.file('tasks/doc.js');
      assert.fileContent('tasks/doc.js', 'exports.sassdoc = function () {');
      assert.fileContent('gulpfile.js', 'gulp.task(\'sassdoc\', ');
      assert.fileContent('.gitignore', 'docs/');
    });

  });

  describe('', function () {

    before(function (done) {

      this.timeout(240000);

      var dir;

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './mock'), function (d) {
          dir = d;
        })
        .withOptions({ skipInstall: false })
        .withPrompts({
          name: 'Test',
          backend: 'mongo',
          reload: 'livereload',
          modules: [],
          sockets: true,
          auth: true,
          tests: ['e2e', 'karma', 'mocha', 'control']
        })
        .on('end', function () {
          exec('cp ' + path.join(__dirname, '/files/protractor.conf.js') + ' ' + dir, done);
        });
    });

    it('should successfully pass the gulp control command', function (done) {
      this.timeout(20000);
      exec('gulp control', function (err, stdout) {
        chaiAssert.include(stdout, ' Starting \'control\'...\n[', 'Start should not be followed by newlines.');
        chaiAssert.notInclude(stdout, 'Task \'control\' is not in your gulpfile');
        done();
      });
    });

    it('should successfully pass the server tests', function (done) {
      this.timeout(20000);
      exec('gulp test --server', function (err, stdout) {
        chaiAssert.notMatch(stdout, /((?=.*[1-9])\d+(\.\d+)?) failing\n/, 'Output should not have failing tests.');
        chaiAssert.notInclude(stdout, 'Task \'test\' is not in your gulpfile');
        done();
      });
    });

    it('should successfully pass the karma tests', function (done) {
      this.timeout(20000);
      exec('gulp test --client', function (err, stdout) {
        chaiAssert.notMatch(stdout, /\(((?=.*[1-9])\d+(\.\d+)?) FAILED\)/, 'Output should not contain failed tests.');
        chaiAssert.notInclude(stdout, 'Task \'test\' is not in your gulpfile');
        done();
      });
    });

    it('should build the app and check some files', function (done) {
      this.timeout(60000);
      exec('gulp build', function (err) {

        assert.file([
          'dist/package.json',
          'dist/server/server.js',
          'dist/server/routes.js',
          'dist/client/index.html'
        ]);

        assert.noFileContent('dist/client/index.html', 'livereload');
        done(err);
      });
    });

    it('should update the webdriver and pass e2e tests', function (done) {
      this.timeout(60000);
      exec('gulp e2e:update', function (err, stdout) {
        chaiAssert.notInclude(stdout, 'Task \'e2e:update\' is not in your gulpfile');
        exec('gulp e2e', { timeout: 30000 }, function (err, stdout) {
          chaiAssert.include(stdout, '3 tests, 3 assertions, 0 failures');
          chaiAssert.notMatch(stdout, /\(((?=.*[1-9])\d+(\.\d+)?) failures\)/, 'Output should not contain failed tests.');
          done();
        });
      });
    });

    after(function (done) {
      exec('cd .. && rm -rf ./mock', function () {
        done();
      });
    });

  });

});
