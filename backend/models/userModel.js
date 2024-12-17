const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    staffId: {
      type: Number,
      unique: true,
      sparse: true, 
    },
    librarianId: {
      type: Number,
      unique: true,
      sparse: true, 
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "staff", "librarian"],
      required: true,
      default: "staff",
    },
  },
  { timestamps: true }
);


const User = model("User", userSchema);

module.exports = User;