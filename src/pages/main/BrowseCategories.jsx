import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/modules/travelApi";

const BrowseCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getCategories();
        if (!isMounted) return;
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load categories.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories = categories.filter((category) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;

    return (
      category.title.toLowerCase().includes(q) ||
      category.subtitle.toLowerCase().includes(q) ||
      category.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-20 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative w-full h-[280px] sm:h-[320px] rounded-[1.5rem] overflow-hidden mb-8 border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
          <img
            src="/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg"
            alt="Angkor Wat Landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 max-w-2xl">
            <Link
              to="/"
              className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center text-white transition-colors mb-6"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Browse by Category
            </h1>
            <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed">
              Explore Cambodia by theme. Pick a category to see all matching
              places, then open any place to read the full details.
            </p>
          </div>
        </section>

        <div className="mb-8 w-full max-w-3xl flex items-center bg-white/95 rounded-xl border-2 border-gray-300 p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.1)]">
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
            placeholder="Search categories, themes, or keywords..."
            className="flex-1 py-2.5 px-2 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {errorMessage ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mb-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            Loading categories...
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] transition-all duration-300 group cursor-pointer border border-gray-200 flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-[240px] sm:h-[260px] w-full">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-70"></div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-center flex-grow">
                <span className="text-[10px] font-bold text-[#009B3E] uppercase tracking-[0.18em] mb-2">
                  {category.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2.5">
                  {category.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {category.description}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center px-3 py-2 rounded-xl border-2 border-gray-300 text-[#009B3E] font-semibold text-sm group-hover:border-green-500 group-hover:text-green-800 transition-colors">
                    Explore {category.title.split(" ")[0]}
                    <svg
                      className="w-4 h-4 ml-2"
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
              </div>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 ? (
          <div className="mt-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            No categories match your search.
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default BrowseCategories;
