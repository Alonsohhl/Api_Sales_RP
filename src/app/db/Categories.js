// Requiring bcrypt for password hashing. Using the bcryptjs version as
// the regular bcrypt module sometimes causes errors on Windows machines
// Creating our User model
// Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
  var cat = sequelize.define('T01FCAT', {
    // The email cannot be null, and must be a proper email before creation
    Cod_Cat: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    Desc_Cat: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'true'
    }
  });
  cat.associate = function (models) {
    // models.T01FCAT.hasOne(models.T01FMED);
    // models.T01FCAT.belongsTo(models.T01FMED);
    // models.T01FCAT.hasOne(models.T01FMED);
  };// EVITAR LA REDUNDANCIA
  return cat;
};
