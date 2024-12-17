import React from "react";
import { PiStudent } from "react-icons/pi";


const AuthNavbar = () => {

  return (
    <div className=" bg-primary w-full flex shadow-lg">

      <div className=" items-center space-x-2  text-gray-700 ">
        <PiStudent size={40} className="m-auto"/>
        <h1 className="font-bold"> School Management</h1>
        </div>
      
    </div>
  );
};

export default AuthNavbar;
