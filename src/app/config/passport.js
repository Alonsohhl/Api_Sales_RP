// const mongoose = require('mongoose');
const passport = require('passport')
ExtractJWT = require('passport-jwt').ExtractJwt
JWTstrategy = require('passport-jwt').Strategy
var LocalStrategy = require('passport-local').Strategy
var db = require('../db')
const { JWT_SECRET } = require('../config')

// Telling passport we want to use a Local Strategy. In other words,
// we want login with a username/email and password

// module.exports = function (passport)

passport.use(
  'login',
  new LocalStrategy(
    // nuestro usuario usara valores propios para el login
    {
      usernameField: 'user[Nom_Usu]',
      passwordField: 'user[Pass_Usu]',
      session: false
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
              message: 'Usuario Incorrecto'
            })
          } else if (!dbUser.validPassword(password)) {
            // If there is a user with the given email, but the password the user gives us is incorrect
            return done(null, false, {
              message: 'Password Incorrecto'
            })
          }
          // Usuario correcto encontrado
          return done(null, dbUser)
        })
        .catch(done)
    }
  )
)

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: JWT_SECRET
}

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id
        }
      }).then((user) => {
        if (user) {
          console.log('user found in db in passport')
          // note the return removed with passport JWT - add this return for passport local
          done(null, user)
        } else {
          console.log('user not found in db')
          done(null, false)
        }
      })
    } catch (err) {
      done(err)
    }
  })
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
