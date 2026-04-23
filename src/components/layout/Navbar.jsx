import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        {/* Temple Icon Placeholder */}
        <svg
          className="w-7 h-7 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
          />
        </svg>
        <span className="text-2xl font-bold text-gray-900 tracking-tight">
          Travel Cambodia
        </span>
      </div>

      {/* Middle Section - Navigation Links */}
      <div className="hidden lg:flex items-center space-x-8">
        <a
          href="#"
          className="text-lg text-[#009B3E] font-semibold py-1 border-b-2 border-[#009B3E]"
        >
          Home
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 hover:text-gray-900 font-medium py-1 transition-colors"
        >
          Locations
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 hover:text-gray-900 font-medium py-1 transition-colors"
        >
          Itinerary
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 hover:text-gray-900 font-medium py-1 transition-colors"
        >
          Categories
        </a>
        <a
          href="#"
          className="text-lg text-gray-500 hover:text-gray-900 font-medium py-1 transition-colors"
        >
          Contact Us
        </a>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-3">
        {/* Log In Button */}
        <button className="px-5 py-2 border border-[#009B3E] rounded text-[#009B3E] hover:bg-green-50 transition-colors text-base font-medium bg-white">
          Log In
        </button>

        {/* Register Button */}
        <button className="px-5 py-2 border border-[#009B3E] rounded text-[#009B3E] hover:bg-green-50 transition-colors text-base font-medium bg-white">
          Register
        </button>

        {/* Divider */}
        <div className="h-6 border-l border-gray-300 mx-2"></div>

        {/* User Profile */}
        <button className="flex items-center justify-center w-8 h-8 border-[1.5px] border-[#009B3E] rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Settings */}
        <button className="text-gray-500 hover:text-gray-800 transition-colors pl-1">
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
