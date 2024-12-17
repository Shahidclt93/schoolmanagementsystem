import React, { useState } from "react";
import * as Yup from "yup";
import FormComponent from "./reUsableComponents/FormComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMessage, setLoginMessage] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const fieldConfigs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
      validation: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Enter your password",
      validation: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@])(?=.*\d)[A-Za-z\d@]{8,}$/,
          "Password must contain at least 8 characters, including uppercase, lowercase, number, and @"
        ),
    },
  ];

  const btnConfig = { label: "Sign In", type: "submit", height: "py-2" };

  const apiEndpoint = async (values) => {
    try {
      await dispatch(login(values)).unwrap(); 
      setLoginMessage("Signin succussful");
      setTimeout(()=>{
        navigate("/dashboard");
      },1000)
    } catch (error) {
      console.error("Login failed:", error);
      setLoginMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-40px)] bg-lightblue p-4 w-full">
      <div className="bg-primary p-6 w-96 shadow-md">
        {/* Login message  */}
        {loginMessage && (
          <h2
            className={`${
              isAuthenticated ? "bg-[#6cbf6c]" : "bg-[#f6807c]"
            } text-gray-800 text-sm text-center px-4 py-1 rounded-md mt-2`}
          >
            {loginMessage}
          </h2>
        )}

        <div className="mt-2">
          <FormComponent
            fieldConfigs={fieldConfigs}
            btnConfig={btnConfig}
            heading="Sign In"
            forgotPassword={true}
            apiEndpoint={apiEndpoint}
          />

          <p className="text-sm mt-2">
            Don't have an account yet?{" "}
            <a href="#" className="text-sm text-blue hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
