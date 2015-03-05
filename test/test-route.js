'use strict';

var path = require('path');
var os = require('os');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Launching route tests', function () {

  var bangular, bangRoute, tmpDir;
  var bangDir = process.cwd();

  describe('', function () {

    before(function (done) {

      tmpDir = path.join(os.tmpdir(), '/tmp');

      helpers.testDirectory(tmpDir, function (err) {
        if (err) { done(err); }

        bangular = helpers.createGenerator('bangular:app',
            [path.join(bangDir, '/app')],
        false, { 'skipInstall': true, 'skipLog': true });

        helpers.mockPrompt(bangular, { name: 'Test', backend: 'restock', modules: [] });
        bangular.run(done);

      });

    });

    it('should run the route sub generator', function (done) {

      bangRoute = helpers.createGenerator('bangular:route', [bangDir + '/route'], 'contact');
      helpers.mockPrompt(bangRoute, { route: '/contact' });
      bangRoute.run(function () {

        assert.file('client/views/contact/contact.js');
        assert.file('client/views/contact/contact.controller.js');
        assert.file('client/views/contact/contact.spec.js');
        assert.file('client/views/contact/contact.html');
        assert.file('client/views/contact/contact.e2e.js');

        assert.fileContent('client/views/contact/contact.controller.js', 'ContactCtrl');
        assert.fileContent('client/views/contact/contact.spec.js', '$controller(\'ContactCtrl\'');
        assert.fileContent('client/views/contact/contact.js', '.when(\'/contact\',');

        done();
      });

    });

    it('should create a route with style', function (done) {

      bangRoute = helpers.createGenerator('bangular:route', [bangDir + '/route'], 'yolo');
      helpers.mockPrompt(bangRoute, { route: '/yolo', import: true });
      bangRoute.run(function () {

        assert.file('client/views/yolo/yolo.js');
        assert.file('client/views/yolo/yolo.scss');
        assert.file('client/views/yolo/yolo.controller.js');
        assert.file('client/views/yolo/yolo.spec.js');
        assert.file('client/views/yolo/yolo.e2e.js');
        assert.file('client/views/yolo/yolo.html');

        assert.fileContent('client/views/yolo/yolo.controller.js', 'YoloCtrl');
        assert.fileContent('client/views/yolo/yolo.spec.js', '$controller(\'YoloCtrl\'');
        assert.fileContent('client/views/yolo/yolo.js', '.when(\'/yolo\',');

        done();
      });

    });

  });

});
