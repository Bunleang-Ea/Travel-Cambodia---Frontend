import React from "react";

const RoleManagementPage = () => {
  // Mock Data for Roles
  const roles = [
    {
      id: 1,
      name: "Super Admin",
      description:
        "Full system access and authority. Can manage all settings and users.",
      iconBg: "bg-emerald-100",
      iconColor: "text-[#009B3E]",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      ),
      users: [
        { initials: "AU", bg: "bg-gray-200 text-gray-700" },
        { initials: "SO", bg: "bg-gray-300 text-gray-800" },
      ],
      userDesc: "Admin User, System Owner",
    },
    {
      id: 2,
      name: "Editor",
      description:
        "Can manage content, reviews, and basic site configurations.",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
      users: [
        { initials: "JD", bg: "bg-blue-100 text-blue-700" },
        { initials: "JS", bg: "bg-indigo-100 text-indigo-700" },
        { initials: "+3", bg: "bg-gray-100 text-gray-500" },
      ],
      userDesc: "John Doe, Jane Smith +3 more",
    },
    {
      id: 3,
      name: "User",
      description: "Use all user features",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-500",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
      users: [{ initials: "12", bg: "bg-emerald-50 text-[#009B3E]" }],
      userDesc: "12 total users",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* 1. Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl">
        {/* Total Roles Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#009B3E] mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">
                Total Roles
              </div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                3
              </div>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">
                Active Users
              </div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">
                148
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Role name"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="Role description"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <button
          type="button"
          disabled
          className="bg-[#009B3E] text-white text-sm font-bold py-2.5 px-4 rounded-lg opacity-60 cursor-not-allowed"
        >
          Add Role
        </button>
      </div>

      {/* 2. Main Table Area */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden">
        {/* Table Header / Actions */}
        <div className="px-6 sm:px-8 py-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-1">
              System Roles
            </h2>
            <p className="text-sm text-gray-500">
              Define and manage access levels for all system modules.
            </p>
          </div>
          <button className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 flex items-center shrink-0">
            <svg
              className="w-5 h-5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Role
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] border-b border-gray-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-1/4">
                  Role Name
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-1/3">
                  Description
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-1/4">
                  Assigned Users
                </th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Role Name */}
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 ${role.iconBg} ${role.iconColor}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {role.icon}
                        </svg>
                      </div>
                      <span className="font-bold text-gray-900">
                        {role.name}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-6">
                    <p className="text-sm text-gray-500 whitespace-normal max-w-xs leading-relaxed">
                      {role.description}
                    </p>
                  </td>

                  {/* Assigned Users */}
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <div className="flex -space-x-2 mb-1.5">
                        {role.users.map((user, index) => (
                          <div
                            key={index}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold ring-2 ring-white z-${10 - index} ${user.bg}`}
                          >
                            {user.initials}
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {role.userDesc}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-6 text-right">
                    <button className="text-gray-400 hover:text-gray-600 mr-4 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-8 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-400 font-medium">
            Showing 3 of 3 roles
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <button className="p-2 text-gray-400 border border-transparent hover:border-gray-200 rounded-md transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-md bg-[#009B3E] text-white shadow-sm">
              1
            </button>
            <button className="p-2 text-gray-400 border border-transparent hover:border-gray-200 rounded-md transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPage;
