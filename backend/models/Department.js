const { DataTypes } = require("sequelize"); //Used to define column types
const sequelize = require("../config/db");

const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Department;