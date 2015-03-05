'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(module('<%= appname %>'));

  var LoginCtrl,
    $httpBackend,
    $location;

  beforeEach(inject(function ($controller, _$httpBackend_, _$location_) {
    LoginCtrl = $controller('LoginCtrl', {});
    $httpBackend = _$httpBackend_;
    $location = _$location_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should redirect to / after successful login', function () {
    LoginCtrl.login({ email: 'test@test.com', password: 'test' });
    $httpBackend.expectPOST('/auth/local')
      .respond({ token: 'token' });
    $httpBackend.flush();
    expect($location.path()).toBe('/');
  });

});
