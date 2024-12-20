import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Table = ({schoolMemebers, tableHeaders, deleteMemberApi}) => {
  const navigate = useNavigate()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const {user} = useSelector((state)=> state.auth)


  const openDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setSelectedMemberId(id)
  };

  const confirmDelete = () => {
    deleteMemberApi(selectedMemberId);
    setDeleteModalOpen(false);

  };
  // console.log(selectedMemberId)

  const confirmDeleteBtnConfig = [
    {
      label: "cancel",
      type: "button",
      height: "py-1",
      width: "w-[100px]",
      btnColor: "bg-gray-500",
      onClick:() => {
        setDeleteModalOpen(false);
        setSelectedMemberId(null);
      },
    },
    {
      label: "delete",
      type: "submit",
      height: "py-1",
      width: "w-[100px]",
      btnColor: "bg-red-700",
      onClick: confirmDelete,
    },
  ];
  return (
    <>
    
    <table className="w-full mt-4">
    <thead>
      <tr className="text-left text-gray-500 text-sm">
      {tableHeaders.map((header)=>(
        <td key={header} className='px-5 text-sm font-semibold'>{header}</td>
      ))}
      </tr>
    </thead>
    <tbody>
      {schoolMemebers.map((member,index) => (
        <tr key={index} className=" border-t text-sm">
          <td className="py-4 px-5"><div className="flex items-center space-x-2"><img src="Profile.png" className="h-10 w-10"/><span>{member.name}</span></div></td>
          <td className="py-4 px-5">{member.staffId || member.librarianId}</td>
          <td className="py-4 px-5">{member.email}</td>
          <td className="py-4 px-5">
            <div className="flex flex-row space-x-4 text-gray-600">
              <FaEye
                className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200"
                size={18}
                title="View"
                onClick={()=>navigate(`/${member.role}/${member._id}`)}
              />
              {user.role === "admin" &&
              <MdDelete
                className="cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                size={18}
                title="Delete"
                onClick={()=>openDeleteModal(member._id)}
              />
              }
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <Modal isOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
        <div className="flex flex-col items-center justify-center">
          <p>Are you sure you want to delete?</p>
          <div className="flex gap-x-6 mt-2">
            {confirmDeleteBtnConfig.map((btnConf, index) => (
              <Button key={index} config={btnConf} onClick={btnConf.onClick}/>
            ))}
          </div>
        </div>
      </Modal>
    </>
  
  )
}

export default Table