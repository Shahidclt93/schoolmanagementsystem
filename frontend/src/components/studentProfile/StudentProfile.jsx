import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStudents, addFeeRecord, editFeeRecord ,  addLibraryRecord, editLibraryRecord} from "../../redux/studentSlice";
import ProfileDetails from "./ProfileDetails";
import FeeRecords from "./FeeRecords";
import LibraryRecords from "./LibraryRecords";

const StudentProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const { id } = useParams();
  
  const studentDetails =  students.find((s) => s._id === id);


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
  const generateISODate = () => {
    return new Date().toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };
  return (
    <div className="m-4">
      <ProfileDetails
        name={studentDetails?.name}
        email={studentDetails?.email}
        className={studentDetails?.class}
        studentId={studentDetails?.studentId}
      />
      {["admin", "staff"].includes(user.role) &&
      
      <FeeRecords
        studentDetails={studentDetails || []}
        createFeeRecord={(values) =>
          dispatch(addFeeRecord({ studentId: id, feeData: values }))
        }
        editFeeRecordApi={ (values) =>{
          dispatch(
              editFeeRecord({
                studentId: id,
                feeId: values.feeId,
                feeData: {
                  amount: values.amount,
                  remarks: values.remarks,
                  status: values.status,
                },
              })
            )
        } 
        }
      /> 
       }
      {["admin", "librarian"].includes(user.role) &&
      
      <LibraryRecords
        studentDetails={studentDetails || []}
        createLibraryRecord={(values) =>{
          dispatch(addLibraryRecord({ studentId: id, recordData: values })) 
          }
        }
        editLibraryRecordApi={(values) =>{
          dispatch(
            editLibraryRecord({
              studentId: id,
              libraryId: values.libraryId,
              updatedData: {
                bookTitle: values.bookTitle,
                status: values.status,
                returnedDate:
                  values.status === "Returned" ? generateISODate() : null,
              },
            })
          )
         }
        }
      />
      }
    </div>
  );
};

export default StudentProfile;
