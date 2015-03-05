'use strict';

angular.module('<%= appname %>')
  .factory('Socket', function (socketFactory) {

    var ioSocket = io('', {
      path: '/socket.io'
    });

    var subs = [];

    var socket = socketFactory({ ioSocket: ioSocket });

    function idMap (items) {
      return items.map(function (e) { return e._id; });
    }

    return {

      /**
       * Simply emit a socket
       */
      emit: socket.emit,

      /**
       * Listen for an event in the callback
       */
      on: function (pattern, cb) {
        subs.push(pattern);
        socket.on(pattern, cb);
      },

      /**
       * Remove all subscriptions that occured with the on method,
       * call it on the $destroy event.
       */
      clean: function () {
        subs.forEach(function (sub) {
          socket.removeAllListeners(sub);
        });
        subs = [];
      },

      /**
       * Add a sync for a given model
       */
      syncModel: function (model, items) {

        socket.on(model + ':save', function (doc) {
          var index = idMap(items).indexOf(doc._id);
          if (index === -1) {
            items.push(doc);
          } else {
            items.splice(index, 1, doc);
          }
        });

        socket.on(model + ':remove', function (doc) {
          var index = idMap(items).indexOf(doc._id);
          if (index !== -1) {
            items.splice(index, 1);
          }
        });

      },

      /**
       * Remove listeners for a model
       */
      unsyncModel: function (model) {
        socket.removeAllListeners(model + ':save');
        socket.removeAllListeners(model + ':remove');
      }
    };

  });
