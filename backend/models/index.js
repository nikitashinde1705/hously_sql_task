const User = require("./User");
const Role = require("./Role");
const Department = require("./Department");

// Role <=> User  : One-to-Many Relationship
Role.hasMany(User, { foreignKey: "roleId" }); //One Role -> Many Users
User.belongsTo(Role, { foreignKey: "roleId" }); //One User -> One Role

// Department <=> User
Department.hasMany(User, { foreignKey: "departmentId" });
User.belongsTo(Department, { foreignKey: "departmentId" });

module.exports = {
  User,
  Role,
  Department,
};