import React from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { user, client } = useSelector((state) => state.auth);

  const userName = user?.name;
  const clientName = client?.name;
  const clientCode = client?.code;

  if (!user || !client) return <div className="p-4">Loading...</div>;

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };
  const initials = getInitials(userName);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-50 bg-[#f7eaf1] flex flex-col items-center py-6">
        <NavLink
    to="/settings"
    className={({ isActive }) =>
      `mt-40 w-12 h-12 flex items-center justify-center mb-6 text-gray-800 text-3xl rounded transition-all duration-300 ${
        isActive ? "bg-blue-200" : ""
      }`
    }
  >
    <FiSettings />
  </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-[#f7eaf1] p-5 border-b border-gray-100">
          <div className="flex justify-between items-center pb-3">
            {/* Search Input */}
            <div className="flex items-center border-b border-gray-400 w-full max-w-xs pb-1">
              <FiSearch className="text-gray-500 text-xl mr-3" />
              <input
                type="text"
                placeholder="Enter staff name"
                className="text-gray-700 bg-transparent focus:outline-none w-full placeholder-gray-500 text-[12px]"
              />
            </div>

            {/* Right-side Icons and User */}
            <div className="flex items-center space-x-3 sm:space-x-2">
              <IoIosNotificationsOutline className="text-gray-700 text-2xl cursor-pointer" />
              <span className="text-gray-800 text-sm font-bold hidden sm:block">
                {userName}
              </span>
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                {initials}
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mt-4">
            <p className="text-2xl font-light text-gray-800 tracking-wide">
              {`${clientCode} - ${clientName}`}
            </p>
          </div>
        </div>

        {/* Main Outlet Page Content */}
        <div className="p-6 bg-white flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
