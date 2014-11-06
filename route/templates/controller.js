'use strict';

angular.module('<%= appName %>')
  .controller('<%= controllerName %>', function () {

    var vm = this;

    angular.extend(vm, {
      name: '<%= controllerName %>'
    });

  });
