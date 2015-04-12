'use strict';

var fs = require('fs');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var utils = require('../util');

describe('Launching style tests', function () {

  var bangStyle,
      bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        reload: 'livereload',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should create a style file and not import it in the app scss', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'bootstrap');
      helpers.mockPrompt(bangStyle, { import: false });
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/bootstrap.scss');
          assert.noFileContent('client/styles/app.scss', 'bootstrap');
          done();
        }, 250);
      });

    });

    it('should create a style file and import it in the app scss', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'flexbox');
      helpers.mockPrompt(bangStyle, { import: true });
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/flexbox.scss');
          assert.fileContent('client/styles/app.scss', '@import "flexbox";');
          done();
        }, 250);
      });

    });

    it('should insert the import on needle', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'gold');
      helpers.mockPrompt(bangStyle, { import: true });
      fs.appendFileSync('client/styles/app.scss', '// imports');
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/gold.scss');
          assert.fileContent('client/styles/app.scss', '// imports\n@import "gold";');
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
        reload: 'livereload',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should not add another import if it already exists', function (done) {

      bangStyle = helpers.createGenerator('bangular:style', [bangDir + '/style'], 'comic');
      helpers.mockPrompt(bangStyle, { import: true });
      fs.appendFileSync('client/styles/app.scss', '// imports\n@import "comic";');
      bangStyle.run(function () {
        setTimeout(function () {
          assert.file('client/styles/comic.scss');
          assert.fileContent('client/styles/app.scss', '// imports\n@import "comic";');
          assert.noFileContent('client/styles/app.scss', '// imports\n@import "comic";\n@import "comic";');
          done();
        }, 30);
      });

    });

  });

});
