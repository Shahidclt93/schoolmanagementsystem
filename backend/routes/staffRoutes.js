const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware.js");
const { viewStudents, addFeeRecord, editFeeRecord, viewAllStaff } = require("../controllers/staffController.js");

const router = express.Router();

router.use(authenticate);
router.get("/staffs", authorize("admin","staff", "librarian"), viewAllStaff); // View all staff
router.get("/view-students", authorize("admin", "staff", "librarian"), viewStudents); // View all students
router.post("/student/:studentId/fee", authorize("staff", "admin"), addFeeRecord);
router.put("/student/:studentId/fee/:feeId", authorize("staff","admin"), editFeeRecord);

module.exports = router;
