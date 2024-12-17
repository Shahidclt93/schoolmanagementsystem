import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudents } from "../../redux/studentSlice";
import { addFeeRecord, editFeeRecord } from "../../redux/feesSlice";
import { addLibraryRecord, editLibraryRecord } from "../../redux/librarySlice";
import ProfileDetails from "./ProfileDetails";
import FeeRecords from "./FeeRecords";
import LibraryRecords from "./LibraryRecords";

const StudentProfile = () => {
  const { feeId, libraryId } = useSelector((state) => state.ids);
  // console.log(libraryId)
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await dispatch(fetchStudents(token)).unwrap();
        const student = response.students.find((s) => s._id === id);
        setStudentDetails(student || {});
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };
    fetchStudentDetails();
  }, [dispatch, token, id]);
  // console.log(studentDetails)

  const generateISODate = () => {
    return new Date().toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  return (
    <div className="m-4">
      <ProfileDetails
        name={studentDetails.name}
        email={studentDetails.email}
        className={studentDetails.class}
        studentId={studentDetails.studentId}
      />
      {["admin", "staff"].includes(user.role) &&
      
      <FeeRecords
        studentDetails={studentDetails || []}
        createFeeRecord={(values) =>
          dispatch(addFeeRecord({ studentId: id, feeData: values }))
        }
        editFeeRecordApi={(values) =>
          dispatch(
            editFeeRecord({
              studentId: id,
              feeId: feeId,
              feeData: {
                amount: values.amount,
                remarks: values.remarks,
                status: values.status,
              },
            })
          )
        }
      /> 
       }
      {["admin", "librarian"].includes(user.role) &&
      
      <LibraryRecords
        studentDetails={studentDetails || []}
        createLibraryRecord={(values) =>
          dispatch(addLibraryRecord({ studentId: id, recordData: values }))
        }
        editLibraryRecordApi={(values) =>
          dispatch(
            editLibraryRecord({
              studentId: id,
              libraryId: libraryId,
              updatedData: {
                bookTitle: values.bookTitle,
                status: values.status,
                returnedDate:
                  values.status === "Returned" ? generateISODate() : null,
              },
            })
          )
        }
      />
      }
    </div>
  );
};

export default StudentProfile;
