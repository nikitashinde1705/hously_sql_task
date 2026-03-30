const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  permissions: {
    type: DataTypes.JSON, // store array as JSON
    allowNull: true,
  },
});

module.exports = Role;