// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
//
// Creating our User model
// Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
  var cliente = sequelize.define(
    't01fcli',
    {
      // The email cannot be null, and must be a proper email before creation
      Dni_Cli: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
      },
      Nom_Cli: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: 0
      },
      App_Cli: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: 'user'
      },
      Apm_Cli: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      Correo_Cli: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      Sexo_Cli: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['masculino', 'femenino']] // check the value is one of these
        }
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVO',
        validate: {
          isIn: [['ACTIVO', 'INACTIVO']] // check the value is one of these
        }
      }
    },
    {
      tableName: 't01fcli'
    }
  )
  cliente.associate = function(models) {
    models.t01fcli.hasMany(models.T01FCBO, { foreignKey: 'id_Cliente' })
  }
  return cliente
}
