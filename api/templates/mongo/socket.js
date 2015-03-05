'use strict';

var <%= objectName %> = require('./<%= fileName %>.model');

exports.register = function (socket) {

  <%= objectName %>.schema.post('save', function (doc) {
    socket.emit('<%= objectName %>:save', doc);
  });

  <%= objectName %>.schema.post('remove', function (doc) {
    socket.emit('<%= objectName %>:remove', doc);
  });

};
