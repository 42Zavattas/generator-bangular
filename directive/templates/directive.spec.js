'use strict';

describe('Directive: <%= dashName %>', function () {

  beforeEach(module('<%= appname %>', 'templates'));

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = angular.element('<<%= dashName %>></<%= dashName %>>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });
});
