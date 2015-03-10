'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var utils = require('../util');

describe('Launching filter tests', function () {

  var bangFilter,
      bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'restock',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

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
