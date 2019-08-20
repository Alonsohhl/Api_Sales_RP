// const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
var db = require('../../db');

// const Users = mongoose.model('Users');

// POST login route (optional, everyone has access)
// TODO Agregar JWT key y validar
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user || !user.Nom_Usu) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if (!user.Pass_Usu) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }
    res.status(400).json({ Error: info })
  })(req, res, next);
});

router.post('/register', auth.optional, (req, res) => {
  const { body: { user } } = req;
  db.t01fefm.create({
    Cod_EmpFar: user.Cod_EmpFar,
    Nom_EmpFar: user.Nom_EmpFar,
    App_EmpFar: user.App_EmpFar,
    Apm_EmpFar: user.Apm_EmpFar,
    Dir_EmpFar: user.Dir_EmpFar,
    Correo_EmpFar: user.Correo_EmpFar,
    Dni_EmpFar: user.Dni_EmpFar,
    Nom_Usu: user.Nom_Usu,
    Pass_Usu: user.Pass_Usu,
    Estado: user.Estado
  }).then(function () {
    // res.redirect(307, '/api/login');
    res.json({ status: 'User Insert' });
    res.end();
  }).catch(function (err) {
    if (err.errors[0].message) {
      return res.status(422).json({ error: err.errors[0].message });
    }
    console.log(err);
    res.json(err);
  });
});

// Get the user of a provided token, if valid
router.get('/session', auth.required, (req, res) => {
  console.dir(auth)
  return res.sendStatus(200);
  // const { payload: { id } } = req;
  // console.log("TCL: id", id)

  // return db.t01fefm.findByPk(id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.sendStatus(400);
  //     }

  //     return res.json({ user: user.toAuthJSON() });
  //   });
});

router.get('/current', auth.required, (req, res) => {
  const { payload: { id } } = req;

  return db.t01fefm.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
