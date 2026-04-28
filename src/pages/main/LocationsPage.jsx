import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProvinces } from "../../services/modules/travelApi";

const LocationsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProvinces = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getProvinces();
        if (!isMounted) return;
        setDestinations(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load destinations.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadProvinces();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fixed: use exact singular category names matching travelData
  const filters = ["All", "Temple", "Nature", "Coastal", "Urban"];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesFilter =
      activeFilter === "All" ||
      String(dest.category || "").toLowerCase() === activeFilter.toLowerCase();

    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      String(dest.name || "").toLowerCase().includes(q) ||
      String(dest.description || "").toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-16 text-gray-800">
      {/* 1. Hero Section */}
      <section className="relative h-[45vh] sm:h-[55vh] w-full bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg"
            alt="Angkor Wat Landscape"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-6 left-6 sm:left-6 lg:left-8 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>

          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 tracking-tight mt-8">
            Find Your Destination
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
            Uncover the secrets of the Khmer Empire, explore untouched jungles,
            and relax on pristine ivory beaches. Cambodia is waiting for your
            story.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Floating Search Bar */}
        <div className="relative -mt-8 z-20 w-full max-w-3xl flex items-center bg-white/95 rounded-xl p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.1)] border-2 border-gray-300">
          <div className="pl-4 pr-2 text-gray-400">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search temples, beaches, or cities..."
            className="flex-1 py-2.5 px-2 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 px-8 rounded-xl transition-all duration-300 text-sm">
            Search
          </button>
        </div>

        {/* 3. Filter Pills */}
        <div className="flex flex-wrap gap-3 mt-10 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border-2 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-green-600 to-green-700 border-green-600 text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {errorMessage ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mb-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            Loading destinations...
          </div>
        ) : null}

        {/* 4. Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredDestinations.map((dest) => (
            <Link
              key={dest.slug}
              to={`/destinations/${dest.slug}`}
              className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 group text-left"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-[10px] font-extrabold text-[#009B3E] uppercase tracking-wider">
                    {dest.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-xl mb-2">
                  {dest.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {dest.description}
                </p>

                {/* Action Link */}
                <span className="inline-flex items-center text-[#009B3E] hover:text-green-800 font-semibold text-sm transition-colors w-max">
                  Explore
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LocationsPage;
