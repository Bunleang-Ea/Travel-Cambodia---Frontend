import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AuthPromptModal from "../../components/modals/AuthPromptModal";
import ReviewModal from "../../components/modals/ReviewModal";
import { getAuthUser } from "../../utils/authRole";
import {
  getPlaceDetails,
  getProvinceDetails,
  getProvinces,
} from "../../services/modules/travelApi";

const DetailsPage = () => {
  const { provinceSlug, placeSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [authPromptAction, setAuthPromptAction] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isPlaceSaved, setIsPlaceSaved] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [province, setProvince] = useState({
    slug: "siem-reap",
    name: "Destination",
    heroImage:
      "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    places: [],
  });
  const [place, setPlace] = useState({
    slug: "sample-place",
    title: "Destination",
    image:
      "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    summary: "Explore this destination.",
    about: ["Explore this destination."],
    hours: [],
    highlights: [],
    gallery: [],
    rating: 0,
    reviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDetails = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        let resolvedProvince = null;

        if (provinceSlug) {
          resolvedProvince = await getProvinceDetails(provinceSlug);
        }

        if (!resolvedProvince) {
          const provinces = await getProvinces();
          resolvedProvince = Array.isArray(provinces)
            ? provinces[0] || null
            : null;
        }

        if (!resolvedProvince) {
          throw new Error("No province data available.");
        }

        let resolvedPlace = null;

        if (placeSlug) {
          resolvedPlace = await getPlaceDetails(
            resolvedProvince.slug,
            placeSlug,
          );
        }

        if (!resolvedPlace) {
          resolvedPlace = resolvedProvince.places?.[0] || null;
        }

        if (!resolvedPlace) {
          throw new Error("No place details available.");
        }

        if (!isMounted) return;

        setProvince(resolvedProvince);
        setPlace(resolvedPlace);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load place details.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [provinceSlug, placeSlug]);

  const openAuthPrompt = (action) => setAuthPromptAction(action);
  const closeAuthPrompt = () => setAuthPromptAction(null);

  const galleryImages = place.gallery?.length ? place.gallery : [place.image];
  const aboutParagraphs = place.about?.length
    ? place.about
    : [place.summary || "Explore this destination."];
  const hours = place.hours?.length ? place.hours : [];
  const highlights = place.highlights?.length ? place.highlights : [];
  const fromCategorySlug = location.state?.fromCategorySlug;
  const fromCategoryTitle = location.state?.fromCategoryTitle;

  // Read saved state from localStorage on place load
  useEffect(() => {
    if (!placeSlug) return;
    const saved = JSON.parse(window.localStorage.getItem("travelCambodiaSaved") || "[]");
    setIsPlaceSaved(saved.includes(placeSlug));
  }, [placeSlug]);

  const backTo = fromCategorySlug
    ? `/categories/${fromCategorySlug}`
    : `/destinations/${province.slug}`;

  const backLabel = fromCategoryTitle
    ? `Back to ${fromCategoryTitle}`
    : `Back to ${province.name}`;
  const { email } = getAuthUser();
  const isLoggedIn = Boolean(email);

  const savePlace = () => {
    if (!isLoggedIn) {
      openAuthPrompt("save");
      return;
    }
    const saved = JSON.parse(window.localStorage.getItem("travelCambodiaSaved") || "[]");
    const newSaved = isPlaceSaved
      ? saved.filter((s) => s !== placeSlug)
      : [...saved, placeSlug];
    window.localStorage.setItem("travelCambodiaSaved", JSON.stringify(newSaved));
    setIsPlaceSaved(!isPlaceSaved);
  };

  const addToItinerary = () => {
    if (!isLoggedIn) {
      openAuthPrompt("itinerary");
      return;
    }

    navigate("/itinerary/create", {
      state: {
        destination: place.title,
        notes: `Visit ${place.title} in ${province.name}`,
      },
    });
  };

  const openReviewFlow = () => {
    if (!isLoggedIn) {
      openAuthPrompt("review");
      return;
    }

    setIsReviewModalOpen(true);
  };

  const submitReview = async ({ rating, reviewText }) => {
    void rating;
    void reviewText;

    setIsSubmittingReview(true);
    await new Promise((r) => setTimeout(r, 600)); // Simulated API delay
    setIsSubmittingReview(false);
    setIsReviewModalOpen(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const openMap = () => {
    const query = encodeURIComponent(
      `${place.title}, ${province.name}, Cambodia`,
    );
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-20 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errorMessage ? (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {reviewSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Thank you! Your review has been submitted.
          </div>
        )}

        {isLoading ? (
          <div className="mb-6 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            Loading place details...
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {place.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
              <span className="flex items-center text-[#009B3E]">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {province.name}, Cambodia
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-gray-900 mr-1">
                  {place.rating}
                </span>
                ({Number(place.reviews || 0).toLocaleString()} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={backTo}
              className="flex items-center px-4 py-2.5 border-2 border-gray-300 text-[#009B3E] rounded-xl hover:bg-green-50 transition-colors font-semibold text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              {backLabel}
            </Link>
            <button
              onClick={savePlace}
              className="flex items-center px-4 py-2.5 border-2 border-gray-300 text-[#009B3E] rounded-xl hover:bg-green-50 transition-colors font-semibold text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              {isPlaceSaved ? "Saved" : "Save"}
            </button>
            <button
              onClick={addToItinerary}
              className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-sm shadow-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              Add to Itinerary
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          <div className="h-[300px] sm:h-[400px] rounded-[1.5rem] overflow-hidden border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            <img
              src={galleryImages[0]}
              alt={place.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 h-[300px] sm:h-[400px]">
            {galleryImages.slice(1, 5).map((image, index) => (
              <img
                key={`${place.slug}-${index}`}
                src={image}
                alt={`${place.title} ${index + 2}`}
                className="w-full h-full object-cover rounded-[1.25rem] border border-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {place.title}
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={`${place.slug}-about-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>

            {highlights.length ? (
              <section className="bg-white rounded-[1.5rem] p-6 border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-3">
                  {highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1.5 rounded-full bg-green-50 text-[#009B3E] text-xs font-semibold"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {hours.length ? (
              <section className="bg-white rounded-[1.5rem] p-6 border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
                <div className="flex items-center mb-6">
                  <svg
                    className="w-5 h-5 text-[#009B3E] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">
                    Opening Hours
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  {hours.map((hour) => (
                    <div
                      key={hour.label}
                      className="flex justify-between border-b border-gray-50 pb-2"
                    >
                      <span className="text-gray-500">{hour.label}</span>
                      <span className="font-semibold text-gray-900">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Location
              </h2>
              <div className="relative h-[300px] w-full rounded-[1.5rem] overflow-hidden bg-gray-200 group border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
                <img
                  src={province.heroImage}
                  alt={province.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <button
                    onClick={openMap}
                    className="bg-white text-gray-900 font-semibold text-sm py-2.5 px-6 rounded-xl border-2 border-gray-300 shadow-lg hover:bg-gray-50 transition-colors transform group-hover:scale-105 duration-200"
                  >
                    View Interactive Map
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-[1.5rem] border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)] overflow-hidden">
                <div className="bg-[#f0fdf4] px-6 py-4 border-b border-green-100 flex items-center">
                  <svg
                    className="w-5 h-5 text-[#009B3E] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Essential Info
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-50 p-2 rounded-lg text-[#009B3E] mr-4">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                        Best time to visit
                      </h4>
                      <p className="text-sm font-bold text-gray-900">
                        November to March
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Cool and dry season
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-50 p-2 rounded-lg text-[#009B3E] mr-4">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                        Recommended duration
                      </h4>
                      <p className="text-sm font-bold text-gray-900">
                        3 - 4 Hours
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        For the main attraction
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-50 p-2 rounded-lg text-[#009B3E] mr-4">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                        Travel style
                      </h4>
                      <p className="text-sm font-bold text-gray-900">
                        {place.category}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {province.name} province
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={openReviewFlow}
                className="w-full flex items-center justify-center py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-md hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2"
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
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </main>

      <AuthPromptModal
        isOpen={Boolean(authPromptAction)}
        action={authPromptAction || "save"}
        onClose={closeAuthPrompt}
        onAuthAction={() => navigate("/login")}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={submitReview}
        isSubmitting={isSubmittingReview}
      />
    </div>
  );
};

export default DetailsPage;
