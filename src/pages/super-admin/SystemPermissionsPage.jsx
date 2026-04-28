import React, { useState } from "react";

const SystemPermissionsPage = () => {
  // Mock Data for Permissions Grouped by Section
  const initialPermissions = [
    {
      section: "CONTENT MANAGEMENT",
      items: [
        {
          id: "manage_places",
          name: "Can Manage Places",
          desc: "Full access to add, edit, and remove destinations from the directory",
          superAdmin: true,
          editor: true,
          user: false,
        },
        {
          id: "manage_categories",
          name: "Can Manage Categories",
          desc: "Create, update, and deactivate place categories",
          superAdmin: true,
          editor: true,
          user: false,
        },
        {
          id: "edit_reviews",
          name: "Can Edit Reviews",
          desc: "Moderate and update user-submitted reviews",
          superAdmin: true,
          editor: true,
          user: false,
        },
      ],
    },
    {
      section: "SYSTEM MANAGEMENT",
      items: [
        {
          id: "manage_users",
          name: "Can Manage Users",
          desc: "Create, update, and deactivate system user accounts",
          superAdmin: true,
          editor: false,
          user: false,
        },
        {
          id: "modify_roles",
          name: "Can Modify Roles",
          desc: "Adjust the hierarchy and naming of system roles",
          superAdmin: true,
          editor: false,
          user: false,
        },
      ],
    },
    {
      section: "VIEW CONTENTS",
      items: [
        {
          id: "view_contents",
          name: "Can View Contents",
          desc: "Permission to browse and view all public content.",
          superAdmin: true,
          editor: true,
          user: true,
        },
        {
          id: "submit_reviews",
          name: "Can Submit Reviews",
          desc: "Permission to post ratings, comments, and photos on places.",
          superAdmin: true,
          editor: true,
          user: true,
        },
      ],
    },
  ];

  const [permissions, setPermissions] = useState(initialPermissions);

  // Custom Checkbox Component to match the specific mockup styling
  const CustomCheckbox = ({ checked, onChange, disabled }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={`w-5 h-5 rounded flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#009B3E] ${
        checked
          ? "bg-[#009B3E] border-transparent"
          : "border-2 border-gray-200 bg-white hover:border-[#009B3E]"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
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
    </button>
  );

  // Handler for toggling checkboxes
  const handleToggle = (sectionIndex, itemIndex, role) => {
    // Prevent unchecking Super Admin (optional logic based on standard admin UX)
    if (role === "superAdmin") return;

    const newPermissions = [...permissions];
    newPermissions[sectionIndex].items[itemIndex][role] =
      !newPermissions[sectionIndex].items[itemIndex][role];
    setPermissions(newPermissions);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* 1. Page Header & Top Stats */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            System Permissions
          </h2>
          <p className="text-sm text-gray-500">
            Configure and map system-level permissions to administrative roles.
          </p>
        </div>

        {/* Active Roles Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex items-center min-w-[180px]">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#009B3E] mr-4 shrink-0">
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
            <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mb-0.5">
              Active Roles
            </div>
            <div className="text-2xl font-black text-gray-900 tracking-tight leading-none">
              3
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Permissions Container */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden">
        {/* Tabs & Save Button */}
        <div className="px-8 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
          <div className="flex space-x-8">
            <button className="pb-4 text-sm font-bold text-[#009B3E] border-b-2 border-[#009B3E]">
              Global Permissions
            </button>
            {/* Additional tabs could go here */}
          </div>

          <button className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-sm transition duration-200 flex items-center mb-4 sm:mb-0">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Save Changes
          </button>
        </div>

        {/* Permissions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            {/* Main Header */}
            <thead>
              <tr>
                <th className="px-8 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-1/2">
                  Permission Name
                </th>
                <th className="px-6 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">
                  Super Admin
                </th>
                <th className="px-6 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">
                  Editor
                </th>
                <th className="px-8 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">
                  User
                </th>
              </tr>
            </thead>

            {/* Table Body (Iterating through sections) */}
            <tbody>
              {permissions.map((section, secIdx) => (
                <React.Fragment key={section.section}>
                  {/* Section Header */}
                  <tr>
                    <td colSpan="4" className="px-8 pt-8 pb-4">
                      <span className="text-[10px] font-extrabold text-[#009B3E] uppercase tracking-widest">
                        {section.section}
                      </span>
                    </td>
                  </tr>

                  {/* Section Items */}
                  {section.items.map((item, itemIdx) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/30 transition-colors group"
                    >
                      {/* Permission Description Col */}
                      <td className="px-8 py-4">
                        <div className="pl-6">
                          <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-400 whitespace-normal">
                            {item.desc}
                          </p>
                        </div>
                      </td>

                      {/* Super Admin Checkbox (Disabled visually as they have all perms) */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <CustomCheckbox
                            checked={item.superAdmin}
                            onChange={() =>
                              handleToggle(secIdx, itemIdx, "superAdmin")
                            }
                            disabled={true}
                          />
                        </div>
                      </td>

                      {/* Editor Checkbox */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <CustomCheckbox
                            checked={item.editor}
                            onChange={() =>
                              handleToggle(secIdx, itemIdx, "editor")
                            }
                          />
                        </div>
                      </td>

                      {/* User Checkbox */}
                      <td className="px-8 py-4">
                        <div className="flex justify-center">
                          <CustomCheckbox
                            checked={item.user}
                            onChange={() =>
                              handleToggle(secIdx, itemIdx, "user")
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Area */}
        <div className="px-8 py-6 border-t border-gray-200 mt-4 flex items-center justify-between bg-gray-50/50">
          <p className="text-xs text-gray-400 font-medium">
            Auto-saving is enabled. Changes are logged to system audit trail.
          </p>
          <button className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors">
            Reset Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemPermissionsPage;
