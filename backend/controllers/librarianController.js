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

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.libraryHistory.push({ bookTitle, status });
    await student.save();

    res.status(200).json({ message: "Library record added successfully", libraryHistory: student.libraryHistory });
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

    await student.save();
    res.status(200).json({ message: "Library record updated successfully", libraryHistory: student.libraryHistory });
  } catch (error) {
    res.status(500).json({ message: "Error updating library record", error: error.message });
  }
};


module.exports = {viewAllLibrarians, addLibraryRecord, editLibraryRecord };
