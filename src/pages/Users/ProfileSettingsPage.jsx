import React, { useState } from "react";

const ProfileSettingsPage = () => {
  // State for form inputs and toggles
  const [formData, setFormData] = useState({
    fullName: "Ta Sok",
    email: "tasok@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [tripUpdates, setTripUpdates] = useState(true);

  // Handle generic input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-12 pt-8 flex flex-col">
      {/* Main Content Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account preferences and personal information.
          </p>
        </div>

        {/* Settings Form Card */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-10 mb-8">
          <form className="space-y-10">
            {/* 1. Personal Information Section */}
            <section>
              <div className="flex items-center mb-6">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h2 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Avatar Upload Area */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-24 h-24 rounded-2xl border border-gray-200 overflow-hidden mb-3 group cursor-pointer">
                    <img
                      src="/images/chanratanak-nay-GRK6KO4exaI-unsplash.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                    {/* Small Edit Badge Overlay */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#009B3E] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest hover:text-gray-800 transition-colors"
                  >
                    Update Photo
                  </button>
                </div>

                {/* Info Inputs Grid */}
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 2. Account Security Section */}
            <section>
              <div className="flex items-center mb-6">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-3"
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
                <h2 className="text-lg font-bold text-gray-900">
                  Account Security
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900"
                  />
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* 3. Notifications Section */}
            <section>
              <div className="flex items-center mb-6">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <h2 className="text-lg font-bold text-gray-900">
                  Notifications
                </h2>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-5 flex items-center justify-between border border-gray-50">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                    Trip Updates
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Get real-time alerts about your planned itineraries.
                  </p>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setTripUpdates(!tripUpdates)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    tripUpdates ? "bg-[#009B3E]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                      tripUpdates ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </section>
          </form>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-4 mb-16">
          <button
            type="button"
            className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2.5"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-8 rounded-lg shadow-sm transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettingsPage;
