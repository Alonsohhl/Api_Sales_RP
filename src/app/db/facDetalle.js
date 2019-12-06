module.exports = function(sequelize, DataTypes) {
  var facDet = sequelize.define(
    'T01FCBODET',
    {
      // The email cannot be null, and must be a proper email before creation
      Cod_Medi: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: false
      },
      Nom_Medi: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: false
      },
      Cant_Dmed: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
        unique: false
      },

      Precio_Unitario: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
        unique: false
      },
      Importe_Total: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false,
        unique: false
      }
    },
    {
      tableName: 'T01FCBODET'
    }
  )
  facDet.associate = function(models) {
    // models.T01FCAT.hasOne(models.T01FMED);
    // models.T01FCAT.belongsTo(models.T01FMED);
    // models.T01FCAT.hasOne(models.T01FMED);
  } // EVITAR LA REDUNDANCIA
  return facDet
}
