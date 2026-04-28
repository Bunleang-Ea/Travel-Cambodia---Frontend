import React, { useState } from "react";

const AddDestinationPage = () => {
  // Simple state to manage interactive UI elements
  const [selectedCategory, setSelectedCategory] = useState("Temple");
  const [isFeatured, setIsFeatured] = useState(false);

  const categories = ["Temple", "Nature", "Beach", "Urban", "History"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Breadcrumbs & Header */}
      <div className="mb-8">
        <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
          <span>Destinations</span>
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
          Add New Destination
        </h2>
        <p className="text-sm text-gray-500">
          Populate the fields below to showcase a new Cambodian wonder on the
          platform.
        </p>
      </div>

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT COLUMN (Main Form Fields) */}
        <div className="xl:col-span-2 space-y-8">
          {/* 1. General Information Card */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            {/* Card Header */}
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-emerald-50 text-[#009B3E] rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                General Information
              </h3>
            </div>

            <form className="space-y-6">
              {/* Row 1: Name & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
                    Destination Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Angkor Wat Temple"
                    className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
                    City / Province
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium appearance-none cursor-pointer">
                      <option value="">Select Location</option>
                      <option value="siem-reap">Siem Reap</option>
                      <option value="phnom-penh">Phnom Penh</option>
                      <option value="kampot">Kampot</option>
                      <option value="sihanoukville">Sihanoukville</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Category */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors border ${
                        selectedCategory === cat
                          ? "bg-white border-[#009B3E] text-[#009B3E] shadow-sm"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  rows="6"
                  placeholder="Provide a detailed editorial description for the destination..."
                  className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium resize-none"
                ></textarea>
              </div>
            </form>
          </div>

          {/* 2. Gallery & Photos Card */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-50 text-[#009B3E] rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Gallery & Photos
                </h3>
              </div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                Max 5MB per file
              </span>
            </div>

            {/* Photo Upload Grid */}
            <div className="flex flex-wrap gap-4">
              {/* Main Upload Box */}
              <div className="w-[120px] h-[120px] rounded-2xl border-2 border-dashed border-gray-200 bg-[#F7FBFC] flex flex-col items-center justify-center cursor-pointer hover:border-[#009B3E] hover:bg-emerald-50 transition-colors group">
                <svg
                  className="w-6 h-6 text-gray-400 mb-2 group-hover:text-[#009B3E] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#009B3E]">
                  Upload Main
                </span>
              </div>

              {/* Filled Box Mockup */}
              <div className="w-[120px] h-[120px] rounded-2xl overflow-hidden relative group cursor-pointer">
                <img
                  src="/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg"
                  alt="Uploaded thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>

              {/* Empty Add Boxes */}
              <div className="w-[120px] h-[120px] rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-300"
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
              </div>
              <div className="w-[120px] h-[120px] rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-300"
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
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Settings & Status) */}
        <div className="xl:col-span-1 space-y-8">
          {/* 3. Map Placement Card */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-emerald-50 text-[#009B3E] rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">
                Map Placement
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2">
                  Google Maps Embed URL
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Paste iframe src link here..."
                    className="w-full pl-9 pr-4 py-2.5 bg-[#F7FBFC] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-xs font-medium"
                  />
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-[140px] bg-gray-100 rounded-xl overflow-hidden relative">
                <img
                  src="/images/george-bakos-OvEr7BwXxxg-unsplash.jpg"
                  alt="Map Placeholder"
                  className="w-full h-full object-cover opacity-50 grayscale"
                />
              </div>
            </div>
          </div>

          {/* 4. Publishing Status Card */}
          <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-6">
              Publishing Status
            </h3>

            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#009B3E] mr-2"></div>
                  <span className="text-sm font-bold text-[#009B3E]">
                    Draft Status
                  </span>
                </div>
                <button className="text-[10px] font-extrabold text-[#009B3E] uppercase tracking-widest hover:underline">
                  Change
                </button>
              </div>

              {/* Visibility Row */}
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">
                  Visibility
                </span>
                <span className="text-sm font-bold text-gray-900">Public</span>
              </div>

              {/* Featured Post Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500 font-medium">
                  Featured Post
                </span>

                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    isFeatured ? "bg-[#009B3E]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                      isFeatured ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3 flex flex-col">
                <button className="w-full py-3.5 bg-[#009B3E] hover:bg-green-700 text-white font-bold rounded-xl shadow-sm transition-colors text-sm">
                  Add Destination
                </button>
                <button className="w-full py-3.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDestinationPage;
