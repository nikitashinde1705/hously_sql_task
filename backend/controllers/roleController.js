const { Role } = require("../models");

//Create Role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const role = await Role.create({ name, permissions });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get All Roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Role
exports.updateRole = async (req, res) => {
  try {
    const { permissions } = req.body;

    await Role.update(
      { permissions },
      { where: { id: req.params.id } }
    );

    const updatedRole = await Role.findByPk(req.params.id);

    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Role (added for completeness)
exports.deleteRole = async (req, res) => {
  try {
    await Role.destroy({
      where: { id: req.params.id },
    });

    res.json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};