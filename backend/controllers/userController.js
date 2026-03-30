const { User, Role, Department } = require("../models");
const bcrypt = require("bcryptjs");

//Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, roleId, departmentId } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
      departmentId,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // hide password
      include: [
        {
          model: Role,
          attributes: ["name", "permissions"],
        },
        {
          model: Department,
          attributes: ["name"],
        },
      ],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update User
exports.updateUser = async (req, res) => {
  try {
    const { roleId, departmentId } = req.body;

    await User.update(
      { roleId, departmentId },
      { where: { id: req.params.id } }
    );

    const updatedUser = await User.findByPk(req.params.id);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};