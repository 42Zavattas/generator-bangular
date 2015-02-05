'use strict';

var config = require('./environment');

module.exports = function (io) {

  io.on('connection', function (socket) {

    socket.connectDate = new Date();
    socket.ip = (socket.handshake.address) ? socket.handshake.address : null;

    // sockets inserts

    socket.on('disconnect', function () {
      console.log('[%d] %s disconnected.', new Date(), socket.ip);
    });

    console.log('[%d] %s connected.', socket.connectDate, socket.ip);

  });

};
