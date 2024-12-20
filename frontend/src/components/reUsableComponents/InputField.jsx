import React from "react";

const InputField = ({ field, value, error, touched, onBlur, onChange }) => {
  const {
    name,
    type,
    placeholder,
    label,
    width = "w-full",
    height = "p-2",
    required,
    readOnly,
    
  } = field;

  return (
    <div>
      <label htmlFor={name} className="block text-sm">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || "" }
        onChange={onChange}
        onBlur={onBlur}
        className={`block text-sm ${width} ${height} border border-gray-300 focus:outline-blue`}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
      />
      {touched && error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
