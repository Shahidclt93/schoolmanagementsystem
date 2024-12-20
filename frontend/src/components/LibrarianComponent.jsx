import React, { useEffect, useState } from "react";
import Button from "./reUsableComponents/Button";
import FormComponent from "./reUsableComponents/FormComponent";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./reUsableComponents/Modal";
import Table from "./reUsableComponents/Table";
import {
  createAccount,
  deleteAccount,
  fetchLibrarians,
} from "../redux/accountsSlice";

const LibrarianComponent = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { librarians } = useSelector((state) => state.accounts);
  const [modalOpen, setModalOpen] = useState(false);

  const btnConfig = {
    label: "Create New Librarian",
    type: "button",
    height: "py-2",
    width: "w-[200px]",
    onClick:() => setModalOpen(true)

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
      readOnly: true,
    },
  ];
  const tableHeaders = ["Name", "Librarian ID", "Email", "Actions"];

  useEffect(() => {
    const loadLibrarians = async () => {
      try {
         await dispatch(fetchLibrarians()).unwrap();
      } catch (error) {
        console.error("Error fetching librarians:", error);
      }
    };
    loadLibrarians();
  }, [dispatch, token]);

  const createLibrarian = async (values) => {
    try {
      await dispatch(createAccount(values)).unwrap();
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating librarian:", error);
    }
  };

  const deleteLibrarian = async (id) => {
    try {
      await dispatch(deleteAccount(id)).unwrap();
    } catch (error) {
      console.error("Error deleting librarian:", error);
    }
  };

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
            apiEndpoint={createLibrarian}
            isModalOpen={setModalOpen}
            initialValues={{role:"librarian"}}
          />
        </Modal>
        <div className=" bg-primary rounded-lg py-4  overflow-auto">
          <h2 className="text-lg font-semibold px-8">All Librarians</h2>

          <Table
            tableHeaders={tableHeaders}
            schoolMemebers={librarians}
            deleteMemberApi={deleteLibrarian}
          />
        </div>
      </div>
    </div>
  );
};

export default LibrarianComponent;
