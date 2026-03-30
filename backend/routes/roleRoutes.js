const express = require("express");

const {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const protect = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

const router = express.Router();

// Protected routes
// router.post("/", createRole);
// router.get("/", getRoles);
router.post("/", protect, checkPermission("create_role"), createRole);
router.get("/", protect, checkPermission("view_role"), getRoles);

router.put("/:id", updateRole);
//router.put("/:id", protect, checkPermission("edit_role"), updateRole);

// Optional (recommended)
router.delete("/:id", protect, checkPermission("delete_role"), deleteRole);

module.exports = router;