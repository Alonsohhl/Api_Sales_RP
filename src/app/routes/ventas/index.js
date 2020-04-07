// const mongoose = require('mongoose');
const passport = require('passport')
const router = require('express').Router()
const auth = require('../auth')
var db = require('../../db')
const Sequelize = require('sequelize')
const op = Sequelize.Op
var { getFacNum } = require('./ventasHelper')
// const Users = mongoose.model('Users');

// POST login route (optional, everyone has access)
// TODO Agregar JWT key y validar
router.post('/setVenta', auth.optional, (req, res, next) => {
  const {
    body: { cabecera }
  } = req
  return db.sequelize.transaction((t) => {
    return getFacNum(cabecera.Ser_Boleta).then((num) => {
      return db.T01FCBO.create(
        {
          Ser_Boleta: cabecera.Ser_Boleta,
          Num_Boleta: num,
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
          cabecera.detalle.forEach((line, indice) => {
            cabecera.detalle[indice].Ser_Boleta = cabReg.Ser_Boleta
            cabecera.detalle[indice].Num_Boleta = cabReg.Num_Boleta
            cabecera.detalle[indice].T01FCBOId = cabReg.id
          })
          return {
            cabId: cabReg.id,
            data: db.T01FCBODET.bulkCreate(cabecera.detalle, {
              transaction: t
            })
          }
        })
        .then((result) => {
          res
            .status(200)
            .json({ status: 'Factura Ingresada', id: result.cabId })
        })
        .catch((err) => {
          res.status(400).send({ error: 'registro No valido ' + err })
        })
    })
  })
})

router.get('/findInvoice', auth.optional, (req, res, next) => {
  let queryId = req.query.id ? req.query.id : null
  if (!queryId) return res.status(404).json({ error: 'Id Invalido' })

  db.T01FCBO.findOne({
    include: [
      {
        model: db.t01fcli
      },
      {
        model: db.T01FCBODET
      }
    ],
    limit: 20,
    // order: [['updatedAt', 'DESC']],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id: queryId }
  }).then((doc) => {
    if (doc === null) {
      return res.status(404).json({ error: 'no Encontrado' })
    } else {
      return res.status(200).json(doc)
    }
  })
})

router.get('/fetchAll', auth.optional, (req, res, next) => {
  let where = {
    [op.and]: {}
  }
  if (req.query.id) where[op.and].id = req.query.id
  if (req.query.Num_Boleta) where[op.and].Num_Boleta = req.query.Num_Boleta

  db.T01FCBO.findAll({
    include: [
      {
        model: db.t01fcli
      }
    ],
    limit: 20,
    order: [['updatedAt', 'DESC']],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: where
  })
    .then(function (data) {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(404).json({
        error: 'Comprobates no encontrados ' + err,
        dataError: err
      })
    })
})

module.exports = router
