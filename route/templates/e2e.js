'use strict';

describe('<%= dashName %> route', function () {

  beforeEach(function () {
    browser.get('<%= route %>');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('<%= controllerName %>');
  });

});
