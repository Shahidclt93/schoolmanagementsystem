import React, { useState } from 'react';
import Button from '../reUsableComponents/Button';
import Modal from '../reUsableComponents/Modal';
import FormComponent from '../reUsableComponents/FormComponent';
import LibraryHistoryTable from '../LibraryHistoryTable';

const LibraryRecords = ({ studentDetails, createLibraryRecord, editLibraryRecordApi }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const addLibBtnConfig = {
    label: "New Library Record",
    type: "button",
    height: "py-2",
    width: "w-[200px]",
    onClick: ()=> setModalOpen(true)
  };
  const confirmBtnConfig = {
    label: "Create Record",
    type: "submit",
    height: "py-2",
    width: "w-[150px]",

  };

  const fieldConfigs = [
    { name: "bookTitle", label: "Book Title", type: "text", required: true, placeholder: "Enter the book title" },
    { name: "status", label: "Status", type: "text", required: true, placeholder: "Issued or Returned" },
  ];

  const tableHeaders = ["Book Title", "Issued Date", "Returned Date", "Status", "Actions"];

 

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <Button config={addLibBtnConfig} />
      </div>
      <Modal isOpen={modalOpen} setModalOpen={setModalOpen}>
        <FormComponent
          btnConfig={confirmBtnConfig}
          fieldConfigs={fieldConfigs}
          heading="Add Library Record"
          apiEndpoint={createLibraryRecord}
          isModalOpen={setModalOpen}

        />
      </Modal>
   
      <div className="bg-primary rounded-lg py-4 overflow-auto">
        <h2 className="text-lg font-semibold px-8">Library History</h2>
        <LibraryHistoryTable
          booksData={studentDetails}
          tableHeaders={tableHeaders}
          editLibraryRecordApi={editLibraryRecordApi}
        />
      </div>
    </div>
  );
};

export default LibraryRecords;
