// const mongoose = require('mongoose');
const passport = require('passport')
const router = require('express').Router()
const auth = require('../auth')
var db = require('../../db')
const Sequelize = require('sequelize')
const op = Sequelize.Op
// const Users = mongoose.model('Users');

// POST login route (optional, everyone has access)
// TODO Agregar JWT key y validar
router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    console.log(info)
    if (err) {
      console.log(err)
      // res.status(500).send(err)
      res.status(400).send(err)
    }
    if (info != undefined) {
      res.status(400).send(info)
    } else {
      req.logIn(user, (err) => {
        db.t01fefm
          .findOne({
            where: {
              Nom_Usu: user.Nom_Usu
            }
          })
          .then((userPassport) => {
            // const token = jwt.sign({ id: user.username }, jwtSecret.secret)
            // const user = userPassport
            // user.token = passportUser.generateJWT()

            //       return res.json({ user: user.toAuthJSON() })

            // res.status(200).send({
            //   user: {
            //     auth: true,
            //     token: userPassport.generateJWT(),
            //     message: 'user found & logged in',
            //     id: userPassport,
            //     name: response.data.user.user,
            //   }
            // })
            res.status(200).send({
              user: userPassport.toAuthJSON()
            })
          })
      })
    }
  })(req, res, next)

  // const {
  //   body: { user }
  // } = req

  // if (!user || !user.Nom_Usu) {
  //   return res.status(422).json({
  //     errors: {
  //       email: 'is required'
  //     }
  //   })
  // }

  // if (!user.Pass_Usu) {
  //   return res.status(422).json({
  //     errors: {
  //       password: 'is required'
  //     }
  //   })
  // }
  // return passport.authenticate(
  //   'login',
  //   { session: false },
  //   (err, passportUser, info) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     if (info != undefined) {
  //       console.log(info.message)
  //       return next(info.message)
  //     }
  //     if (passportUser) {
  //       const user = passportUser
  //       user.token = passportUser.generateJWT()
  //       return res.json({ user: user.toAuthJSON() })
  //     }
  //     res.status(400).json({ Error: info })
  //   }
  // )(req, res, next)
})

router.post('/register', auth.optional, (req, res) => {
  const {
    body: { user }
  } = req
  db.t01fefm
    .create({
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
    })
    .then(function() {
      // res.redirect(307, '/api/login');
      res.json({ status: 'User Insert' })
      res.end()
    })
    .catch(function(err) {
      if (err.errors[0].message) {
        return res.status(422).json({ error: err.errors[0].message })
      }
      console.log(err)
      res.json(err)
    })
})

// Get the user of a provided token, if valid
router.get('/session', auth.required, (req, res) => {
  console.dir(auth)
  return res.sendStatus(200)
  // const { payload: { id } } = req;
  // console.log("TCL: id", id)

  // return db.t01fefm.findByPk(id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.sendStatus(400);
  //     }

  //     return res.json({ user: user.toAuthJSON() });
  //   });
})

router.get('/current', auth.required, (req, res) => {
  const {
    payload: { id }
  } = req

  return db.t01fefm.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400)
    }

    return res.json({ user: user.toAuthJSON() })
  })
})

router.get('/find', auth.optional, (req, res) => {
  const queryID = req.query.id ? req.query.id : null
  const queryCOD = req.query.Cod_EmpFar
    ? req.query.Cod_EmpFar
    : req.query.id
    ? null
    : ''
  const queryLimit =
    req.query.queryLimit && req.query.queryLimit < 1000
      ? req.query.queryLimit
      : 10

  db.t01fefm
    .findAll({
      limit: queryLimit,
      attributes: { exclude: ['createdAt', 'updatedAt', 'Pass_Usu'] },
      where: {
        [op.and]: [
          { Estado: 'ACTIVO' },
          {
            [op.or]: [
              {
                id: queryID
              },
              {
                Cod_EmpFar: {
                  [op.substring]: queryCOD
                }
              }
            ]
          }
        ]
      }
    })
    .then(function(data) {
      res.json(data)
    })
    .catch(function(err) {
      res.json(err)
    })
})

router.post('/delete', auth.optional, (req, res) => {
  const queryID = req.query.id ? req.query.id : null

  db.t01fefm
    .update(
      { Estado: 'ELIMINADO' },
      {
        where: {
          id: queryID
        }
      }
    )
    .then((x) => {
      if (x < 1) {
        res.status(400).send({ error: 'registro NO valido ' })
      } else {
        console.log(x)
        res.json({ status: 'Usuario Eliminado' })
      }
    })
})

module.exports = router
