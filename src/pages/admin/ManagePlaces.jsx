import React from "react";

const ManagePlaces = () => {
  // Mock data for the table
  const destinations = [
    {
      id: 1,
      name: "Angkor Wat",
      subtitle: "UNESCO World Heritage Site",
      city: "Siem Reap",
      category: "TEMPLE",
      categoryColor: "bg-emerald-100 text-emerald-700",
      status: "Published",
      image:
        "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    },
    {
      id: 2,
      name: "Koh Rong",
      subtitle: "Tropical Paradise Island",
      city: "Sihanoukville",
      category: "BEACH",
      categoryColor: "bg-blue-100 text-blue-700",
      status: "Published",
      image:
        "/images/vicky-t-EY3tC81nFt0-unsplash.jpg",
    },
    {
      id: 3,
      name: "Royal Palace",
      subtitle: "Official Residence of King",
      city: "Phnom Penh",
      category: "CITY",
      categoryColor: "bg-yellow-100 text-yellow-700",
      status: "Draft",
      image:
        "/images/george-bakos-OvEr7BwXxxg-unsplash.jpg",
    },
    {
      id: 4,
      name: "Bokor Hill Station",
      subtitle: "Historic Mountain Resort",
      city: "Kampot",
      category: "NATURE",
      categoryColor: "bg-green-100 text-green-700",
      status: "Published",
      image:
        "/images/ancient-head-temple-cambodia.jpg",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Destinations Management
        </h2>
        <p className="text-sm text-gray-500">
          Manage and monitor all travel locations across Cambodia's provinces
        </p>
      </div>

      {/* Quick Destination Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="Destination Name"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <input
          type="text"
          placeholder="City / Province"
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        />
        <select
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="TEMPLE">TEMPLE</option>
          <option value="BEACH">BEACH</option>
          <option value="NATURE">NATURE</option>
          <option value="CITY">CITY</option>
        </select>
        <select
          disabled
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <button
          type="button"
          disabled
          className="bg-[#009B3E] text-white text-sm font-bold py-2.5 px-4 rounded-lg opacity-60 cursor-not-allowed"
        >
          Add Destination
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 mb-6">
        <button className="flex items-center px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          <span className="text-gray-400 font-medium mr-2">STATUS</span> All
          Status
          <svg
            className="w-4 h-4 ml-2 text-gray-400"
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
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          <span className="text-gray-400 font-medium mr-2">CATEGORY</span> All
          Categories
          <svg
            className="w-4 h-4 ml-2 text-gray-400"
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
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
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
          More Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Table Header */}
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  City / Province
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {destinations.map((dest) => (
                <tr
                  key={dest.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Destination Col */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={dest.image}
                          alt={dest.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">
                          {dest.name}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {dest.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* City Col */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-700">
                      {dest.city}
                    </div>
                  </td>

                  {/* Category Col */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 inline-flex text-[10px] leading-4 font-extrabold rounded ${dest.categoryColor}`}
                    >
                      {dest.category}
                    </span>
                  </td>

                  {/* Status Col */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full mr-2 ${dest.status === "Published" ? "bg-[#009B3E]" : "bg-gray-400"}`}
                      ></div>
                      <span className="text-sm font-bold text-gray-700">
                        {dest.status}
                      </span>
                    </div>
                  </td>

                  {/* Actions Col */}
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-[#009B3E] mr-3 transition-colors">
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
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">1</span> to{" "}
            <span className="font-bold text-gray-900">10</span> of{" "}
            <span className="font-bold text-gray-900">48</span> results
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-gray-200 text-sm font-medium rounded-md text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-[#009B3E] bg-[#009B3E] text-white text-sm font-bold rounded-md shadow-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1.5 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePlaces;
