'use strict';

var _ = require('lodash');
var express = require('express');
var passport = require('passport');

var auth = require('../auth.service');

var router = express.Router();

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) { return res.status(401).json(error); }
    if (!user) { return res.status(401).json({ msg: 'login failed' }); }
    res.json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: auth.signToken(user._id)
    });
  })(req, res, next);
});

module.exports = router;
