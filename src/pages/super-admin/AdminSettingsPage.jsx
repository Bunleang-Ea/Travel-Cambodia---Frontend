import React, { useState } from "react";

const AdminSettingsPage = () => {
  // State for the notification toggles
  const [settings, setSettings] = useState({
    criticalErrors: true,
    newUsers: false,
    automatedBackups: true,
  });

  // Helper to handle toggle changes
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* 1. Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Admin Settings
        </h2>
        <p className="text-sm text-gray-500">
          Configure global system security, email infrastructure, and automated
          notification triggers.
        </p>
      </div>

      {/* 2. Settings Card */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 max-w-4xl">
        {/* Card Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center">
          <svg
            className="w-5 h-5 text-[#009B3E] mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
            Global System Notifications
          </h3>
        </div>

        {/* Settings List */}
        <div className="divide-y divide-gray-50">
          {/* Setting Item: Critical Error Alerts */}
          <div className="px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mr-4 shrink-0 mt-1">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  Critical Error Alerts
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  Notify admins immediately on system failure
                </p>
              </div>
            </div>
            {/* Custom Toggle */}
            <button
              type="button"
              onClick={() => handleToggle("criticalErrors")}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                settings.criticalErrors ? "bg-[#009B3E]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                  settings.criticalErrors ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Setting Item: New User Registration */}
          <div className="px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mr-4 shrink-0 mt-1">
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
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  New User Registration
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  Weekly digest of new system registrations
                </p>
              </div>
            </div>
            {/* Custom Toggle */}
            <button
              type="button"
              onClick={() => handleToggle("newUsers")}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                settings.newUsers ? "bg-[#009B3E]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                  settings.newUsers ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Setting Item: Automated Backup Reports */}
          <div className="px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mr-4 shrink-0 mt-1">
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
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  Automated Backup Reports
                </h4>
                <p className="text-xs text-gray-400 font-medium">
                  Daily confirmation of database backup status
                </p>
              </div>
            </div>
            {/* Custom Toggle */}
            <button
              type="button"
              onClick={() => handleToggle("automatedBackups")}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                settings.automatedBackups ? "bg-[#009B3E]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                  settings.automatedBackups ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Action Buttons */}
      <div className="max-w-4xl mt-8 flex items-center justify-end gap-4">
        <button
          type="button"
          className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2.5"
        >
          Discard Changes
        </button>
        <button
          type="button"
          className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-sm transition duration-200"
        >
          Save System Config
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
