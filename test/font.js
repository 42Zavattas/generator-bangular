'use strict';

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var utils = require('../util');

describe('Launching fonts tests', function () {

  var bangFont,
      bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      utils.scaffold({
        name: 'Test',
        backend: 'json',
        modules: []
      }, done, { skipInstall: true, skipLog: true });

    });

    it('should see that there is no font style yet', function () {
      assert.noFile('client/styles/fonts.scss');
    });

    it('should run the font subgenerator with otf', function (done) {
      bangFont = helpers.createGenerator('bangular:font', [bangDir + '/font'], 'comicsansms');
      helpers.mockPrompt(bangFont, { types: ['otf'] });
      bangFont.run(function () {
        assert.file('client/assets/fonts/comicsansms');
        assert.file('client/styles/fonts.scss');

        assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/comicsansms/comicsansms.otf\') format(\'opentype\')');
        done();
      });
    });

    it('should run the font subgenerator with ttf and eot', function (done) {
      bangFont = helpers.createGenerator('bangular:font', [bangDir + '/font'], 'fugitive');
      helpers.mockPrompt(bangFont, { types: ['ttf', 'eot'] });
      bangFont.run(function () {
        assert.file('client/assets/fonts/fugitive');
        assert.file('client/styles/fonts.scss');

        setTimeout(function () {
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/fugitive/fugitive.ttf\') format(\'truetype\')');
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/fugitive/fugitive.eot\')');
          done();
        }, 30);

      });
    });

    it('should run the font subgenerator with all formats', function (done) {
      bangFont = helpers.createGenerator('bangular:font', [bangDir + '/font'], 'sushi');
      helpers.mockPrompt(bangFont, { types: ['woff', 'otf', 'svg', 'ttf', 'eot'] });
      bangFont.run(function () {
        assert.file('client/assets/fonts/sushi');
        assert.file('client/styles/fonts.scss');

        setTimeout(function () {
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/sushi/sushi.eot\')');
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/sushi/sushi.woff\') format(\'woff\')');
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/sushi/sushi.otf\') format(\'opentype\')');
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/sushi/sushi.ttf\') format(\'truetype\')');
          assert.fileContent('client/styles/fonts.scss', 'url(\'/assets/fonts/sushi/sushi.svg#sushi\') format(\'svg\')');
          done();
        }, 30);

      });

    });

  });

});
