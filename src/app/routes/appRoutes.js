const router = require('express').Router();
// var db = require('../db');
var passport = require('../config/passport');

// const appController = require('../controllers/appController')
// const userController = require('../controllers/userController')
// const empController = require('../controllers/empController')
// const auth = require('./routeValidator');

// const appCustomValidator = require("./routeValidator").appCustomValidator;

// router.get('/', appController.index);

router.post('/api/login', passport.authenticate('local'), function (req, res) {
  res.json('/members');
});
/* ====================== Empresa ==================== */
// router.post('/insEmp', auth.optional, empController.insert); // Ins Empresa
// router.post('/insProp', appController.insProp); //Ingresa propuesta de empresa
// /*====================== Usuario ====================*/
// router.post('/insUsu', userController.insert)
// router.post('/udpUser', userController.udpUser) //     Update User
// router.post('/insUsu', appCustomValidator.VALIDATE_REGISTER,   appController.insUsu); //ingresa usuario
// router.post('/insUsuProp/', appController.insUsuProp); //ingresa propuesta usuario
// router.post('/usuLogin/', appController.usuLogin); //ingresa propuesta usuario
// router.post('/login/', appController.login); //ingresa propuesta usuario

// router.get('/getPropUsu', appController.GetPropUsu);
// https://carlosazaustre.es/como-relacionar-tus-modelos-en-mongodb/

module.exports = router
