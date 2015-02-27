describe('home page', function () {

  describe('basic', function () {
    browser.get('/');

    it('should have a basic content', function () {
      expect(element.all(by.css('div')).first().getText()).toBe('HomeCtrl');
    });
  });

});
