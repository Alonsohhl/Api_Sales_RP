const jwt = require('express-jwt')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
var db = require('../db')
const passport = require('passport')
require('passport')

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization }
  } = req

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }
  return null
}

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  }),
  protected: passport.authenticate('jwt', { session: false })
}

// const valid = new JWTStrategy({
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'secret'
// },
// function (jwtPayload, cb) {
//   // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//   return db.t01fefm.findByPk(jwtPayload.id)
//     .catch(err => {
//       return cb(err);
//     });
// }
// )

// module.exports = { auth, valid };
module.exports = auth
