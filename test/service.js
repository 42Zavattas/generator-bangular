'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var utils = require('../util');

describe('Launching service tests', function () {

  var bangService,
      bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should create a new service', function (done) {

      bangService = helpers.createGenerator('bangular:service', [bangDir + '/service'], 'socket');
      bangService.run(function () {
        assert.file('client/services/socket/socket.js');
        assert.file('client/services/socket/socket.spec.js');
        assert.fileContent('client/services/socket/socket.js', '.service(\'Socket\', function () {');
        assert.fileContent('client/services/socket/socket.spec.js', 'inject(function (_Socket_) {');
        done();
      });

    });

  });

});
