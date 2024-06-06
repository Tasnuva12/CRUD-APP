const express = require("express");
const router = express.Router();
const { getAllUser,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser}=require('../controllers/user.controller');

// Define routes with appropriate HTTP methods
router.get("/", getAllUser); // Get all users
router.get("/:id", getSingleUser); // Get a single user by ID
router.post("/", createUser); // Create a new user
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID

module.exports = router;
