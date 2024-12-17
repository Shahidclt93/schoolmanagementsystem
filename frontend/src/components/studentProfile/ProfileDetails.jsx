import React from 'react';

const ProfileDetails = ({ name, email, className, studentId }) => (
  <div className="bg-white rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Student Profile</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold">Name:</h3>
        <p>{name}</p>
      </div>
      <div>
        <h3 className="font-semibold">Email:</h3>
        <p>{email}</p>
      </div>
      <div>
        <h3 className="font-semibold">Class:</h3>
        <p>{className}</p>
      </div>
      <div>
        <h3 className="font-semibold">Student ID:</h3>
        <p>{studentId}</p>
      </div>
    </div>
  </div>
);

export default ProfileDetails;
