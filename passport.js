const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Models = require("./models");
const Utils = require("./utils");

const verifyCallback = (username, password, done) => {
  Models.User.findOne({ username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = Utils.validatePassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      done(err);
    });
};

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Models.User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
