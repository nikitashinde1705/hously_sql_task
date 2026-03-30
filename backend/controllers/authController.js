const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//REGISTER USER
exports.registerUser = async (req, res) => {
  try {

    //1: Get data from request body
    const { name, email, password, roleId, departmentId } = req.body;

    // 2:Check user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      //if email exists, return error
      return res.status(400).json({ message: "User exists" });
    }

    // 3:Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4:Create user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,  //link user with role table
      departmentId, //link user with department table
    });

    // 5:Return user data with token
    res.json({
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {

    //1: Get data from request body
    const { email, password } = req.body;

    // 2:Find user by email and include role data
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["name", "permissions"],
      },
    });

    //3:Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {

      //4:Sends user data with token
      res.json({
        id: user.id,
        name: user.name,
        role: user.Role?.name,
        permissions: user.Role?.permissions,
        token: generateToken(user.id),
      });
    } else {
      //if user not found or password doesn't match, return error
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};