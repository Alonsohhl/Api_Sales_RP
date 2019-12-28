// const mongoose = require('mongoose');
const passport = require('passport')
// const LocalStrategy = require('passport-local');
var LocalStrategy = require('passport-local').Strategy
// We will need the models folder to check passport agains
var db = require('../db')

// Telling passport we want to use a Local Strategy. In other words,
// we want login with a username/email and password

// module.exports = function (passport)

passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      // usernameField: 'email'
      usernameField: 'user[Nom_Usu]',
      passwordField: 'user[Pass_Usu]'
    },
    function(usuario, password, done) {
      db.t01fefm
        .findOne({
          where: {
            Nom_Usu: usuario
          }
        })
        .then(function(dbUser) {
          // If there's no user with the given email
          if (!dbUser) {
            return done(null, false, {
              message: 'Usuario Incorrecto.'
            })
          } else if (!dbUser.validPassword(password)) {
            // If there is a user with the given email, but the password the user gives us is incorrect
            return done(null, false, {
              message: 'Password Incorrecto'
            })
          }
          // If none of the above, return the user
          return done(null, dbUser)
        })
        .catch(done)
    }
  )
)

//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });
// //
// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });
// //
// Exporting our configured passport
passport.serializeUser(function(user, cb) {
  cb(null, user)
})
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})
//
module.exports = passport
