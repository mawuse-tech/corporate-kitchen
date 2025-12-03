import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../Redux-Store/Features/Auth-Folder/authActions";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.info("Logged out successfully!");
    navigate("/login"); // go back to login page
  };

  return (
    <header className="p-4 flex justify-end bg-gray-100">
      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Logout;
