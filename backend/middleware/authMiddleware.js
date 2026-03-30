const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

//AUTH MIDDLEWARE
const protect = async (req, res, next) => {
  let token;

  //1. Check for token in headers
  if (req.headers.authorization?.startsWith("Bearer")) {

    //2. Get token from header
    token = req.headers.authorization.split(" ")[1];

    try {
      //3. Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //4. Get user from DB using decoded id + include Role
      const user = await User.findByPk(decoded.id, {
        include: {
          model: Role,
          attributes: ["name", "permissions"],
        },
      });

      //5. If user not found, return 401
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      //6. Attach user to request object
      req.user = user;
      next();
    } 
    catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

module.exports = protect;