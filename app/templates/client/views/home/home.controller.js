'use strict';

angular.module('<%= appname %>')
  .controller('HomeCtrl', function () {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

  });
