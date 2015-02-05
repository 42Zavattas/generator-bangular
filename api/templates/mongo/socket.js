'use strict';

var <%= capitalized %> = require('./<%= name %>.model');

exports.register = function (socket) {

  <%= capitalized %>.schema.post('save', function (doc) {
    socket.emit('<%= name %>:save', doc);
  });

  <%= capitalized %>.schema.post('remove', function (doc) {
    socket.emit('<%= name %>:remove', doc);
  });

}
