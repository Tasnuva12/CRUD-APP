const express = require("express");
const router = express.Router();
const {
  getAllCompany,
  getSingleCompany,
  updateCompany,
  createCompany,
  deleteCompany,
} = require("../controllers/company.controller");

// Define routes with appropriate HTTP methods
router.get("/", getAllCompany); // Get all companies
router.get("/:id", getSingleCompany); // Get a single company by ID
router.post("/", createCompany); // Create a new company
router.put("/:id", updateCompany); // Update a company by ID
router.delete("/:id", deleteCompany); // Delete a company by ID

module.exports = router;
