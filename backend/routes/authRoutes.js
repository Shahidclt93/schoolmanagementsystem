const express = require("express");

const { signIn } = require("../controllers/authController.js");

const router = express.Router();

// Route for signing in
router.post("/signin", signIn);

module.exports = router;
