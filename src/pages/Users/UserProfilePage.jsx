import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/modules/authApi";
import { getJourneys } from "../../services/modules/itineraryApi";
import { getProvinces } from "../../services/modules/travelApi";
import { getAuthUser } from "../../utils/authRole";
import { API_BASE_URL } from "../../services/core/apiConfig";

const toAbsoluteMediaUrl = (value) => {
  const source = String(value || "").trim();
  if (!source) return "";
  if (/^https?:\/\//i.test(source)) return source;
  if (source.startsWith("data:")) return source;

  try {
    const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
    return new URL(source, apiOrigin).toString();
  } catch {
    return source;
  }
};

const UserProfilePage = () => {
  const navigate = useNavigate();
  const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748B'><rect width='100%25' height='100%25' fill='%23E2E8F0'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";
  const DEFAULT_TRIP_IMAGE =
    "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg";
  const DEFAULT_SAVED_IMAGE = "/images/vicky-t-EY3tC81nFt0-unsplash.jpg";

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    profile_picture_url: "",
    profile_picture: null,
  });
  const [trips, setTrips] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const SAVED_STORAGE_KEY = "travelCambodiaSaved";
    const formatSlugTitle = (slug = "") =>
      String(slug || "")
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

    const parseSavedPlaces = () => {
      if (typeof window === "undefined") return [];
      let raw = [];
      try {
        raw = JSON.parse(
          window.localStorage.getItem(SAVED_STORAGE_KEY) || "[]",
        );
      } catch {
        return [];
      }
      if (!Array.isArray(raw)) return [];

      return raw
        .map((item, index) => {
          if (typeof item === "string" && item.trim()) {
            const placeSlug = item.trim();
            return {
              id: `${placeSlug}-${index}`,
              placeSlug,
              provinceSlug: "",
              detailsPath: "",
              title: formatSlugTitle(placeSlug),
              category: "Saved Place",
              image: DEFAULT_SAVED_IMAGE,
            };
          }

          if (!item || typeof item !== "object") return null;
          const placeSlug = String(item.placeSlug || item.slug || "").trim();
          if (!placeSlug) return null;
          const provinceSlug = String(item.provinceSlug || "").trim();
          const title = String(item.title || "").trim();
          const image = String(item.image || "").trim();
          const category =
            String(item.category || "Saved Place").trim() || "Saved Place";

          return {
            id: `${provinceSlug || "unknown"}-${placeSlug}-${index}`,
            placeSlug,
            provinceSlug,
            detailsPath:
              provinceSlug && placeSlug
                ? `/details/${provinceSlug}/${placeSlug}`
                : "",
            title: title || formatSlugTitle(placeSlug),
            category,
            image: image || DEFAULT_SAVED_IMAGE,
          };
        })
        .filter(Boolean);
    };

    const toStoragePayload = (entries) =>
      entries.map((entry) => ({
        placeSlug: String(entry?.placeSlug || "").trim(),
        provinceSlug: String(entry?.provinceSlug || "").trim(),
        title: String(entry?.title || "").trim(),
        image: String(entry?.image || "").trim(),
        category:
          String(entry?.category || "Saved Place").trim() || "Saved Place",
      }));

    const reconcileSavedPlacesWithProvinces = (entries, provinces) => {
      const sourceEntries = Array.isArray(entries) ? entries : [];
      const provinceList = Array.isArray(provinces) ? provinces : [];
      const seen = new Set();

      const reconciled = sourceEntries
        .map((entry, index) => {
          const placeSlug = String(entry?.placeSlug || "").trim();
          if (!placeSlug) return null;

          let matchedProvince =
            provinceList.find(
              (province) =>
                String(province?.slug || "") ===
                String(entry?.provinceSlug || ""),
            ) || null;
          let matchedPlace = matchedProvince?.places?.find(
            (place) => String(place?.slug || "") === placeSlug,
          );

          if (!matchedPlace) {
            for (const province of provinceList) {
              const candidate = province?.places?.find(
                (place) => String(place?.slug || "") === placeSlug,
              );
              if (candidate) {
                matchedProvince = province;
                matchedPlace = candidate;
                break;
              }
            }
          }

          if (!matchedProvince || !matchedPlace) {
            return null;
          }

          const key = `${matchedProvince.slug}::${matchedPlace.slug}`;
          if (seen.has(key)) {
            return null;
          }
          seen.add(key);

          return {
            id: `${matchedProvince.slug}-${matchedPlace.slug}-${index}`,
            placeSlug: String(matchedPlace.slug || "").trim(),
            provinceSlug: String(matchedProvince.slug || "").trim(),
            detailsPath: `/details/${matchedProvince.slug}/${matchedPlace.slug}`,
            title:
              String(matchedPlace.title || "").trim() ||
              String(entry?.title || "").trim() ||
              formatSlugTitle(matchedPlace.slug),
            category:
              String(matchedPlace.category || "").trim() ||
              String(entry?.category || "Saved Place").trim() ||
              "Saved Place",
            image:
              String(matchedPlace.image || "").trim() ||
              String(entry?.image || "").trim() ||
              DEFAULT_SAVED_IMAGE,
          };
        })
        .filter(Boolean);

      return reconciled;
    };

    const formatTripDate = (startDate, endDate) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      const start = startDate ? formatter.format(new Date(startDate)) : null;
      const end = endDate ? formatter.format(new Date(endDate)) : null;
      if (start && end) return `${start} - ${end}`;
      if (start) return start;
      return "Date not set";
    };

    const resolveTripStatus = (endDate) => {
      if (!endDate) return "UPCOMING";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      return end < today ? "COMPLETED" : "UPCOMING";
    };

    const loadData = async () => {
      const auth = getAuthUser();
      const parsedSavedPlaces = parseSavedPlaces();
      if (isMounted) {
        setProfile((prev) => ({
          ...prev,
          email: auth.email || prev.email,
        }));
        setSavedPlaces(parsedSavedPlaces);
      }

      try {
        const provinces = await getProvinces();
        if (isMounted) {
          const reconciledSavedPlaces = reconcileSavedPlacesWithProvinces(
            parsedSavedPlaces,
            provinces,
          );
          setSavedPlaces(reconciledSavedPlaces);
          window.localStorage.setItem(
            SAVED_STORAGE_KEY,
            JSON.stringify(toStoragePayload(reconciledSavedPlaces)),
          );
        }
      } catch {
        // Keep parsed local state when destinations cannot be loaded.
      }

      try {
        const profileData = await getMyProfile();
        if (isMounted) {
          setProfile({
            full_name: String(profileData?.full_name || "").trim(),
            email: String(profileData?.email || auth.email || "").trim(),
            profile_picture_url: toAbsoluteMediaUrl(
              profileData?.profile_picture_url || "",
            ),
            profile_picture: toAbsoluteMediaUrl(
              profileData?.profile_picture || "",
            ),
          });
        }
      } catch {
        // Keep local auth fallback values if profile request fails.
      }

      try {
        const journeyData = await getJourneys();
        if (!isMounted) return;

        const mappedTrips = (Array.isArray(journeyData) ? journeyData : []).map(
          (trip) => ({
            id: trip?.id || trip?.itinerary_id,
            title: String(trip?.title || "Untitled Itinerary"),
            date:
              trip?.dateLabel ||
              formatTripDate(
                trip?.startDate || trip?.start_date,
                trip?.endDate || trip?.end_date,
              ),
            status:
              trip?.status ||
              resolveTripStatus(trip?.endDate || trip?.end_date),
            image:
              toAbsoluteMediaUrl(trip?.image || trip?.image_url || "") ||
              DEFAULT_TRIP_IMAGE,
            companions: 0,
          }),
        );

        setTrips(mappedTrips);
      } catch {
        if (isMounted) {
          setTrips([]);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const user = useMemo(() => {
    const displayName =
      profile.full_name ||
      (profile.email ? profile.email.split("@")[0] : "Traveler");
    const avatar =
      toAbsoluteMediaUrl(profile.profile_picture) ||
      toAbsoluteMediaUrl(profile.profile_picture_url) ||
      DEFAULT_AVATAR;

    return {
      name: displayName,
      location: "Cambodia",
      avatar,
      stats: {
        trips: trips.length,
        saved: savedPlaces.length,
        reviews: 0,
      },
    };
  }, [profile, trips.length, savedPlaces.length]);

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
              <button
                type="button"
                onClick={() => navigate("/user/settings")}
                className="text-sm font-bold text-[#009B3E] hover:text-emerald-700 transition-colors hidden md:block"
              >
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
            {trips.length === 0 && (
              <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 text-sm font-medium text-gray-500">
                No trips yet. Create your first itinerary to see it here.
              </div>
            )}
            {trips.map((trip) => (
              <Link
                key={trip.id}
                to={`/itinerary/${trip.id}`}
                className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden flex flex-col sm:flex-row group hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:ring-offset-2"
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

                    <span
                      className={`text-xs font-bold transition-colors ${
                        trip.status === "UPCOMING"
                          ? "text-[#009B3E] group-hover:text-emerald-700"
                          : "text-gray-500 group-hover:text-gray-800"
                      }`}
                    >
                      {trip.status === "UPCOMING"
                        ? "Manage Details"
                        : "View Photos"}
                    </span>
                  </div>
                </div>
              </Link>
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
            {savedPlaces.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-6 text-sm font-medium text-gray-500">
                No saved places yet. Save destinations to build your shortlist.
              </div>
            )}
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => place.detailsPath && navigate(place.detailsPath)}
                onKeyDown={(event) => {
                  if (!place.detailsPath) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(place.detailsPath);
                  }
                }}
                role={place.detailsPath ? "button" : "article"}
                tabIndex={place.detailsPath ? 0 : -1}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-200 ${
                  place.detailsPath ? "cursor-pointer" : "cursor-default"
                }`}
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
