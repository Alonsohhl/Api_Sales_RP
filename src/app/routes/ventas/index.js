// const mongoose = require('mongoose');
const passport = require('passport')
const router = require('express').Router()
const auth = require('../auth')
var db = require('../../db')
const Sequelize = require('sequelize')
// const Users = mongoose.model('Users');

// POST login route (optional, everyone has access)
// TODO Agregar JWT key y validar
router.post('/setVenta', auth.optional, (req, res, next) => {
  return db.sequelize
    .transaction((t) => {
      // chain all your queries here. make sure you return them.
      return db.T01FCBO.create(
        {
          Ser_Boleta: '1231',
          Num_Boleta: 'Abraham',
          Cod_Sucur: 'Abraham',

          Nom_Usu: 'Abraham',
          Fecha_Boleta: 'Abraham',
          Nom_Cli: 'Abraham',
          App_Cli: 'Abraham',
          Apm_Cli: 'Abraham',
          Sub_Total: 'Abraham',
          IGV: 12,
          Precio_Total: 21
        },
        { transaction: t }
      ).then((user) => {
        console.log('TCL: user', user)
        return
        // user.setShooter({
        //   firstName: 'John',
        //   lastName: 'Boothe'
        // }, {transaction: t});
      })
    })
    .then((result) => {
      console.log('TCL: result')
      // Transaction has been committed
      // result is whatever the result of the promise chain returned to the transaction callback
    })
    .catch((err) => {
      console.log('TCL: result ERROR+' + err)
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    })
})

module.exports = router
