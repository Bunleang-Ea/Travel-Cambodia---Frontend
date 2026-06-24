import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCategories,
  getCategoryDetails,
  getCategoryPlaces,
} from "../../services/modules/travelApi";
import AuthPromptModal from "../../components/modals/AuthPromptModal";
import { getAuthUser } from "../../utils/authRole";

const SAVED_STORAGE_KEY = "travelCambodiaSaved";

const readSavedPlaceEntries = () => {
  if (typeof window === "undefined") return [];

  let raw = [];
  try {
    raw = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (typeof item === "string") {
        const placeSlug = item.trim();
        if (!placeSlug) return null;
        return {
          placeSlug,
          provinceSlug: "",
          title: "",
          image: "",
          category: "Saved Place",
        };
      }

      if (!item || typeof item !== "object") return null;
      const placeSlug = String(item.placeSlug || item.slug || "").trim();
      if (!placeSlug) return null;

      return {
        placeSlug,
        provinceSlug: String(item.provinceSlug || "").trim(),
        title: String(item.title || "").trim(),
        image: String(item.image || "").trim(),
        category: String(item.category || "Saved Place").trim() || "Saved Place",
      };
    })
    .filter(Boolean);
};

const CategoryDetailsPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("popular");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedPlaces, setSavedPlaces] = useState(() => readSavedPlaceEntries());
  const [authPrompt, setAuthPrompt] = useState(false);
  const { email } = getAuthUser();
  const isLoggedIn = Boolean(email);

  const isPlaceSaved = (placeSlug) =>
    savedPlaces.some((entry) => String(entry.placeSlug) === String(placeSlug));

  const toggleSave = (place) => {
    if (!isLoggedIn) {
      setAuthPrompt(true);
      return;
    }
    setSavedPlaces((prev) => {
      const normalized = Array.isArray(prev)
        ? prev.filter((entry) => entry && entry.placeSlug)
        : [];
      const placeSlug = String(place?.slug || "").trim();
      if (!placeSlug) return normalized;

      const exists = normalized.some(
        (entry) => String(entry.placeSlug) === placeSlug,
      );

      const next = exists
        ? normalized.filter((entry) => String(entry.placeSlug) !== placeSlug)
        : [
            ...normalized.filter(
              (entry) => String(entry.placeSlug) !== placeSlug,
            ),
            {
              placeSlug,
              provinceSlug: String(place?.provinceSlug || "").trim(),
              title: String(place?.title || "").trim(),
              image: String(place?.image || "").trim(),
              category: String(place?.category || "Saved Place").trim() || "Saved Place",
            },
          ];

      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadCategoryData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        let resolvedCategory = await getCategoryDetails(slug);

        if (!resolvedCategory) {
          const allCategories = await getCategories();
          resolvedCategory = Array.isArray(allCategories)
            ? allCategories[0] || null
            : null;
        }

        if (!resolvedCategory) {
          throw new Error("No category data available.");
        }

        const list = await getCategoryPlaces(resolvedCategory.slug);

        if (!isMounted) return;

        setCategoryInfo(resolvedCategory);
        setPlaces(Array.isArray(list) ? list : []);
        setSelectedProvince("all");
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load category places.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCategoryData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const safeCategory = categoryInfo || {
    slug: "categories",
    title: "Category",
    description: "",
    image:
      "/images/ancient-head-temple-cambodia.jpg",
  };

  const provinces = useMemo(
    () => [
      "all",
      ...Array.from(new Set(places.map((place) => place.provinceName))),
    ],
    [places],
  );

  const filteredPlaces = places.filter((place) => {
    const matchesProvince =
      selectedProvince === "all" || place.provinceName === selectedProvince;
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      place.title.toLowerCase().includes(query) ||
      place.summary.toLowerCase().includes(query) ||
      place.provinceName.toLowerCase().includes(query);

    return matchesProvince && matchesSearch;
  });

  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "az") return a.title.localeCompare(b.title);
    return b.reviews - a.reviews;
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-20 text-gray-800">
      <section className="relative h-[40vh] min-h-[350px] w-full bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={safeCategory.image}
            alt={safeCategory.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <nav className="flex items-center text-sm text-gray-300 mb-6 font-medium flex-wrap gap-y-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/categories"
              className="hover:text-white transition-colors"
            >
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-bold">{safeCategory.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 tracking-tight">
                {safeCategory.title}
              </h1>
              <p className="text-gray-200 text-sm md:text-base font-medium leading-relaxed">
                {safeCategory.description}
              </p>
            </div>

            <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-[1.25rem] p-4 border border-white/20 text-center min-w-[140px]">
              <span className="block text-3xl font-extrabold text-white mb-1">
                {sortedPlaces.length}
              </span>
              <span className="text-xs text-gray-300 uppercase tracking-widest font-bold">
                Places
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-[1.25rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200">
          <div className="text-gray-600 font-medium text-sm">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {sortedPlaces.length}
            </span>{" "}
            places in {safeCategory.title}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Temple, city, keyword..."
              className="bg-white border-2 border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-500 p-2.5 outline-none font-medium min-w-[210px]"
            />

            <span className="text-sm text-gray-500 font-medium">Province:</span>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="bg-white border-2 border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-500 block p-2.5 outline-none cursor-pointer font-medium"
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province === "all" ? "All Provinces" : province}
                </option>
              ))}
            </select>

            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-500 block p-2.5 outline-none cursor-pointer font-medium"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="az">A-Z</option>
            </select>
          </div>
        </div>

        {errorMessage ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mb-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            Loading category places...
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sortedPlaces.map((place) => (
            <div
              key={`${place.provinceSlug}-${place.slug}`}
              className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 group relative"
            >
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <button
                onClick={() => toggleSave(place)}
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 ${
                  isPlaceSaved(place.slug)
                    ? "bg-white text-red-500"
                    : "bg-white/70 text-gray-500 hover:bg-white hover:text-red-500"
                }`}
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#009B3E] transition-colors line-clamp-2">
                    {place.title}
                  </h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100 shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-yellow-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-900 text-sm">
                      {place.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg
                    className="w-4 h-4 mr-1 text-[#009B3E]"
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
                  {place.provinceName}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {place.summary}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {place.reviews.toLocaleString()} reviews
                  </span>
                  <Link
                    to={`/details/${place.provinceSlug}/${place.slug}`}
                    state={{
                      fromCategorySlug: safeCategory.slug,
                      fromCategoryTitle: safeCategory.title,
                    }}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all duration-300"
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedPlaces.length === 0 ? (
          <div className="mt-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            No places found for this category.
          </div>
        ) : null}
      </main>

      <AuthPromptModal
        isOpen={authPrompt}
        action="save"
        onClose={() => setAuthPrompt(false)}
        onAuthAction={() => { setAuthPrompt(false); window.location.href = "/login"; }}
      />
    </div>
  );
};

export default CategoryDetailsPage;
