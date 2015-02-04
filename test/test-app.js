/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

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
          modules: []
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

  });

  describe('', function () {

    before(function (done) {

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './tmp'))
        .withOptions({ 'skipInstall': true })
        .withPrompt({
          name: 'Test',
          backend: 'json',
          modules: []
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
  });

});
