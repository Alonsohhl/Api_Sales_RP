module.exports = function(sequelize, DataTypes) {
  var fac = sequelize.define(
    'T01FCBO',
    {
      // The email cannot be null, and must be a proper email before creation
      Ser_Boleta: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: false
      },
      Num_Boleta: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: false
      },
      Cod_Sucur: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: false
      },

      Nom_Usu: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false
      },
      Fecha_Boleta: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false
      },
      Nom_Cli: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: false
      },
      App_Cli: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: false
      },
      Apm_Cli: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: false
      },
      Sub_Total: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
        unique: false
      },
      IGV: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
        unique: false,
        defaultValue: 18
      },
      Precio_Total: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
        unique: false
      }
    },
    {
      tableName: 'T01FCBO'
    }
  )
  fac.associate = function(models) {
    models.T01FCBO.hasMany(models.T01FCBODET)
    // models.T01FCAT.belongsTo(models.T01FMED);
    // models.T01FCAT.hasOne(models.T01FMED);
  } // EVITAR LA REDUNDANCIA
  return fac
}
