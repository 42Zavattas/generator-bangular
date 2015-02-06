'use strict';

angular.module('<%= appname %>')
  .factory('Socket', function (socketFactory) {

    var socketConnect = io('', {
      path: 'socket.io'
    });

    var socket = socketFactory({ socketConnect: socketConnect });

    socket.on('User:update', function (doc) {
      console.log(doc);
    });

    socket.on('User:remove', function (doc) {
      console.log(doc);
    });

  });
