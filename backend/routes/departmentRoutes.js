const express = require("express");

const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const protect = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

const router = express.Router();

// Protected routes
router.post("/", createDepartment);
router.get("/", getDepartments);
// router.post("/", protect, checkPermission("create_department"), createDepartment);
// router.get("/", protect, checkPermission("view_department"), getDepartments);

// Optional (recommended)
router.put("/:id", protect, checkPermission("edit_department"), updateDepartment);
router.delete("/:id", protect, checkPermission("delete_department"), deleteDepartment);

module.exports = router;