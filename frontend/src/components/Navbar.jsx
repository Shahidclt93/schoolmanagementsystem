import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/authSlice";

const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector ((state) => state.auth);


  const [dropDownOpen, setDropDownOpen] = useState(false);



  return (
    <div className="py-4 bg-primary shadow-md w-full flex justify-end px-2">
      <RxHamburgerMenu
        size={30}
        className={`md:hidden absolute top-4 left-2 ${sidebarOpen && "hidden"}`}
        onClick={() => setSidebarOpen(true)}
      />
      <div className="flex space-x-2">
        <div className=" ">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm">{user.role}</p>
        </div>
        <div
          className="bg-gray-500 h-10 w-10 rounded-full relative cursor-pointer"
          onClick={() => setDropDownOpen((prev) => !prev)}
        >
          <div
            className={`absolute shadow-md text-gray-700 top-10 right-4 ${
              dropDownOpen ? "block" : "hidden"
            }`}
          >
            <ul className=" overflow-hidden rounded-md bg-primary text-sm shadow-md">
              <li className="py-1 px-8 hover:bg-gray-100 border-b">profile</li>
              <li
                className="py-1 px-8 hover:bg-gray-100"
                onClick={() => {
                  dispatch(logout()), navigate("/");
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
