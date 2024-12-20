const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./backend/models/userModel");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  const mongoUri = process.env.MONGO_URI; // Ensure this is set in your .env file
  const adminData = {
    name: "Sayed shahid",
    email: "shahidadmin1@example.com", // Change to your preferred admin email
    password: "Securepass123@", // Use a strong password
    role: "admin",
  };

  try {
    // Connect to the database
    await mongoose.connect(mongoUri);

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    // Hash the password and create the admin account
    adminData.password = await bcrypt.hash(adminData.password, 12);
    const newAdmin = new User(adminData);
    await newAdmin.save();

    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error creating admin account:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
