'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var utils = require('../util');

describe('Launching api tests', function () {

  var bangApi,
      bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        modules: [],
        tests: ['mocha']
      }, done, { skipInstall: true, skipLog: true });

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

    it('should run another new route and check injects', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'restock');
      helpers.mockPrompt(bangApi, { url: '/api/restocks' });
      bangApi.run(function () {
        setTimeout(function () {
          assert.file('server/api/restock/index.js');
          assert.file('server/api/restock/restock.controller.js');
          assert.file('server/api/restock/restock.spec.js');
          assert.file('server/api/restock/restock.model.js');

          assert.fileContent('server/routes.js', 'app.use(\'/api/restocks\', require(\'./api/restock\'));');
          assert.fileContent('server/routes.js', 'app.use(\'/api/users\', require(\'./api/user\'));');
          done();
        }, 250);
      });
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should not create the spec file', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'restock');
      helpers.mockPrompt(bangApi, { url: '/api/restocks' });
      bangApi.run(function () {
        setTimeout(function () {
          assert.file('server/api/restock/index.js');
          assert.file('server/api/restock/restock.controller.js');
          assert.noFile('server/api/restock/restock.spec.js');
          assert.file('server/api/restock/restock.model.js');
          done();
        }, 250);
      });
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

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

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        modules: ['ngResource'],
        sockets: true
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should test api with sockets', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'user');
      helpers.mockPrompt(bangApi, { url: '/api/users', sockets: true });
      bangApi.run(function () {
        assert.file('server/api/user/index.js');
        assert.file('server/api/user/user.socket.js');
        assert.fileContent('server/config/sockets.js', 'require(\'../api/user/user.socket.js\').register(socket);');
        done();
      });
    });

    it('should create the associated service', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'item');
      helpers.mockPrompt(bangApi, { url: '/api/items', resource: true });
      bangApi.run(function () {
        assert.file('client/services/item/item.resource.js');
        assert.fileContent('client/services/item/item.resource.js', '.factory(\'Item\', ');
        assert.fileContent('client/services/item/item.resource.js', '/api/items/:id');
        done();
      });
    });

  });

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'restock',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should at least have created a file with request', function () {
      assert.file('package.json');
      assert.fileContent('package.json', 'request');
    });

    it('should run the api gen and check the new files and inject', function (done) {
      bangApi = helpers.createGenerator('bangular:api', [bangDir + '/api'], 'user');
      helpers.mockPrompt(bangApi, { url: '/api/users' });
      bangApi.run(function () {

        setTimeout(function () {
          assert.file('server/api/user/index.js');
          assert.file('server/api/user/user.controller.js');

          assert.fileContent('server/api/user/index.js', 'var controller = require(\'./user.controller\');');

          assert.fileContent('server/api/user/user.controller.js', 'var request = require(\'request\');');
          assert.fileContent('server/api/user/user.controller.js', 'request(apiUrl + \'10{name:s}\', function (err, resp, body) {');
          assert.fileContent('server/api/user/user.controller.js', 'request(apiUrl + \'{name:s}\', function (err, resp, body) {');

          assert.fileContent('server/routes.js', 'app.use(\'/api/users\', require(\'./api/user\'));');

          done();
        }, 250);

      });
    });

  });

});
