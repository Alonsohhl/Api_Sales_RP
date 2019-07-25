
const { check } = require('express-validator/check');
// https://github.com/chriso/validator.js#sanitizers

exports.appCustomValidator = {
  VALIDATE_REGISTER: [
    check('usuUsuario')
      .isEmail()
      .normalizeEmail()
      .withMessage('Tiene que ser un correo valido'),
    check('usuPassword')
      .isLength({ min: 5 })
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('usuNombre')
      .isLength({ min: 5 })
      .withMessage('Debe ser mayor de 5 caracteres'),
    check('usuCodAlumno')
      .isLength({ min: 5 })
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
