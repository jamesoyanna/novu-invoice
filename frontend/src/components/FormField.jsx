import React from "react";

const FormField = ({ label, name, type, value, onChange, placeholder, error }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}:
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
