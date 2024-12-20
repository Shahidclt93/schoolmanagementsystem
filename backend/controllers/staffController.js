const Student = require("../models/studentModel.js");
const User = require("../models/userModel.js");

// View All Students
const viewStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// View all staffs
 const viewAllStaff = async (req, res) => {
  try {
    const staffUsers = await User.find({ role: "staff" }).select("-password"); // Exclude passwords
    res.status(200).json({
      success: true,
      count: staffUsers.length,
      data: staffUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching staff users",
      error: error.message,
    });
  }
};
// Manage a student's fees history
 const addFeeRecord = async (req, res) => {
  const { studentId } = req.params;
  const { amount, remarks, status } = req.body;

  const generateISODate = () => {
    return new Date().toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  try {
  
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const feesData = { amount, remarks, status, date:generateISODate()}

    student.feesHistory.push(feesData);
    await student.save();
    
    const newFeeRecord = student.feesHistory[student.feesHistory.length - 1];

    res.status(200).json({ message: "Fee record added successfully", feesHistory: newFeeRecord, studentId });
  } catch (error) {
    res.status(500).json({ message: "Error adding fee record", error: error.message });
  }
};

 const editFeeRecord = async (req, res) => {
  const { studentId, feeId } = req.params;
  const { amount, remarks, status } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const feeRecord = student.feesHistory.id(feeId);
    if (!feeRecord) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    if (amount) feeRecord.amount = amount;
    if (remarks) feeRecord.remarks = remarks;
    if (status) feeRecord.status = status;
    const feesData = { amount, remarks, status }
    await student.save();
    res.status(200).json({ message: "Fee record updated successfully", feesHistory: feesData, studentId, feeId });
  } catch (error) {
    res.status(500).json({ message: "Error updating fee record", error: error.message });
  }
};



module.exports = { viewAllStaff, viewStudents, addFeeRecord, editFeeRecord };