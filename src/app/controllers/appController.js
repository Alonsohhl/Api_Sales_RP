const controller = {};

const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check');
const { empModel } = require

// var pool = require('./db/connection')

/**
 * !descinebtar estos
 */
// var UsuariosModel = require('./db/propuestas.js').Usuarios;
// var EmpresasModel = require('./db/propuestas.js').Empresa;
// var PropuestasModel = require('./db/propuestas.js').Propuestas;

controller.index = (req, res) => {
  res.render('index');
  console.log('Carga completa');
};

/* ================= Insertar Empresa =================== */
controller.insEmp = (req, res) => { //
  console.log('Ins emp')
  // var newEmp = new EmpresasModel(req.body);
  // // newEmp._id=new mongoose.Types.ObjectId();
  // newEmp.save(function (err) {
  // if (err) return res.status(500).send({ error: err });
  // return res.send("Ingresado Correctamente");

  // });
};
// /* ================= Ingreso de Empresa->Propuesta ===================*/
// controller.insProp = (req, res) => {

//     req.checkBody('empresa_id', 'ID invalido').notEmpty();
//     req.checkBody('propNombre', 'propuesta invalida').exists();
//     var errors = req.validationErrors();
//     if (errors) {
//         res.send(errors);
//         return;
//     } else {
//         EmpresasModel.findOne({_id: req.body.empresa_id},function (err,foundObject) {
//         if (err) return res.status(500).send({ error: err });
//         if (!foundObject) return res.status(500).send({ error: "Registro no encontrado" });
//             console.log("Propuesta "+req.body.propuesta);

//             var propuesta = new PropuestasModel({
//                 _id: new mongoose.Types.ObjectId(),
//                 empresa: foundObject,
//                 propNombre:'propuestilla' ,

//               });
//               propuesta.save(function (err) {
//                 if (err) return handleError(err);

//                 console.log("Ingresado correctamente");
//                 res.send(foundObject);
//                 // thats it!
//               });

//         });
//     }
// }
// /* ================= Usuario Check Login Better ===================*/
// //router.post("/login", (req, res, next) => {
// controller.login = (req, res,next) => {
//     UsuariosModel.find({ usuUsuario: req.body.usuUsuario })
//       .exec()
//       .then(user => {
//         // return res.status(401).json({
//         //     message: "YEAHP",
//         //     user
//         //   });
//         if (user.length < 1) {
//           return res.status(401).json({
//             message: "Usuario no Valido"
//           });
//         }
//         // return res.status(200).json({
//         //     message: "Login",
//         //     user
//         //   });

//         // bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         //   if (err) {
//         //     return res.status(401).json({
//         //       message: "Usuario no Valido"
//         //     });
//         //   }

//         if (req.body.usuPassword != user[0].usuPassword) {
//             return res.status(401).json({
//                 message: "Usuario no Valido"
//             });
//         }else{

//             const token = jwt.sign(
//                 {
//                 usuUsuario: user[0].usuUsuario,
//                 userId: user[0]._id
//                 },
//                 "CLAVEUCSM",
//                 // process.env.JWT_KEY,
//                 {
//                     expiresIn: "1h"
//                 }
//             );
//             return res.status(200).json({
//                 message: "Logeado correctamente",
//                 token: token
//             });
//         }

//           /*
//           if (result) {
//             const token = jwt.sign(
//               {
//                 email: user[0].email,
//                 userId: user[0]._id
//               },
//               process.env.JWT_KEY,
//               {
//                   expiresIn: "1h"
//               }
//             );
//             return res.status(200).json({
//               message: "Auth successful",
//               token: token
//             });
//           }
//           res.status(401).json({
//             message: "Auth failed"
//           });
//         });*/
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   }//);

// /* ================= Usuario Check Login ===================*/
// controller.usuLogin = (req, res) => {

