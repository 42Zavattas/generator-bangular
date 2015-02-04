'use strict';

var path = require('path');
var os = require('os');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

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
    'client/karma.conf.js',
    'client/assets/favicon.ico',
    'client/styles/app.scss',
    'client/views/home/home.controller.js',
    'client/views/home/home.html',
    'client/views/home/home.js',
    'client/views/home/home.spec.js',
    'README.md',
    '.editorconfig',
    '.jshintrc',
    '.gitignore'
  ]);
}

describe('Launching app generator tests', function () {

  describe('', function () {

    before(function (done) {

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './tmp'))
        .withOptions({ 'skipInstall': true })
        .withPrompt({
          name: 'Test',
          backend: 'mongo',
          modules: []
        })
        .on('end', done);

    });

    it('should creates all the files', basicFileCheck);

    it('should check name in some files', function () {
      assert.fileContent('client/index.html', 'ng-app="test"');
      assert.fileContent('README.md', '# test');
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

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './tmp'))
        .withOptions({ 'skipInstall': true })
        .withPrompt({
          name: 'Test',
          backend: 'restock',
          modules: ['ngCookies', 'ngSanitize']
        })
        .on('end', done);

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

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './tmp'))
        .withOptions({ 'skipInstall': true })
        .withPrompt({
          name: 'Test',
          backend: 'json',
          modules: ['ngResource', 'ngAnimate']
        })
        .on('end', done);

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

    var bangular, tmpDir, tmpBang;
    var bangDir = process.cwd();

    before(function (done) {
      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        if (err) { done(err); }
        bangular = helpers.createGenerator('bangular:app',
          [bangDir + '/app'],
        false, { 'skipInstall': true, 'skipConfig': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend:'json', modules: [] });
        bangular.run(done);
      });
    });

    it('should test a generation in an already generated directory', function (done) {
      tmpBang = helpers.createGenerator('bangular:app',
        [bangDir + '/app'],
      false, { 'skipInstall': true });

      helpers.mockPrompt(tmpBang, { skipConfig: true });
      tmpBang.conflicter.force = true;
      tmpBang.run(function () {
        done();
      });
    });

  });

});
