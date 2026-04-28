import React from "react";

const ManageCategory = () => {
  // Mock data matching your Category Management mockup
  const categories = [
    {
      id: "CAT-001",
      name: "Temples",
      description:
        "Ancient Khmer empire ruins, Buddhist pagodas, and spiritual landmarks across the country.",
      places: 124,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: (
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
            d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
          />
        </svg>
      ),
    },
    {
      id: "CAT-002",
      name: "Beaches",
      description:
        "Pristine white sands, island retreats, and coastal resorts in Sihanoukville and Koh Rong.",
      places: 45,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      icon: (
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
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "CAT-003",
      name: "Nature",
      description:
        "National parks, mountain ranges, waterfalls, and eco-tourism adventures in the Cardamoms.",
      places: 68,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: (
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
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      id: "CAT-004",
      name: "Urban",
      description:
        "Vibrant markets, colonial architecture, museums, and nightlife in Phnom Penh and Sie...",
      places: 32,
      iconBg: "bg-fuchsia-100",
      iconColor: "text-fuchsia-600",
      icon: (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "CAT-006",
      name: "Cuisine",
      description:
        "Traditional Khmer food experiences, street food tours, and cooking classes.",
      places: 54,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      icon: (
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
            d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Category Management
          </h2>
          <p className="text-sm text-gray-500">
            Organize and define the types of experiences available in Cambodia.
          </p>
        </div>

        {/* Add Button */}
        <button className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 flex items-center shrink-0">
          <svg
            className="w-5 h-5 mr-1.5"
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
          Add Category
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Category name"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="Description"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <button
          type="button"
          disabled
          className="bg-[#009B3E] text-white text-sm font-bold py-2.5 px-4 rounded-lg opacity-60 cursor-not-allowed"
        >
          Add Category
        </button>
      </div>

      {/* Toolbar (Search & View Toggles) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:border-transparent bg-white shadow-sm"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
          <button className="p-2.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Table Header */}
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-24">
                  Icon
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">
                  Category Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/2">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Places
                </th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Icon Col */}
                  <td className="px-8 py-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.iconBg} ${cat.iconColor}`}
                    >
                      {cat.icon}
                    </div>
                  </td>

                  {/* Category Name Col */}
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-900 mb-0.5">
                      {cat.name}
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      ID: {cat.id}
                    </div>
                  </td>

                  {/* Description Col */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-500 whitespace-normal max-w-md leading-relaxed">
                      {cat.description}
                    </p>
                  </td>

                  {/* Places Col */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-[#009B3E]">
                      {cat.places} Sites
                    </span>
                  </td>

                  {/* Actions Col */}
                  <td className="px-8 py-5 text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-[#009B3E] mr-4 transition-colors">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-white px-8 py-5 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-400 font-medium">
            Showing <span className="font-bold text-gray-700">5</span> of 12
            categories
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <button className="p-2 text-gray-400 hover:text-gray-700 disabled:opacity-50">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#009B3E] text-white shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-700">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
