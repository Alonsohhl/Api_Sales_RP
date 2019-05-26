const router = require('express').Router();

const appController = require('../controllers/appController');

const appCustomValidator = require("./routeValidator").appCustomValidator;


// router.get('/', appController.index);

/*====================== Empresa ====================*/
router.post('/insertarEmp', appController.insEmp); //ingresa empresa
// router.post('/insProp', appController.insProp); //Ingresa propuesta de empresa


// /*====================== Usuario ====================*/
// router.post('/insUsu', appCustomValidator.VALIDATE_REGISTER,   appController.insUsu); //ingresa usuario
// router.post('/insUsuProp/', appController.insUsuProp); //ingresa propuesta usuario
// router.post('/usuLogin/', appController.usuLogin); //ingresa propuesta usuario
// router.post('/login/', appController.login); //ingresa propuesta usuario

// router.get('/getPropUsu', appController.GetPropUsu);
//https://carlosazaustre.es/como-relacionar-tus-modelos-en-mongodb/

module.exports = router;