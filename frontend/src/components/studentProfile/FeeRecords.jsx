import React, { useState } from "react";
import Button from "../reUsableComponents/Button";
import Modal from "../reUsableComponents/Modal";
import FormComponent from "../reUsableComponents/FormComponent";
import FeesTable from "../FeesTable";
import { useSelector } from "react-redux";

const FeeRecords = ({ studentDetails, createFeeRecord, editFeeRecordApi }) => {
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);


  const btnConfig = {
    label: "New Fee Record",
    type: "button",
    height: "py-2",
    width: "w-[200px]",
    onClick: () => setFeeModalOpen(true),
  };

  const confirmBtnConfig = {
    label: "Create Record",
    type: "submit",
    height: "py-2",
    width: "w-[150px]",
  };

  const fieldConfigs = [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      required: true,
      placeholder: "Enter the amount",
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "text",
      required: true,
      placeholder: "Remarks",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      required: true,
      placeholder: "Paid or Pending",
    },
  ];

  const tableHeaders = ["Amount", "Remark", "Status", "Date", "Actions"];

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <Button config={btnConfig} />
      </div>
      <Modal isOpen={feeModalOpen} setModalOpen={setFeeModalOpen}>
        <FormComponent
          btnConfig={confirmBtnConfig}
          fieldConfigs={fieldConfigs}
          heading="Add Fee Record"
          apiEndpoint={createFeeRecord}
          isModalOpen={setFeeModalOpen}
        />
      </Modal>
      <div className="bg-primary rounded-lg py-4 overflow-auto">
        <h2 className="text-lg font-semibold px-8">Fee Records</h2>
        <FeesTable
          schoolMemebers={studentDetails}
          tableHeaders={tableHeaders}
          editFeeRecordApi={editFeeRecordApi}
        />
      </div>
    </div>
  );
};

export default FeeRecords;