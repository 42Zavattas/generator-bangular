'use strict';

var path = require('path');
var os = require('os');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching factory tests', function () {

  var bangular, bangService, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function () {
        bangular = helpers.createGenerator('bangular:app',
          [path.join(bangDir, '/app')],
        false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'json', modules: [] });
        bangular.run(done);
      });

    });

    it('should create a new factory', function (done) {

      bangService = helpers.createGenerator('bangular:factory', [bangDir + '/factory'], 'socket');
      bangService.run(function () {
        assert.file('client/services/socket/socket.js');
        assert.file('client/services/socket/socket.spec.js');
        assert.fileContent('client/services/socket/socket.js', '.factory(\'Socket\', function () {');
        assert.fileContent('client/services/socket/socket.spec.js', 'inject(function (_Socket_) {');
        done();
      });

    });

  });

});
