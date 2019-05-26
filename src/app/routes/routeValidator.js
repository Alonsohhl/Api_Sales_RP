
  const { check} = require('express-validator/check');
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
