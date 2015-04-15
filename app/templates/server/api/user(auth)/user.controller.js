'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var User = require('./user.model');

function handleError (res, err) {
  return res.status(500).send(err);
}
<% if (!filters.apidoc) { %>
/**
 * Creates a new user in the DB.
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {post} /users Create a new user
 * @apiVersion 0.1.0
 * @apiName CreateUser
 * @apiDescription Create a new user in the database.
 * @apiGroup User
 *
 * @apiParam {String} email user's email.
 *
 */<% } %>
exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    var token = jwt.sign(
      { _id: user._id },
      config.secrets.session,
      { expiresInMinutes: 60 * 5 }
    );
    res.status(201).json({ token: token, user: user });
  });
};
<% if (!filters.apidoc) { %>
/**
 * Return the current logged user.
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {get} /users/me Get the logged user
 * @apiVersion 0.1.0
 * @apiName GetMe
 * @apiDescription Return the user matching the authenticated user.
 * @apiGroup User
 *
 */<% } %>
exports.getMe = function (req, res) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -passwordHash', function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.json(401); }
    res.status(200).json(user);
  });
};
