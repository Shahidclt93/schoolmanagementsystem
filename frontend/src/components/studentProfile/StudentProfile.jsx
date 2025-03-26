import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudents } from "../../redux/studentSlice";
import ProfileDetails from "./ProfileDetails";
import FeeRecords from "./FeeRecords";
import LibraryRecords from "./LibraryRecords";

const StudentProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const { id } = useParams();

  const studentDetails = students.find((s) => s._id === id);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        await dispatch(fetchStudents()).unwrap();
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };
    fetchStudentDetails();
  }, [dispatch, token, id]);

  return (
    <div className="m-4">
      <ProfileDetails studentDetails={studentDetails || []} />
      {["admin", "staff"].includes(user.role) && (
        <FeeRecords studentDetails={studentDetails || []} id={id} />
      )}
      {["admin", "librarian"].includes(user.role) && (
        <LibraryRecords studentDetails={studentDetails || []} id={id} />
      )}
    </div>
  );
};

export default StudentProfile;
