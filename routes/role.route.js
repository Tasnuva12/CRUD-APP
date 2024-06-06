const express = require("express");
const router = express.Router();
const {
  getAllRole,
  getSingleRole,
  updateRole,
  createRole,
  deleteRole,
} = require("../controllers/role.controller");

// Define routes with appropriate HTTP methods
router.get("/", getAllRole); // Get all roles
router.get("/:id", getSingleRole); // Get a single role  by ID
router.post("/", createRole); // Create a new role
router.put("/:id", updateRole); // Update a role by ID
router.delete("/:id", deleteRole); // Delete a role by ID

module.exports = router;
