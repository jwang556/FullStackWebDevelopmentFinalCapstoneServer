var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LoginUser = require('./models/LoginUser');
var config = require('./config');

exports.local = passport.use(new LocalStrategy(LoginUser.authenticate()));
passport.serializeUser(LoginUser.serializeUser());
passport.deserializeUser(LoginUser.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('facebook');
    LoginUser.findOne({ OauthId: profile.id }, function(err, loginUser) {
      console.log('login-attempted');
      if(err) {
        console.log(err); // handle errors!
      }
      if (!err && loginUser !== null) {
        done(null, loginUser);
      } else {
        loginUser = new LoginUser({
          username: profile.displayName
        });
        loginUser.OauthId = profile.id;
        loginUser.OauthToken = accessToken;
        loginUser.save(function(err) {
          if(err) {
            console.log(err); // handle errors!
          } else {
            console.log("saving user ...");
            done(null, loginUser);
          }
        });
      }
    });
    //console.log('login-attempted');
    //done(null, user);
  }
));