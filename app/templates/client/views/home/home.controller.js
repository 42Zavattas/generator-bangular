'use strict';

angular.module('<%= _.slugify(appname) %>')
  .controller('HomeCtrl', function () {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

  });
