const { DataTypes } = require("sequelize"); // these line imports datatypes
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = User;


//For understanding purpose
//internally it happens when run -> sequelize.sync()
// CREATE TABLE Users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   roleId INT,
//   departmentId INT
// );