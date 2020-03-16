// const passport = require('passport');
const router = require('express').Router()
const auth = require('../auth')
var db = require('../../db')
const Sequelize = require('sequelize')
const op = Sequelize.Op
const passport = require('passport')

router.post('/insert', auth.optional, (req, res) => {
  const {
    body: { cliente }
  } = req
  db.t01fcli
    .create({
      Dni_Cli: cliente.Dni_Cli,
      Nom_Cli: cliente.Nom_Cli,
      App_Cli: cliente.App_Cli,
      Apm_Cli: cliente.Apm_Cli,
      Correo_Cli: cliente.Correo_Cli,
      Sexo_Cli: cliente.Sexo_Cli
    })
    .then(function() {
      res.status(200).send({ status: 'Cliente Ingresado' })
      res.end()
    })
    .catch(function(err) {
      res.status(400).send({ error: err })
    })
})

router.post('/update', auth.optional, (req, res) => {
  const {
    body: { cliente }
  } = req
  console.log('TCL: cliente', cliente)
  !cliente.id ? (cliente.id = null) : null
  db.t01fcli
    .findOrCreate({
      where: { id: cliente.id },
      defaults: {
        Dni_Cli: cliente.Dni_Cli,
        Nom_Cli: cliente.Nom_Cli,
        App_Cli: cliente.App_Cli,
        Apm_Cli: cliente.Apm_Cli,
        Correo_Cli: cliente.Correo_Cli,
        Sexo_Cli: cliente.Sexo_Cli
      }
    })

    .then(([user, created]) => {
      if (created) {
        // created will be true if a new user was created
        res.status(200).send({ msg: 'Cliente creado' })
      }
      return user
        .update({
          id: cliente.id,
          Dni_Cli: cliente.Dni_Cli,
          Nom_Cli: cliente.Nom_Cli,
          App_Cli: cliente.App_Cli,
          Apm_Cli: cliente.Apm_Cli,
          Correo_Cli: cliente.Correo_Cli,
          Sexo_Cli: cliente.Sexo_Cli
        })
        .then(() => {
          res.status(200).send({ msg: 'Cliente actualizado' })
        })

      console.log('TCL: status')
    })
    .catch(function(err) {
      console.log('TCL: err', err)
      res.status(400).send({ error: err })
      console.log('TCL: status')
    })

  // ({
  //   Dni_Cli: cliente.Dni_Cli,
  //   Nom_Cli: cliente.Nom_Cli,
  //   App_Cli: cliente.App_Cli,
  //   Apm_Cli: cliente.Apm_Cli,
  //   Correo_Cli: cliente.Correo_Cli,
  //   Sexo_Cli: cliente.Sexo_Cli
  // })
  // .then(function() {
  //   res.status(200).send({ status: 'Cliente Ingresado' })
  //   res.end()
  // })
  // .catch(function(err) {
  //   res.status(400).send({ error: err })
  // })
})

router.post('/insertCategory', auth.optional, (req, res) => {
  const {
    body: { categoria }
  } = req
  db.T01FCAT.create({
    Cod_Cat: categoria.Cod_Cat,
    Desc_Cat: categoria.Desc_Cat
  })
    .then(function() {
      res.json({ status: 'Categoria Ingresada' })
      res.end()
    })
    .catch(function(err) {
      res.status(400).send({ error: err })
    })
})

router.post('/updateCategory', auth.optional, (req, res) => {
  const {
    body: { category }
  } = req
  // res.json({ status: 'Categoria No Actualizada' });
  db.T01FCAT.update(
    { Desc_Cat: category.Desc_Cat },
    {
      where: {
        id: category.id
      }
    }
  ).then((x) => {
    if (x < 1) {
      res.status(400).send({ error: 'registro NO valido ' })
    } else {
      console.log(x)
      res.json({ status: 'Categoria Actualizada' })
    }
  })
})
router.post('/deleteCategory', auth.optional, (req, res) => {
  const {
    body: { category }
  } = req

  db.T01FCAT.update(
    { activo: false },
    {
      where: {
        id: category.id
      }
    }
  ).then((x) => {
    if (x < 1) {
      res.status(400).send({ error: 'registro NO valido ' })
    } else {
      console.log(x)
      res.json({ status: 'Categoria Eliminada' })
    }
  })
})

router.get('/getall/:limit?/:razSoc?', auth.optional, (req, res) => {
  var varLike = ''
  if (req.params.razSoc) {
    varLike = req.params.razSoc
  }
  var limit = 10
  if (req.params.limit) {
    limit = parseInt(req.params.limit)
  }
  db.T01FMED.findAll({
    limit: limit,
    where: {
      Nom_Medi: {
        [op.substring]: varLike
      }
    }
  })
    .then(function(data) {
      res.json(data)
      // res.end();
    })
    .catch(function(err) {
      // if (err.errors[0].message) {
      //   res.status(422).json({ error: err.errors[0].message });
      // }
      res.json(err)
      // return res.end();
    })
})
router.get('/getProdByCodOrDesc/:razSocOrId?/', auth.optional, (req, res) => {
  db.T01FMED.findAll({
    limit: 10,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      [op.or]: [
        {
          Nom_Medi: {
            [op.substring]: req.params.razSocOrId
          }
        },
        {
          id: {
            [op.substring]: req.params.razSocOrId
          }
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

router.get('/getcat/:limit', auth.optional, (req, res) => {
  db.T01FCAT.findAll({
    limit: 10,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      activo: true
    }
  })
    .then(function(data) {
      res.json(data)
    })
    .catch(function(err) {
      res.json(err)
    })
})

router.get('/getproveedores/', auth.optional, (req, res) => {
  var data = req.query
  var varLike = '&'
  if (data.razSoc) {
    varLike = data.razSoc + '%'
  }

  console.log('TCL: where')
  db.T01FPRO.findAll({
    limit: 10,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      RazonSoc_Prov: {
        [op.like]: varLike
      }
    }
  })
    .then(function(data) {
      res.json(data)
    })
    .catch(function(err) {
      // if (err.errors[0].message) {
      //   res.status(422).json({ error: err.errors[0].message });
      // }
      res.json(err)
      // return res.end();
    })
})

router.get('/current', auth.required, (req, res) => {
  // const { payload: { id } } = req;
  // return db.t01fefm.findById(id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.sendStatus(400);
  //     }
  //     return res.json({ user: user.toAuthJSON() });
  //   });
})
router.get('/find', auth.optional, (req, res) => {
  const queryID = req.query.id ? req.query.id : null
  // const queryDNI = req.query.Dni_Cli ? req.query.Dni_Cli : null
  // console.log('queryDNI', queryDNI)
  const queryDNI = req.query.id
    ? null
    : req.query.Dni_Cli
    ? req.query.Dni_Cli
    : ''

  // const queryDNI = req.query.Dni_Cli
  //   ? req.query.Dni_Cli
  //   : req.query.id
  //   ? null
  //   : ''

  db.t01fcli
    .findAll({
      limit: 10,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: {
        [op.or]: [
          {
            id: queryID
          },
          {
            Dni_Cli: {
              [op.substring]: queryDNI
            }
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
module.exports = router
