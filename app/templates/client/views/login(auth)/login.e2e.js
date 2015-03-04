'use strict';

describe('login page', function () {

  describe('basic', function () {
    browser.get('/login');

    it('should have two login inputs', function (done) {
      element.all(by.css('input')).then(function (inputs) {
        expect(inputs.length).toBe(2);
        done();
      });
    });
  });

});
