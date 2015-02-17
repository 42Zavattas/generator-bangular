'use strict';

angular.module('<%= appname %>')
  .factory('<%= objectName %>', function ($resource) {
    return $resource('/api/<%= routeName %>/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
