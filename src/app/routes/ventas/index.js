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
        Ser_Boleta: cabecera.Ser_Boleta,
        Num_Boleta: cabecera.Num_Boleta,
        Cod_Sucur: cabecera.Cod_Sucur,
        id_Usuario: cabecera.id_Usuario,
        id_Cliente: cabecera.id_Cliente,
        Fecha_Boleta: cabecera.Fecha_Boleta,
        Fecha_Venc_Boleta: cabecera.Fecha_Venc_Boleta,
        Sub_Total: cabecera.Sub_Total,
        IGV: 18,
        Precio_Total: cabecera.Precio_Total
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
        res.status(400).send({ error: 'registro No valido ' + err })
      })
  })
})

module.exports = router
