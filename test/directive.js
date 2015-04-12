'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var utils = require('../util');

describe('Launching directive tests', function () {

  var bangDirective,
      bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'mongo',
        reload: 'livereload',
        modules: [],
        tests: ['karma']
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should create a file with no template', function (done) {
      bangDirective = helpers.createGenerator('bangular:directive', [bangDir + '/directive'], 'map');
      helpers.mockPrompt(bangDirective, { template: false });
      bangDirective.run(function () {
        assert.file('client/directives/map/map.directive.js');
        assert.file('client/directives/map/map.spec.js');

        assert.fileContent('client/directives/map/map.directive.js', '.directive(\'map\', function () {');
        assert.noFileContent('client/directives/map/map.directive.js', 'templateUrl');
        assert.fileContent('client/directives/map/map.spec.js', 'angular.element(\'<map></map>\');');

        done();
      });
    });

    it('should create a file with a template', function (done) {
      bangDirective = helpers.createGenerator('bangular:directive', [bangDir + '/directive'], 'sushi');
      helpers.mockPrompt(bangDirective, { template: true });
      bangDirective.run(function () {
        assert.file('client/directives/sushi/sushi.directive.js');
        assert.file('client/directives/sushi/sushi.spec.js');
        assert.file('client/directives/sushi/sushi.html');

        assert.fileContent('client/directives/sushi/sushi.directive.js', '.directive(\'sushi\', function () {');
        assert.fileContent('client/directives/sushi/sushi.directive.js', 'templateUrl');
        assert.fileContent('client/directives/sushi/sushi.spec.js', 'angular.element(\'<sushi></sushi>\');');

        done();
      });
    });

    it('should create a file with a style', function (done) {
      bangDirective = helpers.createGenerator('bangular:directive', [bangDir + '/directive'], 'flammenkuche');
      helpers.mockPrompt(bangDirective, { import: true });
      bangDirective.run(function () {
        assert.file('client/directives/flammenkuche/flammenkuche.directive.js');
        assert.file('client/directives/flammenkuche/flammenkuche.spec.js');
        assert.file('client/directives/flammenkuche/flammenkuche.scss');

        assert.fileContent('client/directives/flammenkuche/flammenkuche.directive.js', '.directive(\'flammenkuche\', function () {');
        assert.fileContent('client/directives/flammenkuche/flammenkuche.spec.js', 'angular.element(\'<flammenkuche></flammenkuche>\');');

        setTimeout(function () {
          assert.fileContent('client/styles/app.scss', '@import "../directives/flammenkuche/flammenkuche";');
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
        reload: 'livereload',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should not create the spec', function (done) {
      bangDirective = helpers.createGenerator('bangular:directive', [bangDir + '/directive'], 'map');
      helpers.mockPrompt(bangDirective, { template: false });
      bangDirective.run(function () {
        assert.noFile('client/directives/map/map.spec.js');
        done();
      });
    });

  });

});
