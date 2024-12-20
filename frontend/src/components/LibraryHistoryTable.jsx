import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "../components/reUsableComponents/Modal";
import FormComponent from "./reUsableComponents/FormComponent";
import { setLibraryId } from "../redux/idSlice";
import { useDispatch, useSelector } from "react-redux";

const LibraryHistoryTable = ({
  booksData,
  tableHeaders,
  editLibraryRecordApi,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBookRecord, setSelectedBookRecord] = useState(null);

  const openEditModal = (book) => {
    setEditModalOpen(true);
    setSelectedBookRecord(book);
    dispatch(setLibraryId(book._id));
  };
  const confirmEdit = (values) => {
    editLibraryRecordApi(values);
  };

  const fieldConfigs = [
    {
      name: "bookTitle",
      label: "Book Title",
      type: "text",
      required: true,
      placeholder: "Enter the book title",
    },

    {
      name: "status",
      label: "Status",
      type: "text",
      required: true,
      placeholder: "Issued or Returned",
    },
  ];

  const editBtnConfig = {
    label: "Edit Record",
    type: "submit",
    height: "py-2",
    width: "w-[150px]",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to a readable format
  };

  return (
    <>
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {tableHeaders.map((header) => (
              <td key={header} className="px-5 text-sm font-semibold">
                {header}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {booksData && booksData.libraryHistory?.length > 0 ? (
            booksData.libraryHistory.map((book, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="py-4 px-5">{book.bookTitle}</td>
                <td className="py-4 px-5">{formatDate(book.issuedDate)}</td>
                <td className="py-4 px-5">
                  {book.returnedDate
                    ? formatDate(book.returnedDate)
                    : "Not Returned"}
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`text-primary text-xs rounded-lg py-[1px] px-1 ${
                      book.status === "Issued" ? "bg-gray-400" : "bg-green-500"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                {user.role === "admin" || user.role === "staff" ? (
                  <td className="py-4 px-5">
                    <div className="flex flex-row space-x-4 text-gray-600">
                      <FaEdit
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        size={18}
                        title="Edit"
                        onClick={() => openEditModal(book)}
                      />
                    </div>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr className="border-t text-sm">
              <td colSpan="5" className="py-4 px-5 text-center">
                No book records available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal isOpen={editModalOpen} setModalOpen={setEditModalOpen}>
        <FormComponent
          btnConfig={editBtnConfig}
          fieldConfigs={fieldConfigs}
          heading="Edit Library Record"
          initialValues={selectedBookRecord || { bookTitle: "", status: "" }}
          apiEndpoint={confirmEdit}
          isModalOpen={setEditModalOpen}
        />
      </Modal>
    </>
  );
};

export default LibraryHistoryTable;
