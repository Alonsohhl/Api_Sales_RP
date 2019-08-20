// const jwt = require('express-jwt');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var db = require('../db');

const valid = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
},
function (jwtPayload, cb) {
  // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return db.t01fefm.findByPk(jwtPayload.id)
    .catch(err => {
      return cb(err);
    });
}
)

// module.exports = { auth, valid };
module.exports = valid;
