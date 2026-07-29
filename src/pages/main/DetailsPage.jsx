import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../components/common/ConfirmModal";
import AuthPromptModal from "../../components/modals/AuthPromptModal";
import ReviewModal from "../../components/modals/ReviewModal";
import { getAuthUser } from "../../utils/authRole";
import {
  deletePlaceReview,
  getPlaceDetails,
  getPlaceReviews,
  getProvinceDetails,
  getProvinces,
  submitPlaceReview,
  updatePlaceReview,
} from "../../services/modules/travelApi";

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
        category:
          String(item.category || "Saved Place").trim() || "Saved Place",
      };
    })
    .filter(Boolean);
};

const DetailsPage = () => {
  const { provinceSlug, placeSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [authPromptAction, setAuthPromptAction] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [savedPlacesVersion, setSavedPlacesVersion] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewStatusMessage, setReviewStatusMessage] = useState("");
  const [placeReviews, setPlaceReviews] = useState([]);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
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
    openingHours: "",
    bestTimeToVisit: "",
    recommendedDuration: "",
    dressCode: "",
    rating: 0,
    reviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reviewErrorMessage, setReviewErrorMessage] = useState("");

  const isPlaceSaved = useMemo(() => {
    void savedPlacesVersion;
    const savedEntries = readSavedPlaceEntries();
    return savedEntries.some(
      (entry) => String(entry.placeSlug) === String(placeSlug),
    );
  }, [placeSlug, savedPlacesVersion]);

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

  const loadReviewsForPlace = async (placeId) => {
    if (!placeId) return;

    setIsLoadingReviews(true);
    setReviewErrorMessage("");
    setPlaceReviews([]);
    try {
      const data = await getPlaceReviews(placeId);
      setPlaceReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      setReviewErrorMessage(error?.message || "Failed to load reviews.");
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (!place?.id) return;

    let isMounted = true;

    const load = async () => {
      setIsLoadingReviews(true);
      setReviewErrorMessage("");
      setPlaceReviews([]);

      try {
        const data = await getPlaceReviews(place.id);
        if (isMounted) {
          setPlaceReviews(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isMounted) {
          setReviewErrorMessage(error?.message || "Failed to load reviews.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingReviews(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [place?.id]);

  const openAuthPrompt = (action) => setAuthPromptAction(action);
  const closeAuthPrompt = () => setAuthPromptAction(null);

  const galleryImages = place.gallery?.length ? place.gallery : [place.image];
  const aboutParagraphs = place.about?.length
    ? place.about
    : [place.summary || "Explore this destination."];
  const hours = place.hours?.length ? place.hours : [];
  const highlights = place.highlights?.length ? place.highlights : [];
  const bestTimeToVisit = String(place.bestTimeToVisit || "").trim();
  const recommendedDuration = String(place.recommendedDuration || "").trim();
  const dressCode = String(place.dressCode || "").trim();
  const fromCategorySlug = location.state?.fromCategorySlug;
  const fromCategoryTitle = location.state?.fromCategoryTitle;

  const backTo = fromCategorySlug
    ? `/categories/${fromCategorySlug}`
    : `/destinations/${province.slug}`;

  const backLabel = fromCategoryTitle
    ? `Back to ${fromCategoryTitle}`
    : `Back to ${province.name}`;

  const { email } = getAuthUser();
  const isLoggedIn = Boolean(email);
  const normalizeEmail = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();
  const isOwnReview = (review) =>
    Boolean(email) &&
    normalizeEmail(review?.user_email) === normalizeEmail(email);

  const reviewSummary = useMemo(() => {
    if (placeReviews.length > 0) {
      const total = placeReviews.reduce(
        (sum, review) => sum + Number(review?.rating || 0),
        0,
      );
      return {
        average: Math.round((total / placeReviews.length) * 10) / 10,
        count: placeReviews.length,
      };
    }

    return {
      average: Number(place.rating || 0),
      count: Number(place.reviews || 0),
    };
  }, [place.rating, place.reviews, placeReviews]);
  const formattedReviewAverage = Number(reviewSummary.average || 0).toFixed(1);
  const formattedReviewCount = Number(
    reviewSummary.count || 0,
  ).toLocaleString();

  const formatReviewDate = (createdAt) => {
    const parsedDate = new Date(createdAt);
    if (Number.isNaN(parsedDate.getTime())) return "Recently";
    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getReviewerName = (review) =>
    review.user_name || `User #${review.user || "Unknown"}`;

  const getReviewerInitials = (review) => {
    const reviewerName = getReviewerName(review).trim();
    if (!reviewerName) return "U";
    const parts = reviewerName.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const getReviewPhotoUrls = (review) =>
    Array.isArray(review?.photos)
      ? review.photos
        .map((photo) => String(photo?.image_url || "").trim())
        .filter(Boolean)
      : [];

  const savePlace = () => {
    if (!isLoggedIn) {
      openAuthPrompt("save");
      return;
    }
    const savedEntries = readSavedPlaceEntries();
    const withoutCurrent = savedEntries.filter(
      (entry) => String(entry.placeSlug) !== String(placeSlug),
    );

    const nextSaved = isPlaceSaved
      ? withoutCurrent
      : [
        ...withoutCurrent,
        {
          placeSlug: String(placeSlug || "").trim(),
          provinceSlug: String(province.slug || "").trim(),
          title: String(place.title || "").trim(),
          image: String(place.image || "").trim(),
          category:
            String(place.category || "Saved Place").trim() || "Saved Place",
        },
      ];

    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(nextSaved));
    setSavedPlacesVersion((version) => version + 1);
  };

  const addToItinerary = () => {
    if (!isLoggedIn) {
      openAuthPrompt("itinerary");
      return;
    }

    navigate("/itinerary/create", {
      state: {
        destination: place.title,
        image: place.image,
        notes: `Visit ${place.title} in ${province.name}`,
      },
    });
  };

  const openReviewFlow = () => {
    if (!isLoggedIn) {
      openAuthPrompt("review");
      return;
    }

    setEditingReview(null);
    setIsReviewModalOpen(true);
  };

  const openEditReviewFlow = (review) => {
    if (!isLoggedIn) {
      openAuthPrompt("review");
      return;
    }

    setEditingReview(review);
    setIsReviewModalOpen(true);
  };

  const submitReview = async ({ rating, reviewText, photoFiles = [] }) => {
    setIsSubmittingReview(true);
    setErrorMessage("");
    try {
      if (editingReview?.review_id) {
        await updatePlaceReview({
          reviewId: editingReview.review_id,
          placeId: place.id,
          rating,
          comment: reviewText,
          photoFiles,
        });
        setReviewStatusMessage("Your review has been updated.");
      } else {
        await submitPlaceReview({
          placeId: place.id,
          rating,
          comment: reviewText,
          photoFiles,
        });
        setReviewStatusMessage("Your review has been submitted.");
      }
      setIsReviewModalOpen(false);
      setEditingReview(null);
      await loadReviewsForPlace(place.id);
      setTimeout(() => setReviewStatusMessage(""), 4000);
    } catch (error) {
      const rawMessage = String(error?.message || "");
      if (rawMessage.includes("must make unique set")) {
        setErrorMessage("You already submitted a review for this destination.");
      } else {
        setErrorMessage(rawMessage || "Failed to submit review.");
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const confirmDeleteReview = async () => {
    if (!reviewToDelete?.review_id) return;

    setIsDeletingReview(true);
    setErrorMessage("");
    try {
      await deletePlaceReview(reviewToDelete.review_id);
      setReviewToDelete(null);
      await loadReviewsForPlace(place.id);
      setReviewStatusMessage("Your review has been deleted.");
      setTimeout(() => setReviewStatusMessage(""), 4000);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to delete review.");
    } finally {
      setIsDeletingReview(false);
    }
  };

  const openMap = () => {
    const savedMapLink = String(place.mapLink || "").trim();
    if (savedMapLink) {
      window.open(savedMapLink, "_blank", "noopener,noreferrer");
      return;
    }

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

        {reviewStatusMessage ? (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700 font-semibold flex items-center gap-2">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {reviewStatusMessage}
          </div>
        ) : null}

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
                  {reviewSummary.average}
                </span>
                ({formattedReviewCount} reviews)
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

        {/* Image Display */}
        {!place.hasRealImages ? (
          <div className="w-full h-[300px] sm:h-[400px] rounded-[1.5rem] bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-3 mb-12 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-base font-semibold text-gray-500">No images available for this destination</span>
            <span className="text-xs text-gray-400">Images will appear here once added by the administrator.</span>
          </div>
        ) : galleryImages.length === 1 ? (
          <div
            className="w-full h-[300px] sm:h-[450px] rounded-[1.5rem] overflow-hidden border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)] mb-12 cursor-pointer relative group"
            onClick={() => setActiveLightboxIndex(0)}
          >
            <img
              src={galleryImages[0]}
              alt={place.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-black/60 text-white font-bold text-xs rounded-full backdrop-blur-sm shadow-sm tracking-wide">
                View Fullscreen
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
            {/* Big left image */}
            <div
              className="h-[300px] sm:h-[400px] rounded-[1.5rem] overflow-hidden border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)] cursor-pointer relative group"
              onClick={() => setActiveLightboxIndex(0)}
            >
              <img
                src={galleryImages[0]}
                alt={place.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-black/60 text-white font-bold text-xs rounded-full backdrop-blur-sm shadow-sm tracking-wide">
                  View Gallery
                </span>
              </div>
            </div>

            {/* Right image grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[300px] sm:h-[400px]">
              {galleryImages.slice(1, 5).map((image, index) => (
                <div
                  key={`${place.slug}-${index}`}
                  className="w-full h-full rounded-[1.25rem] overflow-hidden border border-gray-200 cursor-pointer relative group"
                  onClick={() => setActiveLightboxIndex(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${place.title} ${index + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-black/60 text-white rounded-full backdrop-blur-sm shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden">
                <div className="relative h-[300px] w-full overflow-hidden">
                  <iframe
                    title={`${place.title} Location`}
                    src={(() => {
                      const link = String(place.mapLink || place.map_link || "").trim();
                      if (link.includes("<iframe") && link.includes("src=")) {
                        const match = link.match(/src="([^"]+)"/);
                        if (match) return match[1];
                      }
                      if (link.includes("google.com/maps/embed")) {
                        return link;
                      }
                      return `https://maps.google.com/maps?q=${encodeURIComponent(
                        `${place.title}, ${province.name}, Cambodia`
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
                    })()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <div className="px-5 py-3.5 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
                  <span className="text-xs text-gray-500 font-semibold truncate max-w-[70%]">
                    {place.title}, {province.name}, Cambodia
                  </span>
                  <button
                    onClick={openMap}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009B3E] hover:underline"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"
                      />
                    </svg>
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[1.5rem] border border-gray-200 shadow-[0_12px_30px_rgba(15,23,42,0.07)] overflow-hidden">
              <div className="bg-[#f0fdf4] px-6 py-4 border-b border-green-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center">
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 4V8a2 2 0 012-2z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      User Reviews
                    </h3>
                    <p className="text-xs text-gray-500">
                      Real feedback from travelers
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-200 bg-white text-xs font-semibold text-gray-700">
                  <svg
                    className="w-3.5 h-3.5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {formattedReviewAverage}
                  <span className="text-gray-300">|</span>
                  {formattedReviewCount} reviews
                </div>
              </div>

              <div className="p-6">
                {isLoadingReviews ? (
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div
                        key={`review-skeleton-${item}`}
                        className="h-[92px] rounded-xl bg-gray-100 animate-pulse"
                      />
                    ))}
                  </div>
                ) : null}

                {!isLoadingReviews && reviewErrorMessage ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {reviewErrorMessage}
                  </div>
                ) : null}

                {!isLoadingReviews &&
                  !reviewErrorMessage &&
                  placeReviews.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
                    No reviews yet. Be the first to share your experience.
                  </div>
                ) : null}

                {!isLoadingReviews &&
                  !reviewErrorMessage &&
                  placeReviews.length > 0 ? (
                  <div className="space-y-4">
                    {placeReviews.map((review) => (
                      <div
                        key={review.review_id}
                        className="rounded-xl border border-gray-200 p-4 bg-white hover:border-green-200 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-[#009B3E] border border-green-100 font-bold text-xs flex items-center justify-center">
                              {getReviewerInitials(review)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {getReviewerName(review)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatReviewDate(review.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={`${review.review_id}-${star}`}
                                  className={`w-4 h-4 ${star <= Number(review.rating || 0)
                                      ? "fill-current"
                                      : "text-gray-200 fill-current"
                                    }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-gray-700">
                              {Number(review.rating || 0)}
                            </span>
                          </div>
                        </div>

                        {isOwnReview(review) ? (
                          <div className="mb-3 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditReviewFlow(review)}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-[#009B3E] bg-green-50 hover:bg-green-100 transition-colors"
                            >
                              Edit Review
                            </button>
                            <button
                              type="button"
                              onClick={() => setReviewToDelete(review)}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                            >
                              Delete Review
                            </button>
                          </div>
                        ) : null}

                        <p className="text-sm text-gray-700 leading-relaxed">
                          {review.comment || "No comment provided."}
                        </p>
                        {getReviewPhotoUrls(review).length > 0 ? (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {getReviewPhotoUrls(review).map(
                              (imageUrl, index) => (
                                <img
                                  key={`${imageUrl}-${index}`}
                                  src={imageUrl}
                                  alt={`Review photo ${index + 1}`}
                                  className="w-full h-20 object-cover rounded-lg border border-gray-200"
                                />
                              ),
                            )}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
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
                        {bestTimeToVisit || "Not provided"}
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
                        {recommendedDuration || "Not provided"}
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
                        Dress code
                      </h4>
                      <p className="text-sm font-bold text-gray-900">
                        {dressCode || "Not provided"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {place.category} in {province.name}
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
        key={editingReview?.review_id || "new-review"}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setEditingReview(null);
        }}
        onSubmit={submitReview}
        isSubmitting={isSubmittingReview}
        title={editingReview ? "Edit your review" : "Share your experiences"}
        submitLabel={editingReview ? "Update Review" : "Submit Review"}
        initialRating={editingReview?.rating || 0}
        initialReviewText={editingReview?.comment || ""}
      />
      <ConfirmModal
        open={Boolean(reviewToDelete)}
        title="Delete review?"
        message="This will permanently remove your review and photos from this place."
        onCancel={() => setReviewToDelete(null)}
        onConfirm={confirmDeleteReview}
        confirmLabel={isDeletingReview ? "Deleting..." : "Delete Review"}
        loading={isDeletingReview}
      />

      {/* Lightbox Gallery Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Top Info Bar */}
          <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/50 to-transparent">
            <span className="text-sm font-bold tracking-wider">
              {place.title} — {activeLightboxIndex + 1} / {galleryImages.length}
            </span>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all focus:outline-none cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Main Image Container */}
          <div
            className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
              }}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 flex items-center justify-center text-white text-lg font-bold transition-all z-10 focus:outline-none cursor-pointer"
            >
              ⟨
            </button>

            {/* Current Image */}
            <img
              src={galleryImages[activeLightboxIndex]}
              alt={`${place.title} Gallery #${activeLightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 flex items-center justify-center text-white text-lg font-bold transition-all z-10 focus:outline-none cursor-pointer"
            >
              ⟩
            </button>
          </div>

          {/* Bottom Thumbnail Bar */}
          {galleryImages.length > 1 && (
            <div
              className="absolute bottom-6 flex justify-center gap-2 overflow-x-auto max-w-full px-6 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((image, idx) => (
                <button
                  key={`thumb-${idx}`}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${idx === activeLightboxIndex
                      ? "border-[#009B3E] scale-105 shadow-md"
                      : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
