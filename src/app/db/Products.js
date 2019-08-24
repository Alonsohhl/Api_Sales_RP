
module.exports = function (sequelize, DataTypes) {
  var Products = sequelize.define('T01FMED', {
    // Cod_Cat: {//! agregar FK
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references:
    // },
    // Desc_Cat: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: ''
    // },
    Nom_Medi: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    Desc_Medi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Cant_Medi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Precio_Com: {
      type: DataTypes.FLOAT(11, 2),
      allowNull: false,
      defaultValue: 0
    },
    Precio_Unitario: {
      type: DataTypes.FLOAT(11, 2),
      allowNull: false,
      defaultValue: 0
    },
    RUC: { //! agregar FK
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    RazonSoc_Prov: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Fecha_Ing: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
      // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    Fecha_Ven: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    Stock_Min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Stock_Max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Pres_Medi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1'
    }
  });
  Products.associate = function (models) {
    // models.T01FMED.hasOne(models.T01FCAT);
    models.T01FMED.belongsTo(models.T01FCAT, { foreignKey: { allowNull: false } });
    // models.T01FMED.BelongsToMany(models.T01FPRO, { foreignKey: { allowNull: false } });
  };

  return Products;
};
