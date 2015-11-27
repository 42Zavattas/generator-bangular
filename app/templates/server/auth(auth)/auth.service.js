'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');

var config = require('../config/environment');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attach the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = function () {

  return compose()
    .use(validateJwt)
    .use(function (req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) { return next(err); }
        if (!user) { return res.send(401); }
        req.user = user;
        next();
      });
    });

};

/**
 * Returns a jwt token, signed by the app secret
 */
exports.signToken = function (id) {

  return jwt.sign(
    { _id: id },
    config.secrets.session,
    { expiresIn: 60 * 60 * 5 }
  );

};
