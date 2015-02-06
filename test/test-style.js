'use strict';

var path = require('path');
var os = require('os');
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching style tests', function () {

  var bangular, bangStyle, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        bangular = helpers.createGenerator('bangular:app',
          [path.join(bangDir, '/app')],
        false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'json', modules: [] });
        bangular.run(done);
      });

    });

    it('should create a style file and not import it in the app scss', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'bootstrap');
      helpers.mockPrompt(bangStyle, { 'import': false });
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/bootstrap.scss');
          assert.noFileContent('client/styles/app.scss', 'bootstrap');
          done();
        }, 50);
      });

    });

    it('should create a style file and import it in the app scss', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'flexbox');
      helpers.mockPrompt(bangStyle, { 'import': true });
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/flexbox.scss');
          assert.fileContent('client/styles/app.scss', '@import "flexbox";');
          done();
        }, 50);
      });

    });


    it('should insert the import on needle', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'gold');
      helpers.mockPrompt(bangStyle, { 'import': true });
      fs.appendFileSync('client/styles/app.scss', '// imports');
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/gold.scss');
          assert.fileContent('client/styles/app.scss', '// imports\n@import "gold";');
          done();
        }, 50);
      });
    });


  });

});
