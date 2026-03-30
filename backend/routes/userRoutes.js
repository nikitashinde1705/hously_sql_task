const express = require("express");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

const router = express.Router();

// Protected routes
router.post("/", protect, checkPermission("create_user"), createUser);
router.get("/", protect, checkPermission("view_user"), getUsers);
router.put("/:id", protect, checkPermission("edit_user"), updateUser);
router.delete("/:id", protect, checkPermission("delete_user"), deleteUser);

module.exports = router;