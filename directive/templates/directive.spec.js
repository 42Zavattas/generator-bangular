'use strict';

describe('Directive: <%= camelName %>', function () {

  beforeEach(module('<%= _.camelize(appname) %>', 'templates'));

  var element, scope;

  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    element = angular.element('<<%= dashedName %>></<%= dashedName %>>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', inject(function ($compile) {
    expect(1).toBe(1);
  }));
});
