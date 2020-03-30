module.exports = function(sequelize, DataTypes) {
  var fac = sequelize.define(
    'T01FCBO',
    {
      // The email cannot be null, and must be a proper email before creation
      Ser_Boleta: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: false,
        defaultValue: 'F001'
      },
      Num_Boleta: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: false
      },
      Cod_Sucur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },

      Fecha_Boleta: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false
      },
      Fecha_Venc_Boleta: {
        type: DataTypes.DATE,
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
      freezeTableName: true
    }
  )
  fac.associate = function(models) {
    models.T01FCBO.hasMany(models.T01FCBODET)
  }
  return fac
}
