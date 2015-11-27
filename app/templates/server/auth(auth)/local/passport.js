'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../../api/user/user.model');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    User.findOne({
      email: email
    }, '+passwordHash +salt', function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { msg: 'email not found' }); }
      if (!user.authenticate(password)) {
        return done(null, false, { msg: 'incorrect password' });
      }
      done(null, user);
    });
  }
));
