import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ShowHidePassword = ({ value, onChange, placeholder, className }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pr-10 border border-gray-300 p-3"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>
  );
};

export default ShowHidePassword;
