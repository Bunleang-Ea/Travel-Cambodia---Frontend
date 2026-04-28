import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="w-full max-w-sm rounded-[1.75rem] bg-white/90 border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] px-4 py-6 sm:px-6 sm:py-7 backdrop-blur-sm">
          {/* Icon & Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
              {/* Custom Padlock SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M17 8H7V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2zm-2 0V6c0-1.66-1.34-3-3-3S9 4.34 9 6v2h6zM5 10c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V10z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-500 font-medium px-2">
              Enter your new password below.
            </p>
          </div>

          <div className="mb-4 rounded-2xl border border-green-100 bg-green-50/70 px-4 py-3 text-xs leading-relaxed text-green-800">
            Use a strong password with at least 8 characters, including a mix of
            letters and numbers.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={
                    showNewPassword ? "Hide new password" : "Show new password"
                  }
                >
                  {showNewPassword ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3l18 18M10.58 10.58A2 2 0 0013.42 13.42M9.88 4.24A10.94 10.94 0 0112 4c5.5 0 9.5 4 10.5 8-0.36 1.41-1.03 2.71-1.94 3.84M6.1 6.1C3.9 7.6 2.38 9.68 1.5 12c1 4 5 8 10.5 8 1.18 0 2.29-.18 3.31-.51"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                      />
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3l18 18M10.58 10.58A2 2 0 0013.42 13.42M9.88 4.24A10.94 10.94 0 0112 4c5.5 0 9.5 4 10.5 8-0.36 1.41-1.03 2.71-1.94 3.84M6.1 6.1C3.9 7.6 2.38 9.68 1.5 12c1 4 5 8 10.5 8 1.18 0 2.29-.18 3.31-.51"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                      />
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-5 flex items-center justify-between gap-3 text-xs text-gray-700">
            <span className="text-gray-500">
              Make sure both passwords match.
            </span>
            <Link
              to="/login"
              className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-bold whitespace-nowrap"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
