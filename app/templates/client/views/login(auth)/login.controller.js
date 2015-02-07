'use strict';

angular.module('<%= appname %>')
  .controller('LoginCtrl', function (Auth, $location) {

    var vm = this;

    angular.extend(vm, {

      name: 'LoginCtrl',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test' },

      /**
       * Login method
       */
      login: function () {
        Auth.login(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });
