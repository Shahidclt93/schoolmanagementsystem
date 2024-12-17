const Student = require("../models/studentModel.js");


// Add a new student
const addStudent = async (req, res) => {
  const { name, email, class: studentClass } = req.body;

  try {
    // Generate a random 8-digit student ID
    const studentId = Math.floor(10000000 + Math.random() * 90000000);

    // Create a new student
    const newStudent = new Student({ name, email, class: studentClass, studentId });
    await newStudent.save();

    res.status(201).json({ 
      message: "Student added successfully", 
      student: newStudent 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error adding student", 
      error: error.message 
    });
  }
};
  
  // Edit student details
    const editStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, class: studentClass } = req.body;
  
    try {
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (studentClass) updates.class = studentClass;
  
      const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error: error.message });
    }
  };
  
  // Delete a student
    const deleteStudent = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error: error.message });
    }
  };

  module.exports = { addStudent, editStudent, deleteStudent };