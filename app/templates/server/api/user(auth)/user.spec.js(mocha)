'use strict';

require('should');

var server = require('../../server');
var request = require('supertest');

describe('GET /api/users/me', function () {

  it('should respond with a unauthorized error', function (done) {
    request(server)
      .get('/api/users/me')
      .expect(401)
      .expect('Content-Type', /html/)
      .end(function (err, res) {
        if (err) { return done(err); }
        res.text.should.containEql('UnauthorizedError');
        done();
      });
  });

});
