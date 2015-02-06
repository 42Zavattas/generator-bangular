'use strict';

angular.module('<%= appname %>')
  .factory('Socket', function (socketFactory) {

    var ioSocket = io('', {
      path: '/socket.io'
      //, query: 'token=toto'
      // TODO implement with passport and socket jwt
    });

    var socket = socketFactory({ ioSocket: ioSocket });

    function idMap (items) {
      return items.map(function (e) { return e._id; });
    }

    return {
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
        })

      },
      unsyncModel: function (model) {
        socket.removeAllListeners(model + ':save');
        socket.removeAllListeners(model + ':remove');
      }
    };

  });
