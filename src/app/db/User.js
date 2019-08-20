// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
//
// Creating our User model
// Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('t01fefm', {
    // The email cannot be null, and must be a proper email before creation
    Cod_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Cod_Sucur: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
    Cod_Cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    Nom_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    App_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Apm_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Tel_EmpFar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    Dir_EmpFar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Correo_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    Dni_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Nom_Usu: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Pass_Usu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    }
  });
  // eslint-disable-next-line
  User.prototype.validPassword = function (Pass_Usu) {
    return bcrypt.compareSync(Pass_Usu, this.Pass_Usu);
  };
  //   User.hook("beforeCreate", function(user) {
  //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  //   });
  User.beforeCreate(user => {
    user.Pass_Usu = bcrypt.hashSync(
      user.Pass_Usu,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.prototype.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };

  User.prototype.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };

  User.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');
  }

  User.prototype.toAuthJSON = function () {
    return {
      id: this.id,
      user: this.Nom_EmpFar.concat(' ', this.App_EmpFar),
      email: this.Correo_EmpFar,
      token: this.generateJWT()
    };
  };

  return User;
};
