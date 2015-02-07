'use strict';

angular.module('<%= appname %>')
  .controller('SignupCtrl', function (Auth, $location) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      /**
       * User credentials
       */
      user: { email: 'test@test.com', password: 'test' },

      /**
       * Signup
       */
      signup: function () {
        Auth.signup(vm.user)
          .then(function () {
            $location.path('/');
          })
          .catch(function (err) {
            vm.error = err;
          });
      }

    });

  });
