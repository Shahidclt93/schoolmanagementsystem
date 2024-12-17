import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const {token}  = useSelector((state) => state.auth);
    // console.log(userToken)

  if (!token) {
    // Redirect the user to the login page if they are not authenticated
    return <Navigate to="/sign-in" replace/>
  }

  // If the user is authenticated, allow them to access the route
  return children;
};

export default ProtectedRoute;
