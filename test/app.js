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
    'karma.conf.js',
    'protractor.conf.js',
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
    'client/views/home/home.spec.js',
    'client/views/home/home.e2e.js',
    'README.md',
    '.editorconfig',
    '.jshintrc',
    '.gitignore'
  ]);
}

describe('Launching app generator tests', function () {

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        modules: [],
        sockets: false
      }, done);

    });

    it('should creates all the files', basicFileCheck);

    it('should check name in some files', function () {
      assert.fileContent('README.md', '# test');
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
  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'restock',
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
        'client/views/signup/signup.spec.js',
        'client/views/signup/signup.e2e.js',
        'client/views/login/login.controller.js',
        'client/views/login/login.html',
        'client/views/login/login.js',
        'client/views/login/login.spec.js',
        'client/views/login/login.e2e.js',
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

      this.timeout(240000);
      var dir;

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './mock'), function (d) {
          dir = d;
          var cb = this.async();
          exec('cp ' + path.join(__dirname, '/files/.yo-rc.json') + ' ' + dir, function () {
            cb();
          });
        })
        .withPrompt({
          name: 'Test',
          backend: 'mongo',
          modules: [],
          sockets: true,
          auth: true
        })
        .on('end', function () {
          exec('cp ' + path.join(__dirname, '/files/protractor.conf.js') + ' ' + dir, done);
        });
    });

    it('should successfully pass the gulp control command', function (done) {
      this.timeout(20000);
      exec('gulp control', function (err, stdout) {
        chaiAssert.include(stdout, ' Starting \'control\'...\n[', 'Start should not be followed by newlines.');
        done();
      });
    });

    it('should successfully pass the server tests', function (done) {
      this.timeout(20000);
      exec('gulp test --server', function (err, stdout) {
        chaiAssert.notMatch(stdout, /((?=.*[1-9])\d+(\.\d+)?) failing\n/, 'Output should not have failing tests.');
        done();
      });
    });

    it('should successfully pass the karma tests', function (done) {
      this.timeout(20000);
      exec('gulp test --client', function (err, stdout) {
        chaiAssert.notMatch(stdout, /\(((?=.*[1-9])\d+(\.\d+)?) FAILED\)/, 'Output should not contain failed tests.');
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
      exec('gulp e2e:update', function () {
        exec('gulp e2e', { timeout: 30000 }, function (err, stdout) {
          chaiAssert.include(stdout, '3 tests, 3 assertions, 0 failures');
          chaiAssert.notMatch(stdout, /\(((?=.*[1-9])\d+(\.\d+)?) failures\)/, 'Output should not contain failed tests.');
          done(err);
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
