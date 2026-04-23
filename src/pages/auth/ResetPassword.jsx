import React, { useState } from "react";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Passwords match validation could go here before API call
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset requested");
  };

  return (
    <div className="flex min-h-screen bg-[#F7FBFC]">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 mx-auto">
        {/* Reset Password Card */}
        <div className="w-full max-w-lg rounded-[2rem] bg-white/90 border border-gray-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] px-6 py-8 sm:px-10 sm:py-10 backdrop-blur-sm">
          {/* Icon & Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="mb-4 text-gray-900">
              {/* Custom Padlock SVG */}
              <svg className="w-14 h-14" viewBox="0 0 24 24">
                <path
                  d="M17 8H7V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2zm-2 0V6c0-1.66-1.34-3-3-3S9 4.34 9 6v2h6zM5 10c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V10z"
                  fill="currentColor"
                />
                {/* Three dots on the padlock */}
                <circle cx="9" cy="15" r="1.5" fill="currentColor" />
                <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                <circle cx="15" cy="15" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-base text-gray-500 font-medium px-2">
              Enter your new password below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Input */}
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center text-base text-gray-700">
            <a
              href="#"
              className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-bold"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              Back to Login page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
