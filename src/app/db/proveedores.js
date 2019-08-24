module.exports = function (sequelize, DataTypes) {

  var Vendors = sequelize.define('T01FPRO', {

    RUC: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      unique: true
    },
    RazonSoc_Prov: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Tel_Prov: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    Correo_Prov: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    Dir_Prov: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  });
  Vendors.associate = function (models) {
    models.T01FPRO.hasMany(models.T01FMED, { foreignKey: { allowNull: false } });
    // models.T01FMED.belongsTo(models.T01FCAT, { foreignKey: { allowNull: false } });
  };

  return Vendors;
};
