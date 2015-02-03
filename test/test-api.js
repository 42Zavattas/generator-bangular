'use strict';

var path = require('path');
var os = require('os');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching api tests', function () {

  var bangular, bangApi, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        if (err) { done(err); }

        bangular = helpers.createGenerator('bangular:app',
            [path.join(bangDir, '/app'),
          ], false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'mongo', modules: [] });

        bangular.run(done);
      });

    });

    it('should at least have created a file with mongo', function () {
      assert.file('package.json');
      assert.fileContent('package.json', 'mongoose');
    });

    it('should run the api gen and check the new files', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'user');
      helpers.mockPrompt(bangApi, { url: '/api/users' });
      bangApi.run(function () {
        assert.file('server/api/user/index.js');
        assert.file('server/api/user/user.controller.js');
        assert.file('server/api/user/user.spec.js');
        assert.file('server/api/user/user.model.js');
        assert.fileContent('server/api/user/index.js', 'var controller = require(\'./user.controller\');');

        assert.fileContent('server/api/user/user.controller.js', 'var User = require(\'./user.model\');');
        assert.fileContent('server/api/user/user.controller.js', 'return res.status(200).json(user);');
        assert.fileContent('server/api/user/user.controller.js', 'User.findById(req.params.id, function (err, user) {');

        assert.fileContent('server/api/user/user.model.js', 'module.exports = mongoose.model(\'User\', UserSchema);');
        assert.fileContent('server/api/user/user.spec.js', 'describe(\'GET /api/users\', function () {');
        done();
      });
    });

    it('should run another new route', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'restock');
      helpers.mockPrompt(bangApi, { url: '/api/restocks' });
      bangApi.run(function () {
        assert.file('server/api/restock/index.js');
        assert.file('server/api/restock/restock.controller.js');
        assert.file('server/api/restock/restock.spec.js');
        assert.file('server/api/restock/restock.model.js');
        done();
      });
    });

    it('should check injection in the route config', function () {
      assert.fileContent('server/routes.js', 'app.use(\'/api/restocks\', require(\'./api/restock\'));');
      assert.fileContent('server/routes.js', 'app.use(\'/api/users\', require(\'./api/user\'));');
    });

  });

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        if (err) { done(err); }

        bangular = helpers.createGenerator('bangular:app',
            [path.join(bangDir, '/app'),
          ], false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'json', modules: [] });

        bangular.run(done);
      });

    });

    it('should check for a single file', function () {
      assert.file('package.json');
    });

    it('should create a new route and check it', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'user');
      helpers.mockPrompt(bangApi, { url: '/api/users' });
      bangApi.run(function () {
        assert.file('server/api/user/index.js');
        assert.file('server/api/user/user.data.json');
        assert.file('server/api/user/user.controller.js');
        assert.fileContent('server/api/user/user.controller.js', 'fs.readFile(\'server/api/user/user.data.json\', \'utf-8\', function (err, users) {');
        done();
      });
    });

    it('should check its injection', function () {
      assert.fileContent('server/routes.js', 'app.use(\'/api/users\', require(\'./api/user\'));');
    });

  });

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        if (err) { done(err); }

        bangular = helpers.createGenerator('bangular:app',
            [path.join(bangDir, '/app'),
          ], false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'restock', modules: [] });

        bangular.run(done);
      });

    });

    it('should at least have created a file with request', function () {
      assert.file('package.json');
      assert.fileContent('package.json', 'request');
    });

    it('should run the api gen and check the new files', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'user');
      helpers.mockPrompt(bangApi, { url: '/api/users' });
      bangApi.run(function () {
        assert.file('server/api/user/index.js');
        assert.file('server/api/user/user.controller.js');

        assert.fileContent('server/api/user/index.js', 'var controller = require(\'./user.controller\');');

        assert.fileContent('server/api/user/user.controller.js', 'var request = require(\'request\');');
        assert.fileContent('server/api/user/user.controller.js', 'request(\'http://www.restock.io/api/10{name:s}\', function (err, response, body) {');
        assert.fileContent('server/api/user/user.controller.js', 'request(\'http://www.restock.io/api/{name:s}\', function (err, response, body) {');

        done();
      });
    });

    it('should check injection in the route config', function () {
      assert.fileContent('server/routes.js', 'app.use(\'/api/users\', require(\'./api/user\'));');
    });

  });

});
