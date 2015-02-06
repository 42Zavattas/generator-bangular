'use strict';

angular.module('<%= appname %>')
  .controller('HomeCtrl', function (<% if (filters.sockets) { %>Socket<% } %>) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

  });
