'use strict';

describe('signup route', function () {

  beforeEach(function () {
    browser.get('/signup');
  });

  it('should have two signup inputs', function (done) {
    element.all(by.css('input')).then(function (inputs) {
      expect(inputs.length).toBe(2);
      done();
    });
  });

});
