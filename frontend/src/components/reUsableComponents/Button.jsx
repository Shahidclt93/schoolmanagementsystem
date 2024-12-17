import React from "react";

const Button = ({config , disabled}) => {
    const { label, type, height, btnColor= "bg-blue", width = "w-full" , onClick} = config;
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${width} ${height} ${btnColor} hover:bg-opacity-90 disabled:bg-opacity-60 text-primary mt-1`}
    >
      {label}
    </button>
  );
};

export default Button;
