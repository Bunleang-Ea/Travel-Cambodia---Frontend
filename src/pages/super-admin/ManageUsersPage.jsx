import React from "react";
import { Link } from "react-router-dom";

const ManageUsersPage = () => {
  // Mock Data for the Table
  const users = [
    {
      id: 1,
      initials: "SK",
      color: "bg-emerald-100 text-emerald-600",
      name: "Sovanndara Keo",
      email: "sovanndara.k@travelcambodia.com",
      role: "SUPER ADMIN",
      roleBg: "bg-emerald-100 text-emerald-700",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      initials: "LC",
      color: "bg-green-100 text-green-600",
      name: "Leakhena Chhay",
      email: "l.chhay@travelcambodia.com",
      role: "EDITOR",
      roleBg: "bg-green-50 text-green-600",
      status: "Active",
      lastLogin: "Yesterday",
    },
    {
      id: 3,
      initials: "BR",
      color: "bg-gray-100 text-gray-600",
      name: "Bora Rath",
      email: "bora.rath@external.com",
      role: "USER",
      roleBg: "bg-gray-100 text-gray-500",
      status: "Active",
      lastLogin: "1 month ago",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Manage Users
          </h2>
          <p className="text-sm text-gray-500">
            Control administrative access and manage user accounts across the
            platform.
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Add New User
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Full name"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <select
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="USER">User</option>
          <option value="EDITOR">Editor</option>
          <option value="SUPER ADMIN">Super Admin</option>
        </select>
        <button
          type="button"
          disabled
          className="bg-[#009B3E] text-white text-sm font-bold py-2.5 px-4 rounded-lg opacity-60 cursor-not-allowed"
        >
          Add User
        </button>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Active Users */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              Active Users
            </div>
            <div className="text-4xl font-black text-[#009B3E] tracking-tight mb-2">
              12,482
            </div>
            <div className="text-xs font-bold text-[#009B3E] flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              +12% this month
            </div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#009B3E]">
            <svg
              className="w-7 h-7"
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
        </div>

        {/* New Signups */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              New Signups
            </div>
            <div className="text-4xl font-black text-[#009B3E] tracking-tight mb-2">
              842
            </div>
            <div className="text-xs font-bold text-gray-400">Last 24 hours</div>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Users Table Container */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden mb-8">
        {/* Table Toolbar / Tabs */}
        <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 bg-[#e6f7ec] text-[#009B3E] rounded-lg text-sm font-bold">
              All Users
            </button>
            <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors">
              Admins
            </button>
            <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors">
              Editors
            </button>
            <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors">
              Users
            </button>
          </div>
          <div className="flex items-center text-sm font-bold text-gray-500 gap-2">
            <button className="p-2 hover:bg-gray-50 rounded-md">
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
            <span>
              Sort by:{" "}
              <span className="text-gray-900 cursor-pointer">Newest</span>
            </span>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-1/3">
                  User
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Last Login
                </th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 ${user.color}`}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 leading-none mb-1">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2.5 py-1 inline-flex text-[10px] font-extrabold rounded-md uppercase tracking-widest ${user.roleBg}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div
                      className={`flex items-center text-xs font-bold ${user.status === "Active" ? "text-[#009B3E]" : "text-gray-500"}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${user.status === "Active" ? "bg-[#009B3E]" : "bg-gray-400"}`}
                      ></div>
                      {user.status}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-500">
                      {user.lastLogin}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
                        Deactivate
                      </button>
                      <button className="text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 text-red-500 hover:bg-red-50">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-400 font-medium">
            Showing 1 to 3 of 14 users
          </div>
          <div className="flex items-center gap-1 text-sm font-bold">
            <button className="px-3 py-1.5 text-gray-400 border border-transparent hover:border-gray-200 rounded-md transition-colors">
              Previous
            </button>
            <button className="w-8 h-8 rounded-md bg-[#e6f7ec] text-[#009B3E]">
              1
            </button>
            <button className="w-8 h-8 rounded-md text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-md transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Role Assignment Card */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Role Assignment</h3>
            <Link
              to="/super-admin/roles"
              className="text-xs font-bold text-[#009B3E] hover:underline"
            >
              Manage All Roles
            </Link>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-200 mb-8">
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
              Quick Assign Role
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:border-[#009B3E]">
                  <option>Select User...</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:border-[#009B3E]">
                  <option>Select Role...</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-[#0F172A] hover:bg-black text-white text-sm font-bold rounded-lg transition-colors">
              Update Role
            </button>
          </div>

          <div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Role Definitions
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center text-sm font-bold text-gray-900">
                  <svg
                    className="w-4 h-4 text-[#009B3E] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Super Admin
                </div>
                <span className="text-xs text-gray-400">
                  Full system access
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center text-sm font-bold text-gray-900">
                  <svg
                    className="w-4 h-4 text-[#009B3E] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Editor
                </div>
                <span className="text-xs text-gray-400">
                  Content & destinations only
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Password & Security Card */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Password & Security
          </h3>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-[#e6f7ec] text-[#009B3E] flex items-center justify-center shrink-0 mr-4">
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                Force Password Reset
              </h4>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Request a user to change their password upon their next login.
                This will invalidate existing sessions.
              </p>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="User email or ID..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009B3E]"
                />
                <button className="px-6 py-2 bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Discard Changes
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-8 py-2.5 bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
        >
          Apply Global Changes
        </button>
      </div>
    </div>
  );
};

export default ManageUsersPage;
