import React from "react";

const LogoutModal = ({ isOpen = true, onClose, onConfirm }) => {
  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      {/* Modal Content Card */}
      <div className="w-full max-w-md bg-white/95 rounded-[1.5rem] border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-5 sm:p-6 flex flex-col items-center backdrop-blur-sm transform transition-all">
        {/* Logout Icon Container */}
        <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mb-5">
          <svg
            className="w-7 h-7 text-red-600 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center tracking-tight leading-tight">
          Are you sure you want to <br /> logout?
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed px-2 font-medium">
          You will need to log in again to manage your trips and saved places.
        </p>

        {/* Action Buttons */}
        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 border-2 border-gray-300 rounded-xl text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
