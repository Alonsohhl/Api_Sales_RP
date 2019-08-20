
const { check } = require('express-validator/check');
// https://github.com/chriso/validator.js#sanitizers

exports.appCustomValidator = {
  VALIDATE_REGISTER: [
    check('usuUsuario')
      .isEmail()
      .normalizeEmail()
      .withMessage('Tiene que ser un correo valido'),
    check('usuPassword')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('usuNombre')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('usuCodAlumno')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres')
  ]

};

exports.Validator = {
  VALIDATE_PRODUCT_INSERT: [
    check('Nom_Medi')
      .not().isEmpty()
      .withMessage('Tiene que ser un correo valido'),
    check('Desc_Medi')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Precio_Com')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Precio_Unitario')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('RazonSoc_Prov')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Fecha_Ing')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Fecha_Ven')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Stock_Min')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Stock_Max')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('Pres_Medi')
      .not().isEmpty()
      .withMessage('Debe ser mayor de 5 caracteres')
  ]

};

const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};
module.exports = auth;
