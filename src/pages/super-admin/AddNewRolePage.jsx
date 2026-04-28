import React, { useState } from "react";

const Checkbox = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors border-2 shrink-0 ${
      checked
        ? "bg-[#009B3E] border-[#009B3E]"
        : "border-gray-200 bg-white hover:border-[#009B3E]"
    }`}
  >
    {checked && (
      <svg
        className="w-3.5 h-3.5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M5 13l4 4L19 7"
        />
      </svg>
    )}
  </div>
);

const AddNewRolePage = () => {
  // Mock Data for Assignable Users
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@system.com",
      initials: "JD",
      bg: "bg-gray-100 text-gray-600",
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice.s@system.com",
      initials: "AS",
      bg: "bg-gray-100 text-gray-600",
    },
    {
      id: 3,
      name: "Marcus Brown",
      email: "m.brown@system.com",
      initials: "MB",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@system.com",
      initials: "SW",
      bg: "bg-indigo-50 text-indigo-600",
    },
    {
      id: 5,
      name: "Robert King",
      email: "r.king@system.com",
      initials: "RK",
      bg: "bg-gray-100 text-gray-600",
    },
    {
      id: 6,
      name: "Laura Lane",
      email: "l.lane@system.com",
      initials: "LL",
      bg: "bg-gray-100 text-gray-600",
    },
  ];

  // Simple state to manage selected users and permissions for interactive feel
  const [selectedUsers, setSelectedUsers] = useState([1, 2]); // John & Alice selected by default
  const [selectedPermissions, setSelectedPermissions] = useState([
    "manage_places",
    "manage_categories",
  ]);

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const togglePermission = (id) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((permId) => permId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
      {/* 1. Page Header (Back Button & Title) */}
      <div className="flex items-center mb-8">
        <button className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50 mr-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Add New Role
        </h2>
      </div>

      <div className="space-y-6">
        {/* 2. Create Security Role Card */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#009B3E] mr-4">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Create Security Role
              </h3>
              <p className="text-xs text-gray-500">
                Define basic identification for the new system role.
              </p>
            </div>
          </div>

          <div className="space-y-5 pl-14">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Role Name
              </label>
              <input
                type="text"
                placeholder="e.g., Regional Manager"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Briefly describe the responsibilities and scope of this role..."
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* 3. Assign Users Card */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mr-4 shrink-0">
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Assign Users
                </h3>
                <p className="text-xs text-gray-500">
                  Select users to associate with this role immediately.
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-xs font-medium"
              />
            </div>
          </div>

          <div className="pl-0 sm:pl-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 rounded-xl border transition-colors cursor-pointer hover:bg-gray-50 ${
                    selectedUsers.includes(user.id)
                      ? "border-[#009B3E] bg-emerald-50/30"
                      : "border-transparent"
                  }`}
                  onClick={() => toggleUser(user.id)}
                >
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold ml-4 mr-3 shrink-0 ${user.bg}`}
                  >
                    {user.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end items-center gap-4">
              <button className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">
                View More Members{" "}
                <svg
                  className="w-3 h-3 inline-block ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <button className="text-xs font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center">
                Next{" "}
                <svg
                  className="w-3 h-3 inline-block ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 4. Permissions Matrix Card */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#009B3E] mr-4">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Permissions Matrix
              </h3>
              <p className="text-xs text-gray-500">
                Select specific access levels for this role across the system.
              </p>
            </div>
          </div>

          <div className="pl-0 sm:pl-14 space-y-8">
            {/* Section: Content Management */}
            <div>
              <h4 className="text-[10px] font-extrabold text-[#009B3E] uppercase tracking-widest mb-4">
                Content Management
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("manage_places")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes("manage_places")}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 group-hover:text-[#009B3E] transition-colors">
                      Can Manage Places
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Full access to add, edit, and remove destinations from the
                      directory.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("manage_categories")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes(
                        "manage_categories",
                      )}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 group-hover:text-[#009B3E] transition-colors">
                      Can Manage Categories
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Create, update, and deactivate place categories.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("edit_reviews")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes("edit_reviews")}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 group-hover:text-[#009B3E] transition-colors">
                      Can Edit Reviews
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Moderate and update user-submitted reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: System Management */}
            <div>
              <h4 className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest mb-4">
                System Management
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("manage_users")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes("manage_users")}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
                      Can Manage Users
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Create, update, and deactivate system user accounts.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("modify_roles")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes("modify_roles")}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
                      Can Modify Roles
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Adjust the hierarchy and naming of system roles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: View Contents */}
            <div>
              <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">
                View Contents
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("view_contents")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes("view_contents")}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 transition-colors">
                      Can View Contents
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Permission to browse and view all public content.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => togglePermission("submit_reviews")}
                >
                  <div className="mt-0.5">
                    <Checkbox
                      checked={selectedPermissions.includes("submit_reviews")}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-bold text-gray-900 transition-colors">
                      Can Submit Reviews
                    </h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Permission to post ratings, comments, and photos on
                      places.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Static Bottom Action Bar (Stays on page naturally) */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center text-gray-500">
            <svg
              className="w-5 h-5 mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs font-medium">
              Standard admin roles are audit-logged.
              <br className="hidden sm:block" /> Review all selections before
              saving.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-3"
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full sm:w-auto flex items-center justify-center bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-3 px-6 rounded-lg shadow-sm transition duration-200"
            >
              Save Role & Permissions
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewRolePage;
