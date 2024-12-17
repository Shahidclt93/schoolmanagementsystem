import React from "react";
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import SigninPage from "../pages/SignInPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import StaffsPage from "../pages/StaffsPage.jsx";
import StudentsPage from "../pages/StudentsPage.jsx";
import LibrariansPage from "../pages/LibrariansPage.jsx";
import ProtectedRoute from "../utils/Auth.jsx";
import StudentProfilePage from "../pages/StudentProfilePage.jsx";
import StaffProfilePage from "../pages/StaffProfilePage.jsx";
import LibrarianProfilePage from "../pages/LibrarianProfilePage.jsx";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Navigate to="/sign-in" /> },
      { path: "/sign-in", element: <SigninPage /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/staffs", element: <StaffsPage /> },
      { path: "/students", element: <StudentsPage /> },
      { path: "/librarians", element: <LibrariansPage /> },
      { path: "/student/:id", element: <StudentProfilePage /> },
      { path: "/staff/:id", element: <StaffProfilePage /> },
      { path: "/librarian/:id", element: <LibrarianProfilePage /> },
    ],
  },
]);

export default MainRouter;
