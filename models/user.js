// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require('bcryptjs');
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
      allowNull: false
    },
    Cod_Cargo: {
      type: DataTypes.STRING,
      allowNull: false
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
      allowNull: false
    },
    Dir_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Correo_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    Dni_EmpFar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Nom_Usu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Pass_Usu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: false
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

  return User;
};
