import React from "react";

const headingMap = {
  save: "Want to save this for later?",
  itinerary: "Want to add this for Itinerary?",
  review: "Want to Review?",
};

const iconMap = {
  save: (
    <svg
      className="w-6 h-6 text-[#009B3E]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
      />
    </svg>
  ),
  itinerary: (
    <svg
      className="w-6 h-6 text-[#009B3E]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  review: (
    <svg
      className="w-6 h-6 text-[#009B3E]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  ),
};

const AuthPromptModal = ({
  isOpen = false,
  onClose = () => {},
  action = "save",
  onAuthAction,
}) => {
  if (!isOpen) return null;

  const title = headingMap[action] || headingMap.save;
  const icon = iconMap[action] || iconMap.save;
  const handleAuthAction = onAuthAction || onClose;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white/95 rounded-[1.5rem] border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col backdrop-blur-sm">
        {/* Top Image Section */}
        <div className="relative h-[180px] w-full">
          <img
            src="/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg"
            alt="Angkor Wat Sunrise"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-white"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full border border-white/30 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="px-5 sm:px-6 pb-6 flex flex-col items-center text-center relative z-10">
          {/* Dynamic Overlapping Icon */}
          <div className="w-14 h-14 bg-[#e6f7ec] rounded-xl flex items-center justify-center -mt-8 mb-4 shadow-sm border-2 border-white">
            {icon}
          </div>

          {/* Dynamic Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight leading-tight">
            {title}
          </h2>

          {/* Shared Description */}
          <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed px-2">
            Create an account or login to start planning your dream trip to
            Cambodia.
          </p>

          {/* Action Buttons */}
          <button
            onClick={handleAuthAction}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 mb-3"
          >
            Login / Sign Up
          </button>

          <button
            onClick={onClose}
            className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors py-1.5"
          >
            Maybe later
          </button>

          <p className="mt-5 text-xs text-gray-400 font-medium">
            By continuing, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
