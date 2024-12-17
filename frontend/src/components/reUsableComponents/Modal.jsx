import React from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, setModalOpen, children }) => {

  if (!isOpen) return null;
  
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-secondary bg-opacity-50 w-full flex justify-center items-center px-2"
      onClick={closeModal}
    >
      <div
        className={`bg-primary w-full sm:w-1/3 p-6 shadow-lg relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosClose
          size={35}
          className="text-gray-500 cursor-pointer absolute top-2 right-2"
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
