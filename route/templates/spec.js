'use strict';

describe('Controller: <%= controllerName %>', function () {

  beforeEach(module('<%= _.camelize(appname) %>'));

  var <%= controllerName %>,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= controllerName %> = $controller('<%= controllerName %>', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
