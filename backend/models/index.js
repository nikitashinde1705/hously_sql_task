const User = require("./User");
const Role = require("./Role");
const Department = require("./Department");

// Role ↔ User
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// Department ↔ User
Department.hasMany(User, { foreignKey: "departmentId" });
User.belongsTo(Department, { foreignKey: "departmentId" });

module.exports = {
  User,
  Role,
  Department,
};