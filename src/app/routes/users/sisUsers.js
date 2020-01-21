// const passport = require('passport');
const router = require('express').Router()
const auth = require('../auth')
var db = require('../../db')
const Sequelize = require('sequelize')
const op = Sequelize.Op
const passport = require('passport')

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
