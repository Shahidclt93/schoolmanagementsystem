const Student = require("../models/studentModel.js");
const User = require("../models/userModel.js");

// View all librarians
 const viewAllLibrarians = async (req, res) => {
  try {
    const librarianUsers = await User.find({ role: "librarian" }).select("-password"); // Exclude passwords
    res.status(200).json({
      success: true,
      count: librarianUsers.length,
      data: librarianUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching librarian users",
      error: error.message,
    });
  }
};

// Manage a student's library history
const addLibraryRecord = async (req, res) => {
  const { studentId } = req.params;
  const { bookTitle, status } = req.body;
  
  const generateISODate = () => {
    return new Date().toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };
  
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const libData = { bookTitle, status, issuedDate: generateISODate() }

    student.libraryHistory.push(libData);
    await student.save();

    const newLibRecord = student.libraryHistory[student.libraryHistory.length - 1];

    res.status(200).json({ message: "Library record added successfully", libraryHistory: newLibRecord, studentId });
  } catch (error) {
    res.status(500).json({ message: "Error adding library record", error: error.message });
  }
};

 const editLibraryRecord = async (req, res) => {
  const { studentId, libraryId } = req.params;
  const { bookTitle, status, returnedDate } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const libraryRecord = student.libraryHistory.id(libraryId);
    if (!libraryRecord) {
      return res.status(404).json({ message: "Library record not found" });
    }

    if (bookTitle) libraryRecord.bookTitle = bookTitle;
    if (status) libraryRecord.status = status;
    if (returnedDate) libraryRecord.returnedDate = returnedDate;

    const libData = { bookTitle, status, returnedDate}


    await student.save();
    res.status(200).json({ message: "Library record updated successfully", libraryHistory: libData, studentId, libraryId });
  } catch (error) {
    res.status(500).json({ message: "Error updating library record", error: error.message });
  }
};


module.exports = {viewAllLibrarians, addLibraryRecord, editLibraryRecord };
