'use strict';

describe('Controller: <%= _.capitalize(_.camelize(name)) %>Ctrl', function () {

  beforeEach(module('<%= _.camelize(appname) %>'));

  var MainCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('<%= controllerName %>', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
