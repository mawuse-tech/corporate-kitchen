import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import admins from "../../Data-Folder/team-members.json";
import { setTeam } from "../../Redux-Store/Features/Auth-Folder/authSlice";

const TeamPage = () => {
  const dispatch = useDispatch();
  const { user, team } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const sameClientAdmins = admins.filter(a => a.client_id === user.client_id);
      dispatch(setTeam(sameClientAdmins));
    }
  }, [user, dispatch]);

  return (
    <div className="p-6 bg-white rounded-xl max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-[14px] font-semibold text-gray-400">
          Team Members - <span className="text-gray-400">{team.length}</span>
        </h2>
        <div>
          <button className="bg-[#f09205] text-white flex items-center px-3 py-1 shadow-lg">
            <span className="mr-2 text-lg">+</span>
            Invite worker
          </button>
        </div>

      </header>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 ">
          <div className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
            Name
          </div>
          <div className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </div>
          <div className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Phone
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">
          {team.map((member) => (
            <div key={member.id} className="grid grid-cols-3 px-4 py-3 text-sm">
              <div>{member.name}</div>
              <div>{member.email}</div>
              <div>{member.phone}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeamPage;
