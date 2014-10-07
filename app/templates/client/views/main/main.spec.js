'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('<%= _.slugify(appname) %>'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be obvious', function () {
    expect(4).toBe(4);
  });

});
