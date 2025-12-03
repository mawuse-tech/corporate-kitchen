import React from "react";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {

  return (
    <div className="bg-white">
      <p className="text-[20px] font-light mb-4">Settings</p>

      {/* <Logout/> */}

      <div className="flex gap-6 mb-6">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `pb-1 text-gray-700 hover:text-blue-600 transition ${isActive ? "border-b-2 border-blue-500 text-blue-600" : ""
            }`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="team"
          className={({ isActive }) =>
            `pb-1 text-gray-700 hover:text-blue-600 transition ${isActive ? "border-b-2 border-blue-500 text-blue-600" : ""
            }`
          }
        >
          Team
        </NavLink>
      </div>

      {/* borderline */}
      <div className="border-t border-gray-300"></div>

      <div className="col-span-3 p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
