import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProvinceDetails,
  getProvinces,
  getCategories,
} from "../../services/modules/travelApi";

const DestinationsPage = () => {
  const { provinceSlug } = useParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [province, setProvince] = useState(null);
  const [filters, setFilters] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProvinceAndCategories = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        let resolvedProvince = null;
        let categoriesData = [];

        if (provinceSlug) {
          const [provData, catsData] = await Promise.all([
            getProvinceDetails(provinceSlug),
            getCategories(),
          ]);
          resolvedProvince = provData;
          categoriesData = catsData;
        } else {
          const [provinces, catsData] = await Promise.all([
            getProvinces(),
            getCategories(),
          ]);
          resolvedProvince = Array.isArray(provinces)
            ? provinces[0] || null
            : null;
          categoriesData = catsData;
        }

        if (!isMounted) return;

        if (!resolvedProvince) {
          throw new Error("No province data available.");
        }

        setProvince(resolvedProvince);

        // Extract unique category names dynamically from the API
        const categoryTitles = Array.isArray(categoriesData)
          ? categoriesData.map((cat) => cat.title).filter(Boolean)
          : [];
        const uniqueTitles = Array.from(new Set(categoryTitles));
        setFilters(["All", ...uniqueTitles]);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load destinations.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadProvinceAndCategories();

    return () => {
      isMounted = false;
    };
  }, [provinceSlug]);

  const safeProvince = province || {
    slug: "siem-reap",
    name: "Destination",
    heroImage:
      "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    description: "Explore available places.",
    places: [],
  };

  const places = safeProvince.places || [];

  const filteredPlaces = places.filter((place) => {
    const matchesFilter =
      activeFilter === "All" ||
      String(place.category || "").toLowerCase() === String(activeFilter || "").toLowerCase();

    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      String(place.title || "").toLowerCase().includes(q) ||
      String(place.summary || "").toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-16 text-gray-800">
      <section className="relative h-[45vh] sm:h-[55vh] w-full bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={safeProvince.heroImage}
            alt={safeProvince.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <Link
            to="/locations"
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
            Welcome to {safeProvince.name}
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
            {safeProvince.description}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            placeholder={`Search places in ${safeProvince.name}...`}
            className="flex-1 py-2.5 px-2 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 px-8 rounded-xl transition-all duration-300 text-sm">
            Search
          </button>
        </div>

        {/* Scrollable Filter Pills */}
        <div className="flex items-center gap-3 mt-10 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth flex-nowrap no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border-2 shrink-0 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-green-600 to-green-700 border-green-600 text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* CSS to hide Webkit scrollbars */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {errorMessage ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mb-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            Loading places...
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPlaces.map((place) => (
            <div
              key={place.slug}
              className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 group"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-[10px] font-extrabold text-[#009B3E] uppercase tracking-wider">
                    {place.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-xl mb-2">
                  {place.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {place.summary}
                </p>

                <Link
                  to={`/details/${safeProvince.slug}/${place.slug}`}
                  className="inline-flex items-center text-[#009B3E] hover:text-green-800 font-semibold text-sm transition-colors w-max"
                >
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
                </Link>
              </div>
            </div>
          ))}
        </div>

        {!filteredPlaces.length ? (
          <div className="mt-10 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            No places found in this province.
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default DestinationsPage;
