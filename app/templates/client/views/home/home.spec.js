/*global describe, beforeEach, it, inject, expect*/
'use strict';

describe('HomeCtrl', function () {

  beforeEach(module('<%= _.slugify(appname) %>'));

  var HomeCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
