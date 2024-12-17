import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const sidebarItems = [
    {
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <PiStudent />,
      label: "Students",
      href: "/students",
    },
    {
      icon: <LiaChalkboardTeacherSolid />,
      label: "Staffs",
      href: "/staffs",
    },

    {
      icon: <MdOutlineLocalLibrary />,
      label: "Librarians",
      href: "/librarians",
    },
  ];

  return (
    <div
      className={`inset-0 bg-[#00000098] ${sidebarOpen && "fixed"}`}
      onClick={() => setSidebarOpen(false)}
    >
      <div
        className={`px-2 fixed md:static bg-primary shadow-md h-full duration-100 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosClose
          size={35}
          className={`text-gray-500 cursor-pointer absolute top-2 right-1 md:hidden `}
          onClick={() => setSidebarOpen(false)}
        />
        <div className=" items-center space-x-2 pt-2 pb-6 text-gray-700 md:hidden lg:block ">
          <PiStudent size={40} className="m-auto" />
          <h1 className="font-bold text-center"> School Management</h1>
        </div>
        {sidebarItems.map((item) => (
          <div className="flex flex-col gap-2" key={item.label}>
            <Link
              to={item.href}
              key={item.label}
              className="flex items-center px-4 md:justify-center lg:justify-start gap-4 text-gray-500 py-4 md:px-2 rounded-md hover:bg-lightblue"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="md:hidden lg:block ">{item.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
