import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibrarians } from "../redux/accountsSlice";
import { useParams } from "react-router-dom";

const LibrarianProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { librarians } = useSelector((state) => state.accounts);

  const librarianDetails = librarians.filter(
    (librarian) => librarian._id === id
  )[0];
  
  useEffect(() => {
    const loadLibrarians = async () => {
      try {
        await dispatch(fetchLibrarians()).unwrap();
      } catch (error) {
        console.error("Error fetching librarian:", error);
      }
    };
    loadLibrarians();
  }, [dispatch]);

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Librarian Profile</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Name:</h3>
          <p>{librarianDetails?.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Email:</h3>
          <p>{librarianDetails?.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Role:</h3>
          <p>{librarianDetails?.role}</p>
        </div>
        <div>
          <h3 className="font-semibold">Librarian ID:</h3>
          <p>{librarianDetails?.librarianId}</p>
        </div>
      </div>
    </div>
  );
};

export default LibrarianProfile;
