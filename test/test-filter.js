'use strict';

var path = require('path');
var os = require('os');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching filter tests', function () {

  var bangular, bangFilter, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        bangular = helpers.createGenerator('bangular:app',
          [path.join(bangDir, '/app')],
        false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'restock', modules: [] });
        bangular.run(done);
      });

    });

    it('should run the filter subgenerator', function (done) {
      bangFilter = helpers.createGenerator('bangular:filter', [bangDir + '/filter'], 'phone');
      bangFilter.run(function () {
        assert.file('client/filters/phone/phone.js');
        assert.file('client/filters/phone/phone.spec.js');
        assert.fileContent('client/filters/phone/phone.js', '.filter(\'phone\', function () {');
        assert.fileContent('client/filters/phone/phone.spec.js', 'describe(\'phone filter\', function () {');
        done();
      });
    });

  });

});
