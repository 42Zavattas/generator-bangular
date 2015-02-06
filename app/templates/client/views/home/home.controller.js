'use strict';

angular.module('<%= appname %>')
  .controller('HomeCtrl', function (<% if (filters.socket) { %>Socket<% } %>) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

  });
