import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchLibrarians } from '../redux/accountsSlice';
import { useParams } from 'react-router-dom';

const LibrarianProfile = () => {
    const [librarianDetails, setLibrarianDetails] = useState([])
    const dispatch = useDispatch()
    const params = useParams()
    const {id} = params
     useEffect(() => {
        const loadLibrarians = async () => {
          try {
            const response = await dispatch(fetchLibrarians()).unwrap();
            const data = response.data.filter((librarian) => librarian._id === id);
            setLibrarianDetails(data[0]);
          } catch (error) {
            console.error("Error fetching librarian:", error);
          }
        };
        loadLibrarians();
      }, [dispatch]);
      console.log(librarianDetails)

  return (
    <div className="bg-white rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Librarian Profile</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold">Name:</h3>
        <p>{librarianDetails.name}</p>
      </div>
      <div>
        <h3 className="font-semibold">Email:</h3>
        <p>{librarianDetails.email}</p>
      </div>
      <div>
        <h3 className="font-semibold">Role:</h3>
        <p>{librarianDetails.role}</p>
      </div>
      <div>
        <h3 className="font-semibold">Librarian ID:</h3>
        <p>{librarianDetails.librarianId}</p>
      </div>
    </div>
  </div>
  )
}

export default LibrarianProfile