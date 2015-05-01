'use strict';

angular.module('<%= appname %>')
  .service('Auth', function ($rootScope, $cookieStore, $q, $http) {

    var _user = {};
    var _ready = $q.defer();

    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          _user = res.data;
        })
        .finally(function (err) {
          _ready.resolve();
        });
    } else {
      _ready.resolve();
    }

    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    this.signup = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users', user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Login
     *
     * @param user
     * @returns {promise}
     */
    this.login = function (user) {
      var deferred = $q.defer();
      $http.post('/auth/local', user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    /**
     * Logout
     */
    this.logout = function () {
      $cookieStore.remove('token');
      _user = {};
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    this.isLogged = function () {
      return _user.hasOwnProperty('_id');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    this.isReadyLogged = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
        if (_user.hasOwnProperty('_id')) {
          def.resolve();
        } else {
          def.reject();
        }
      });
      return def.promise;
    };

    /**
     * Returns the user
     *
     * @returns {object}
     */
    this.getUser = function () {
      return _user;
    };

  });
