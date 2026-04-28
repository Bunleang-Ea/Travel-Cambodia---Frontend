import React from "react";

const UserProfilePage = () => {
  // Mock Data
  const user = {
    name: "Ta Sok",
    location: "Phnom Penh, Cambodia",
    avatar:
      "/images/chanratanak-nay-GRK6KO4exaI-unsplash.jpg",
    stats: {
      trips: 4,
      saved: 12,
      reviews: 8,
    },
  };

  const trips = [
    {
      id: 1,
      title: "Adventure in Siem Reap",
      date: "Dec 12 - Dec 18, 2024",
      status: "UPCOMING",
      image:
        "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
      companions: 3,
    },
    {
      id: 2,
      title: "Bokor Hill Expedition",
      date: "Aug 05 - Aug 08, 2024",
      status: "COMPLETED",
      image:
        "/images/ancient-head-temple-cambodia.jpg",
      companions: 0,
    },
  ];

  const savedPlaces = [
    {
      id: 1,
      title: "Bokor Hill Station",
      category: "HISTORY & NATURE",
      image:
        "/images/vicky-t-EY3tC81nFt0-unsplash.jpg",
    },
    {
      id: 2,
      title: "Central Market",
      category: "SHOPPING",
      image:
        "/images/george-bakos-OvEr7BwXxxg-unsplash.jpg",
    },
    {
      id: 3,
      title: "Floating Village",
      category: "CULTURE",
      image:
        "/images/graham-h-cambodia-2388090_1920.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Profile Header Dashboard */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          {/* Avatar Area */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              {/* Edit overlay on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
            {/* Quick edit floating button */}
            <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#009B3E] text-white rounded-full border-4 border-white flex items-center justify-center shadow-sm hover:bg-green-700 transition-colors">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left z-10 pt-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {user.name}
              </h1>
              <button className="text-sm font-bold text-[#009B3E] hover:text-emerald-700 transition-colors hidden md:block">
                Edit Profile
              </button>
            </div>
            <div className="flex items-center justify-center md:justify-start text-gray-500 text-sm mb-6">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {user.location}
            </div>

            {/* User Stats Bar */}
            <div className="flex items-center justify-center md:justify-start gap-8 border-t border-gray-200 pt-6">
              <div className="text-center md:text-left">
                <span className="block text-2xl font-black text-gray-900">
                  {user.stats.trips}
                </span>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Trips
                </span>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div className="text-center md:text-left">
                <span className="block text-2xl font-black text-gray-900">
                  {user.stats.saved}
                </span>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Saved
                </span>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div className="text-center md:text-left">
                <span className="block text-2xl font-black text-gray-900">
                  {user.stats.reviews}
                </span>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. My Trips Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-1.5 h-6 bg-[#009B3E] rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-900">My Trips</h2>
            </div>
            <button className="px-4 py-1.5 bg-emerald-50 text-[#009B3E] text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden flex flex-col sm:flex-row group hover:shadow-md transition-all"
              >
                {/* Trip Image */}
                <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Trip Details */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight pr-2">
                        {trip.title}
                      </h3>
                      {/* Status Badge */}
                      <span
                        className={`px-2 py-1 text-[9px] font-extrabold rounded-md uppercase tracking-wider shrink-0 ${
                          trip.status === "UPCOMING"
                            ? "bg-emerald-50 text-[#009B3E]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {trip.status}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 font-medium mb-4">
                      <svg
                        className="w-3.5 h-3.5 mr-1.5 text-gray-400"
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
                      {trip.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    {trip.companions > 0 ? (
                      <div className="flex items-center text-xs font-bold text-gray-400">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-600">
                          +{trip.companions}
                        </div>
                        Friends
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 font-medium">
                        Solo Trip
                      </div>
                    )}

                    <button
                      className={`text-xs font-bold transition-colors ${
                        trip.status === "UPCOMING"
                          ? "text-[#009B3E] hover:text-emerald-700"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {trip.status === "UPCOMING"
                        ? "Manage Details"
                        : "View Photos"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Saved Places Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-1.5 h-6 bg-[#009B3E] rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-900">Saved Places</h2>
            </div>
            <button className="px-4 py-1.5 border-2 border-[#009B3E] text-[#009B3E] text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors">
              Manage List
            </button>
          </div>

          {/* Clean, Predictable Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-gray-200"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Remove Bookmark Hover Action */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-widest mb-1.5 block">
                    {place.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {place.title}
                  </h3>
                </div>
              </div>
            ))}

            {/* Add More Card */}
            <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-200 bg-white hover:border-[#009B3E] hover:bg-emerald-50 transition-colors flex flex-col items-center justify-center cursor-pointer group shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#009B3E] mb-3 group-hover:bg-[#009B3E] group-hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-[#009B3E] transition-colors">
                Add More Places
              </h3>
              <p className="text-[10px] text-gray-400 font-medium mt-1">
                Curate your next Cambodian adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
