// const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
var db = require('../../db');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

router.post('/insert', auth.optional, (req, res) => {
  // console.dir(auth)

  const { body: { product } } = req;
  db.T01FMED.create({
    Nom_Medi: product.Nom_Medi,
    Desc_Medi: product.Desc_Medi,
    Cant_Medi: product.Cant_Medi,
    Precio_Com: product.Precio_Com,
    Precio_Unitario: product.Precio_Unitario,
    RazonSoc_Prov: product.RazonSoc_Prov,
    Fecha_Ing: product.Fecha_Ing,
    Fecha_Ven: product.Fecha_Ven,
    Stock_Min: product.Stock_Min,
    Stock_Max: product.Stock_Max,
    Pres_Medi: product.Pres_Medi,
    T01FCATId: product.T01FCATId,
    T01FPROId: product.T01FPROId
  }).then(function () {
    res.json({ status: 'Producto Ingresado' });
    res.end();
  }).catch(function (err) {
    // if (err.errors[0].message) {
    // res.status(400);
    res.status(400).send({ error: err });
    // res.json({ error: err.errors[0].message });
    // }
    // res.status(422).json(err);
    // res.status(422).send(err);
    // return res.end();
  });
  // console.log("TCL: id", id)

  // return db.t01fefm.findByPk(id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.sendStatus(400);
  //     }

  //     return res.json({ user: user.toAuthJSON() });
  //   });
  // return res.sendStatus(200);
});

router.get('/getall/:limit', auth.optional, (req, res) => {
// const { body: { product } } = req;
  var limit = 10;
  if (req.params.limit) {
    limit = parseInt(req.params.limit)
  }
  db.T01FMED.findAll({
    limit: limit
  }).then(function (data) {
    res.json(data);
    // res.end();
  }).catch(function (err) {
    // if (err.errors[0].message) {
    //   res.status(422).json({ error: err.errors[0].message });
    // }
    res.json(err);
    // return res.end();
  });
});

router.get('/getcat/:limit', auth.optional, (req, res) => {
  // var limit = 10;
  // if (req.params.limit) {
  //   limit = 10
  // }
  db.T01FCAT.findAll({
    limit: 10,
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).then(function (data) {
    res.json(data);
  }).catch(function (err) {
    // if (err.errors[0].message) {
    //   res.status(422).json({ error: err.errors[0].message });
    // }
    res.json(err);
    // return res.end();
  });
});

router.get('/getproveedores/', auth.optional, (req, res) => {
  var data = req.query;
  var varLike = '&';
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
  }).then(function (data) {
    console.log("TCL: data", data)
    res.json(data);
  }).catch(function (err) {
    // if (err.errors[0].message) {
    //   res.status(422).json({ error: err.errors[0].message });
    // }
    res.json(err);
    // return res.end();
  });
});

router.get('/current', auth.required, (req, res) => {
  // const { payload: { id } } = req;

  // return db.t01fefm.findById(id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.sendStatus(400);
  //     }

  //     return res.json({ user: user.toAuthJSON() });
  //   });
});

module.exports = router;
