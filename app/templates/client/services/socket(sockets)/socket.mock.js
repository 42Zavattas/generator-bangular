'use strict';

angular.module('<%= appname %>')
  .factory('Socket', function () {

    return {
      socket: {
        connect: angular.noop,
        on: angular.noop,
        emit: angular.noop,
        receive: angular.noop
      },
      emit: angular.noop,
      on: angular.noop,
      clean: angular.noop,
      syncModel: angular.noop,
      unsyncModel: angular.noop
    };

  });
