import React, { useEffect, useState } from "react";
import Card from "../components/reUsableComponents/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentSlice";
import { fetchLibrarians, fetchStaffs } from "../redux/accountsSlice";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);
  const { staffs, librarians } = useSelector((state) => state.accounts);

  const dispatch = useDispatch();

  useEffect(() => {
    const getSchoolData = async () => {
      try {
        await dispatch(fetchStudents(token)).unwrap();
        await dispatch(fetchLibrarians(token)).unwrap();
        await dispatch(fetchStaffs(token)).unwrap();
      } catch (error) {
        console.error("fetching data failed", error);
      }
    };
    getSchoolData();
  }, []);

  // console.log(students.students?.length)
  return (
    <div className=" p-4  ">
      <div className="bg-primary mt-4 gap-4 shadow-lg flex flex-wrap rounded-md p-2 justify-evenly">
        <Card usersLength={students?.length} userType="students" />
        <Card usersLength={staffs?.length} userType="staffs" />
        <Card usersLength={librarians?.length} userType="librarians" />
      </div>
    </div>
  );
};

export default Dashboard;
