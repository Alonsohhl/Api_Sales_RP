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
  const {
    body: { cabecera }
  } = req
  return db.sequelize.transaction((t) => {
    // chain all your queries here. make sure you return them.
    return db.T01FCBO.create(
      {
        Ser_Boleta: '1231',
        Num_Boleta: 'Abraham',
        Cod_Sucur: '1',
        Nom_Usu: 'Abraham',
        Fecha_Boleta: '1990-09-01 00:00:00',
        Nom_Cli: 'Abraham',
        App_Cli: 'Abraham',
        Apm_Cli: 'Abraham',
        Sub_Total: 1,
        IGV: 12,
        Precio_Total: 21
      },
      { transaction: t }
    )
      .then((cabReg) => {
        // await Promise.all(
        cabecera.detalle.forEach((line, indice) => {
          cabecera.detalle[indice].Ser_Boleta = cabReg.Ser_Boleta
          cabecera.detalle[indice].Num_Boleta = cabReg.Num_Boleta
          cabecera.detalle[indice].T01FCBOId = cabReg.id
        })
        return db.T01FCBODET.bulkCreate(cabecera.detalle, { transaction: t })
      })
      .then((result) => {
        res.json({ status: 'Factura Ingresada' })
      })
      .catch((err) => {
        res.status(400).send({ error: 'registro NO valido ' + err })
      })
  })
})

module.exports = router
