'use strict';

var path = require('path');
var os = require('os');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching directive tests', function () {

  var bangular, bangDirective, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        if (err) { done(err); }

        bangular = helpers.createGenerator('bangular:app',
            [path.join(bangDir, '/app')],
        false, { skipInstall: true, skipLog: true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'mongo', modules: [] });
        bangular.run(done);

      });

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

});
