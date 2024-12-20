import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffs } from "../redux/accountsSlice";
import { useParams } from "react-router-dom";

const StaffProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { staffs } = useSelector((state) => state.accounts);

  const staffDetails = staffs.filter((staff) => staff._id === id)[0];
  
  useEffect(() => {
    const loadStaffs = async () => {
      try {
        await dispatch(fetchStaffs()).unwrap();
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };
    loadStaffs();
  }, [dispatch]);

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Staff Profile</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Name:</h3>
          <p>{staffDetails?.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Email:</h3>
          <p>{staffDetails?.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Role:</h3>
          <p>{staffDetails?.role}</p>
        </div>
        <div>
          <h3 className="font-semibold">Staff ID:</h3>
          <p>{staffDetails?.staffId}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
