'use strict';

describe('Controller: <%= controllerName %>', function () {

  beforeEach(module('<%= appname %>'));

  var <%= controllerName %>;

  beforeEach(inject(function ($controller) {
    <%= controllerName %> = $controller('<%= controllerName %>', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
