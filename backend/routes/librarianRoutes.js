const express = require("express");
const { authenticate, authorize }  = require("../middleware/authMiddleware.js");
const { addLibraryRecord, editLibraryRecord, viewAllLibrarians } = require("../controllers/librarianController.js");


const router = express.Router();

router.use(authenticate);
router.get("/librarians", authorize("librarian", "admin", "staff"), viewAllLibrarians); // View all librarians
router.post("/student/:studentId/library", authorize("librarian", "admin"), addLibraryRecord);
router.put("/student/:studentId/library/:libraryId", authorize("librarian","admin" ), editLibraryRecord);

module.exports =  router;
