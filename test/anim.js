'use strict';

var path = require('path');
var os = require('os');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching anim tests', function () {

  var bangular, bangAnim, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './tmp'))
        .withOptions({ skipInstall: true })
        .withPrompt({
          name: 'Test',
          backend: 'restock',
          modules: [],
          sockets: false,
          auth: false
        })
        .on('end', done);

    });

    it('should run the anim subgenerator with all options', function (done) {
      bangAnim = helpers.createGenerator('bangular:anim', [bangDir + '/anim'], 'drop');
      helpers.mockPrompt(bangAnim, { events: ['all'] });
      bangAnim.run(function () {
        assert.file('client/animations/drop.js');
        ['enter', 'leave', 'move', 'addClass', 'removeClass'].forEach(function (e) {
          assert.fileContent('client/animations/drop.js', e);
        });
        done();
      });
    });

    it('should run the anim subgenerator with one option', function (done) {
      bangAnim = helpers.createGenerator('bangular:anim', [bangDir + '/anim'], 'shadow');
      helpers.mockPrompt(bangAnim, { events: ['removeClass'] });
      bangAnim.run(function () {
        assert.file('client/animations/shadow.js');
        assert.fileContent('client/animations/shadow.js', 'removeClass');
        done();
      });
    });

    it('should run the anim subgenerator with three separate options', function (done) {
      bangAnim = helpers.createGenerator('bangular:anim', [bangDir + '/anim'], 'codrop');
      helpers.mockPrompt(bangAnim, { events: ['enter', 'move', 'addClass'] });
      bangAnim.run(function () {
        assert.file('client/animations/codrop.js');
        ['enter', 'move', 'addClass'].forEach(function (e) {
          assert.fileContent('client/animations/codrop.js', e);
        });
        done();
      });
    });

  });

});
