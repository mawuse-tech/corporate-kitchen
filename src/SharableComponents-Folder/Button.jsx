import React from "react";

const Button = ({
  children,           
  loading = false,
  loadingText = "Processing...",
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={`flex justify-center items-center mt-6 px-8 py-3 text-white font-semibold transition duration-150 shadow-lg
        ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800 active:bg-gray-900"}
        ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
