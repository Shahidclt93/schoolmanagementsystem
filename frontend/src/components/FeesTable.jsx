import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "./reUsableComponents/Modal";
import FormComponent from "./reUsableComponents/FormComponent";
import { setFeeId } from "../redux/idSlice";
import { useDispatch, useSelector } from "react-redux";

const FeesTable = ({ schoolMemebers, tableHeaders, editFeeRecordApi }) => {
  const dispatch = useDispatch();
  const [selectedFeeRecord, setSelectedFeeRecord] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
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

  const openEditModal = (feeRecord) => {
    setEditModalOpen(true);
    setSelectedFeeRecord(feeRecord);
    dispatch(setFeeId(feeRecord._id));
  };

  const confirmEdit = (values) => {
    editFeeRecordApi(values);
  };
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
            {tableHeaders.map((header) => {
              const shouldRenderActions =
                header === "Actions" &&
                (user.role === "staff" || user.role === "admin");

              if (header === "Actions" && !shouldRenderActions) return null;

              return (
                <td key={header} className="px-5 text-sm font-semibold">
                  {header}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {schoolMemebers.feesHistory &&
          schoolMemebers.feesHistory?.length > 0 ? (
            schoolMemebers.feesHistory.map((feesHis, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="py-4 px-5">{feesHis.amount}</td>
                <td className="py-4 px-5">{feesHis.remarks}</td>
                <td className={`py-4 px-5 `}>
                  <span
                    className={`text-primary text-xs rounded-lg py-[1px] px-1  ${
                      feesHis.status === "Pending"
                        ? "bg-gray-400"
                        : "bg-green-500"
                    }`}
                  >
                    {feesHis.status}
                  </span>
                </td>
                <td className="py-4 px-5">{formatDate(feesHis.date)}</td>
                {user.role === "admin" || user.role === "staff" ? (
                  <td className="py-4 px-5">
                    <div className="flex flex-row space-x-4 text-gray-600">
                      <FaEdit
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        size={18}
                        title="Edit"
                        onClick={() => openEditModal(feesHis)}
                      />
                    </div>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr className="border-t text-sm">
              <td colSpan="7" className="py-4 px-5 text-center">
                No fee history available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal isOpen={editModalOpen} setModalOpen={setEditModalOpen}>
        <FormComponent
          btnConfig={editBtnConfig}
          fieldConfigs={fieldConfigs}
          heading="Edit Fee Record"
          initialValues={
            selectedFeeRecord || { amount: "", remarks: "", status: "" }
          }
          apiEndpoint={confirmEdit}
          isModalOpen={setEditModalOpen}
        />
      </Modal>
    </>
  );
};

export default FeesTable;
