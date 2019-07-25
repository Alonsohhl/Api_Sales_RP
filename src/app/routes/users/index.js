// const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
// const Users = mongoose.model('Users');

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user || !user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
  // console.log("TCL: passportUser", passportUser)
  // console.log("TCL: info", info)
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }
    res.json({ Error: info })
  })(req, res, next);
});
module.exports = router;