//     req.checkBody('usuUsuario',    'Usuario invalido').notEmpty().isString();
//     // req.checkBody('usuNombre',     'Nombre invalido').notEmpty().isString();
//     // req.checkBody('usuCodAlumno',    'Codigo de Alumno  invalido').notEmpty().isString();
//     // req.checkBody('usuPrograma',   'Programa invalido').optional().isString();
//     req.checkBody('usuPassword',   'Password invalido').notEmpty()
//     // req.checkBody('usuIntereses',  'Intereses invalido').optional().isString();

//     UsuariosModel.findOne( {       usuUsuario:req.body.usuUsuario.toLowerCase(),
//                                                usuPassword:req.body.usuPassword,
//                                     },
//                                         function (err,foundObject) {
//                                             // console.log(foundObject)
//                                             console.log(foundObject)
//                                             if (foundObject&&foundObject.propuestas)
//                                             {
//                                                 return res.send({log:true})
//                                             }else //res.send(res.status(500));
//                                                 return res.send({log:false});             // res.status(200).send(foundObject);
//                                         });
// }
// /* ================= Ingreso de Usuario ===================*/
// controller.insUsu = (req, res) => {

//     var errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     } else {
//         var newEmp = new UsuariosModel(req.body);
//         newEmp.save(function (err) {
//         if (err){
//             console.dir(err)
//             return res.status(422).send({ error: err}); }

//         return  res.status(201).send("Ingresado Correctamente");
//         });
//     }
// }

// /* ================= Ingreso de Usuario -> Propuesta ===================*/
// controller.insUsuProp = (req, res) => {

//     req.checkBody('_id'         ,'ID Usuario invalido').notEmpty().isString();
//     req.checkBody('propuesta'   ,'ID Propuesta invalido').notEmpty().isString();


//     var errors = req.validationErrors();
//     if (errors) {
//         res.send(errors);
//         return;
//     } else {
//         UsuariosModel.findOne({_id: req.body._id},function (err,foundObject) {
//             if (err) return res.status(500).send({ error: err });
//             if (!foundObject) return res.status(500).send({ error: "Usuario no encontrado" });
//             foundObject.propuestas.push(req.body.propuesta);
//             foundObject.save(function (err) {
//                 if (err) console.log({ error: err });
//                 console.log("Ingresado correctamente");
//                 res.send(foundObject);
//                 });

//         });
//     }
// }

// /* ================= Obtener de Usuario -> Propuestas ===================*/
// controller.GetPropUsu = (req, res) => {

//     /*    req.checkBody('_id'         ,'ID Usuario invalido').notEmpty().isString();
//         req.checkBody('propuesta'   ,'ID Propuesta invalido').notEmpty().isString();


//         var errors = req.validationErrors();
//         if (errors) {
//             res.send(errors);
//             return;
//         } else {
//       */
//             //UsuariosModel.findOne({_id: req.body._id},function (err,foundObject) {

//     /*        UsuariosModel.find({},function (err,foundObject) {
//                 console.log(foundObject)
//                 EmpresasModel.populate(foundObject, {path: "propuestas"},function(err, libros){
//                     res.status(200).send(libros);
//                 }); */
//                 UsuariosModel.find({_id:""},function (err,foundObject) {
//                     console.log(foundObject)
//                     EmpresasModel.populate(foundObject, {path: "propuestas"},function(err, libros){
//                         res.status(200).send(libros);
//                     });


//                 /*
//                 if (err) return res.status(500).send({ error: err });
//                 if (!foundObject) return res.status(500).send({ error: "Usuario no encontrado" });
//                 foundObject.propuestas.push(req.body.propuesta);
//                 foundObject.save(function (err) {
//                     if (err) console.log({ error: err });
//                         console.log("Ingresado correctamente");
//                         res.send(foundObject);
//                     });*/

//                 });
//         //}
//     }

// controller.update = (req, res) => { // Actualizar Valor

// };



module.exports = controller;
