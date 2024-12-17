const express = require("express");
const { authenticate, authorize }  = require("../middleware/authMiddleware.js");
const { createAccount, deleteAccount, editAccount }  = require("../controllers/adminController.js");
const { addStudent, editStudent, deleteStudent }  = require("../controllers/studentController.js");

const router = express.Router();

router.use(authenticate); // Require authentication for all routes

// Accounts management
router.post("/create-account", authorize("admin"), createAccount); // Create staff/librarian
router.put("/edit-account/:id", authorize("admin"), editAccount); // Edit staff/librarian details
router.delete("/delete-account/:id", authorize("admin"), deleteAccount); // Delete staff/librarian

// Student management
router.post("/add-student", authorize("admin"), addStudent); // Add a new student
router.put("/edit-student/:id", authorize("admin"), editStudent); // Edit student details
router.delete("/delete-student/:id", authorize("admin"), deleteStudent); // Delete a student

module.exports = router;