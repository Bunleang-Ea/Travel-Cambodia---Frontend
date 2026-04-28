import React, { useState } from "react";

const AddCategoryPage = () => {
  // State for interactive form elements
  const [activeIcon, setActiveIcon] = useState("temple");
  const [displayInMenu, setDisplayInMenu] = useState(true);
  const [featuredCategory, setFeaturedCategory] = useState(false);

  // Icon definitions for the selector
  const icons = [
    {
      id: "temple",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
        />
      ),
    },
    {
      id: "dining",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        />
      ),
    },
    {
      id: "walking",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      ), // simplified placeholder
    },
    {
      id: "beach",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      id: "nightlife",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      ), // simplified placeholder
    },
    {
      id: "accommodation",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Breadcrumbs & Header */}
      <div className="mb-8">
        <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
          <span>Categories</span>
          <svg
            className="w-3 h-3 mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-[#009B3E]">Add New</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Add New Category
        </h2>
        <p className="text-sm text-gray-500">
          Organize travel destinations and activities by creating distinct
          classifications.
        </p>
      </div>

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT COLUMN (Main Form Fields) */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8 h-full flex flex-col">
            <form className="space-y-8 flex-grow">
              {/* Category Name */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cultural Heritage"
                  className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-800"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Briefly describe what this category represents for travelers..."
                  className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium resize-none text-gray-800"
                ></textarea>
                <p className="mt-2 text-[11px] text-gray-400 font-medium">
                  Recommended length: 150-200 characters for optimal display on
                  front-end.
                </p>
              </div>

              {/* Representational Icon Picker */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                  Representational Icon
                </label>
                <div className="flex flex-wrap gap-3">
                  {icons.map((icon) => (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => setActiveIcon(icon.id)}
                      className={`relative w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                        activeIcon === icon.id
                          ? "border-2 border-[#009B3E] bg-emerald-50 text-[#009B3E]"
                          : "border border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${activeIcon === icon.id ? "mb-1" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {icon.svg}
                      </svg>
                      {activeIcon === icon.id && (
                        <span className="text-[8px] font-extrabold uppercase tracking-widest">
                          Active
                        </span>
                      )}
                    </button>
                  ))}

                  {/* Add Custom Icon Button */}
                  <button
                    type="button"
                    className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-gray-400 hover:text-gray-500 transition-colors"
                  >
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            {/* Bottom Actions */}
            <div className="mt-12 pt-6 flex items-center justify-end gap-4 border-t border-gray-50">
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
                Save Category
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Settings & Images) */}
        <div className="xl:col-span-1 space-y-8">
          {/* 1. Featured Image Card */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            <h3 className="text-sm font-extrabold text-gray-900 mb-4">
              Featured Image
            </h3>

            <div className="w-full h-40 rounded-xl border-2 border-dashed border-gray-200 bg-[#F7FBFC] flex flex-col items-center justify-center cursor-pointer hover:border-[#009B3E] hover:bg-emerald-50 transition-colors group">
              <svg
                className="w-8 h-8 text-gray-300 mb-3 group-hover:text-[#009B3E] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#009B3E] transition-colors">
                Click to upload
              </span>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                PNG, JPG UP TO 10MB
              </span>
            </div>
          </div>

          {/* 2. Quick Settings Card */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            <h3 className="text-sm font-extrabold text-gray-900 mb-6">
              Quick Settings
            </h3>

            <div className="space-y-6">
              {/* Toggle: Display in Menu */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                    Display in Menu
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Show in main navigation menu
                  </p>
                </div>
                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setDisplayInMenu(!displayInMenu)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    displayInMenu ? "bg-[#009B3E]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                      displayInMenu ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="w-full h-px bg-gray-50"></div>

              {/* Toggle: Featured Category */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                    Featured Category
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Highlight on the home screen
                  </p>
                </div>
                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setFeaturedCategory(!featuredCategory)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    featuredCategory ? "bg-[#009B3E]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                      featuredCategory ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
