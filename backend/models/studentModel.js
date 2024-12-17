const { Schema, model } = require("mongoose");

const feeSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  remarks: { type: String },
  status: { type: String, enum: ["Paid", "Pending"], required: true },
});

const libraryHistorySchema = new Schema({
  bookTitle: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now },
  returnedDate: { type: Date },
  status: { type: String, enum: ["Issued", "Returned"], required: true },
});

const studentSchema = new Schema({
  studentId: { type: Number, required: true, unique: true}, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  class: { type: Number, required: true }, 
  feesHistory: [feeSchema],
  libraryHistory: [libraryHistorySchema],
});

const Student = model("Student", studentSchema);

module.exports = Student;