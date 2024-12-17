import React, { useEffect, useState } from "react";
import Button from "../components/reUsableComponents/Button";
import FormComponent from "../components/reUsableComponents/FormComponent";
import Modal from "../components/reUsableComponents/Modal";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import StudentsTable from "../components/reUsableComponents/StudentsTable";
import {
  addStudent,
  deleteStudent,
  fetchStudents,
} from "../redux/studentSlice";

const Students = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);
  const { user, token } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  
  const btnConfig = {
    label: "Add New Student",
    type: "button",
    height: "py-2",
    width: "w-[150px]",
    onClick:()=> setModalOpen(true)
    
  };
  const confirmBtnConfig = {
    label: "create student",
    type: "submit",
    height: "py-2",
    width: "w-[150px]",
  };

  const fieldConfigs = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Full Name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
      validation: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    },
    {
      name: "class",
      label: "Class",
      type: "number",
      required: true,
      placeholder: "enter class",
    },
  ];
  // setSchoolStudents(students.students)
  useEffect(() => {
    const loadStudents = async () => {
      try {
        await dispatch(fetchStudents(token)).unwrap();
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    loadStudents();
  }, [dispatch, token]);

  const handleAddStudent = async (values) => {
    try {
      await dispatch(addStudent(values)).unwrap();
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await dispatch(deleteStudent(id)).unwrap();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const tableHeaders = ["Name", "Student ID", "Class", "Email", "Actions"];

  return (
    <div>
      <Modal isOpen={modalOpen} setModalOpen={setModalOpen}>
        <FormComponent
          btnConfig={confirmBtnConfig}
          fieldConfigs={fieldConfigs}
          heading="Add new student"
          apiEndpoint={handleAddStudent}
          isModalOpen={setModalOpen}
        />
      </Modal>
      <div className="m-4">
        <div className="flex justify-end my-2">
          {user.role === "admin" && (
            <Button
              onClick={() => setModalOpen((prev) => !prev)}
              config={btnConfig}
            />
          )}
        </div>
        <div className=" bg-primary rounded-lg py-4 overflow-auto">
          <h2 className="text-lg font-semibold px-8">All Students</h2>
          <StudentsTable
            schoolMemebers={students}
            tableHeaders={tableHeaders}
            deleteStudentsApi={handleDeleteStudent}
          />
        </div>
      </div>
    </div>
  );
};

export default Students;
