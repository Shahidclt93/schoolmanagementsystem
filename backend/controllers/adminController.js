const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");

// Create Account for Staff or Librarian
const createAccount = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["staff", "librarian"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    // Generate a random 8-digit student ID
    const id = Math.floor(10000000 + Math.random() * 90000000);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      [`${role}Id`]: id,
    });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Edit staff/librarian account details
const editAccount = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 12);

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Account not found" });
    }

    res
      .status(200)
      .json({ message: "Account updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating account", error: error.message });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createAccount, deleteAccount, editAccount };
