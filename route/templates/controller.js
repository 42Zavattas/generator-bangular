'use strict';

angular.module('<%= _.camelize(appname) %>')
  .controller('<%= _.capitalize(_.camelize(name)) %>Ctrl', function () {

    console.log('ready !');

  });
