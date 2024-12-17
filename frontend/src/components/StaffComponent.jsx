import React, { useEffect, useState } from "react";
import Button from "../components/reUsableComponents/Button";
import FormComponent from "../components/reUsableComponents/FormComponent";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/reUsableComponents/Modal";
import Table from "../components/reUsableComponents/Table";
import {
  createAccount,
  deleteAccount,
  fetchStaffs,
} from "../redux/accountsSlice";

const StaffComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [schoolStaffs, setSchoolStaffs] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const btnConfig = {
    label: "Create New Staff",
    type: "button",
    height: "py-2",
    width: "w-[150px]",
    onClick:() => setModalOpen((prev) => !prev)

  };
  const confirmBtnConfig = {
    label: "create account",
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
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Enter your password",
      validation: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@])(?=.*\d)[A-Za-z\d@]{8,}$/,
          "Password must contain at least 8 characters, including uppercase, lowercase, number, and @"
        ),
    },
    {
      name: "role",
      label: "Role",
      type: "text",
      defaultValue: "staff",
      readOnly: true,
    },
  ];

  useEffect(() => {
    const loadStaffs = async () => {
      try {
        const data = await dispatch(fetchStaffs()).unwrap();
        setSchoolStaffs(data.data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };
    loadStaffs();
  }, [dispatch]);

  const createStaff = async (values) => {
    try {
      await dispatch(createAccount(values)).unwrap();
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating staff:", error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await dispatch(deleteAccount(id)).unwrap();
      setSchoolStaffs((prev) => prev.filter((staff) => staff._id !== id));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const tableHeaders = ["Name", "Staff ID", "Email", "Actions"];

  return (
    <div>
      <div className="m-4">
        {user.role === "admin" ? (
          <div className="flex justify-end my-2">
            <Button config={btnConfig} />
          </div>
        ) : null}
        <Modal isOpen={modalOpen} setModalOpen={setModalOpen}>
          <FormComponent
            btnConfig={confirmBtnConfig}
            fieldConfigs={fieldConfigs}
            heading="Create New Account"
            apiEndpoint={createStaff}
            isModalOpen={setModalOpen}
          />
        </Modal>
        <div className=" bg-primary rounded-lg py-4  overflow-auto">
          <h2 className="text-lg font-semibold px-8">All Staffs</h2>

          <Table
            tableHeaders={tableHeaders}
            schoolMemebers={schoolStaffs}
            deleteMemberApi={deleteStaff}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffComponent;
 