'use strict';

require('should');

var server = require('../../server');
var request = require('supertest');

var Thing = require('./thing.model');

describe('GET /api/things', function () {

  beforeEach(function (done) {
    Thing.remove({}, function () { done(); });
  });

  it('should respond with JSON array', function (done) {
    request(server)
      .get('/api/things')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { return done(err); }
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
