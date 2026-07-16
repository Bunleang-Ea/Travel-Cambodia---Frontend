import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
import {
  deleteAdminReview,
  getAdminPlaces,
  getAdminReviews,
  updateAdminReview,
} from "../../services/modules/adminApi";

const getReviewStatus = (review) => {
  if (review?.is_approved === false) {
    return "MUTED";
  }
  const comment = String(review?.comment || "").toLowerCase();
  if (comment.includes("http://") || comment.includes("https://")) {
    return "REPORTED";
  }
  if (Number(review?.rating || 0) <= 2) return "REVIEW";
  return "LIVE";
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const renderStars = (rating) => (
  <div className="flex text-[#009B3E]">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-3.5 h-3.5 ${
          star <= rating ? "fill-current" : "text-gray-200 fill-current"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ManageReview = () => {
  const [reviews, setReviews] = useState([]);
  const [placesById, setPlacesById] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [reviewData, placeData] = await Promise.all([
        getAdminReviews(),
        getAdminPlaces(),
      ]);

      const placeLookup = {};
      (Array.isArray(placeData) ? placeData : []).forEach((place) => {
        placeLookup[String(place.place_id)] = place;
      });

      setPlacesById(placeLookup);
      setReviews(Array.isArray(reviewData) ? reviewData : []);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const normalizedReviews = useMemo(
    () =>
      reviews.map((review) => {
        const status = getReviewStatus(review);
        const place = placesById[String(review.place)] || null;

        return {
          ...review,
          status,
          destinationName: place?.name || `Place #${review.place}`,
          destinationLocation: place?.location_name || "-",
        };
      }),
    [reviews, placesById],
  );

  const stats = useMemo(() => {
    const result = { ALL: 0, LIVE: 0, REVIEW: 0, REPORTED: 0, MUTED: 0 };
    normalizedReviews.forEach((review) => {
      result.ALL += 1;
      if (result[review.status] !== undefined) {
        result[review.status] += 1;
      }
    });
    return result;
  }, [normalizedReviews]);

  const filteredReviews = useMemo(() => {
    if (activeFilter === "ALL") return normalizedReviews;
    return normalizedReviews.filter((review) => review.status === activeFilter);
  }, [activeFilter, normalizedReviews]);

  const handleToggleApproval = async (review) => {
    const nextApproved = !review.is_approved;
    setErrorMessage("");
    try {
      await updateAdminReview(review.review_id, { is_approved: nextApproved });
      setReviews((prev) =>
        prev.map((item) =>
          item.review_id === review.review_id
            ? { ...item, is_approved: nextApproved }
            : item
        )
      );
    } catch (error) {
      setErrorMessage(error?.message || "Failed to update approval status.");
    }
  };

  const handleTakeDown = async (review) => {
    const confirmed = window.confirm(
      "Take down this review? This action deletes it permanently.",
    );
    if (!confirmed) return;

    setErrorMessage("");
    try {
      await deleteAdminReview(review.review_id);
      setReviews((prev) =>
        prev.filter((item) => item.review_id !== review.review_id),
      );
    } catch (error) {
      setErrorMessage(error?.message || "Failed to remove review.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-full">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Post-Moderation Feed
          </h2>
          <p className="text-sm text-gray-500">
            Monitor live reviews and take down inappropriate content.
          </p>
        </div>

        <div className="flex gap-4 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[120px] shadow-sm">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Needs Review
            </div>
            <div className="text-2xl font-black text-[#009B3E]">
              {stats.REVIEW}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[120px] shadow-sm">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Reported
            </div>
            <div className="text-2xl font-black text-red-500">
              {stats.REPORTED}
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeFilter === "ALL"
              ? "bg-[#009B3E] text-white"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          All Reviews ({stats.ALL})
        </button>
        <button
          onClick={() => setActiveFilter("LIVE")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeFilter === "LIVE"
              ? "bg-[#009B3E] text-white"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          Live ({stats.LIVE})
        </button>
        <button
          onClick={() => setActiveFilter("REVIEW")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeFilter === "REVIEW"
              ? "bg-[#009B3E] text-white"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          Needs Review ({stats.REVIEW})
        </button>
        <button
          onClick={() => setActiveFilter("REPORTED")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeFilter === "REPORTED"
              ? "bg-[#009B3E] text-white"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          Reported ({stats.REPORTED})
        </button>
        <button
          onClick={() => setActiveFilter("MUTED")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            activeFilter === "MUTED"
              ? "bg-[#009B3E] text-white"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          Muted ({stats.MUTED})
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-sm text-gray-500">
                    Loading reviews...
                  </td>
                </tr>
              )}

              {!isLoading && filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-sm text-gray-500">
                    No reviews found for this filter.
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredReviews.map((review) => (
                  <tr key={review.review_id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">
                        {review.user_name || `User #${review.user}`}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        User ID: {review.user}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {placesById[String(review.place)] ? (
                        <Link
                          to={`/details/${slugify(placesById[String(review.place)].location_name)}/${slugify(placesById[String(review.place)].name)}`}
                          target="_blank"
                          className="text-sm font-bold text-gray-900 hover:text-[#009B3E] hover:underline transition-colors block"
                        >
                          {review.destinationName}
                        </Link>
                      ) : (
                        <div className="text-sm font-bold text-gray-900">
                          {review.destinationName}
                        </div>
                      )}
                      <div className="text-[11px] text-gray-400">
                        {review.destinationLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {renderStars(Number(review.rating || 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {review.comment || "(No comment)"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(review.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 inline-flex text-[10px] leading-4 font-extrabold rounded-md uppercase tracking-wider ${
                          review.status === "LIVE"
                            ? "bg-green-100 text-[#009B3E]"
                            : review.status === "REVIEW"
                              ? "bg-yellow-100 text-yellow-700"
                              : review.status === "MUTED"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-red-50 text-red-500"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleToggleApproval(review)}
                          className={`px-3 py-1.5 rounded text-[10px] font-bold shadow-sm transition-colors uppercase tracking-wider border ${
                            review.is_approved
                              ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          {review.is_approved ? "Mute / Reject" : "Approve"}
                        </button>
                        <button
                          onClick={() => handleTakeDown(review)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-sm transition-colors uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-6 py-4 border-t border-gray-200 text-xs text-gray-500">
          Showing {filteredReviews.length} review(s)
        </div>
      </div>
    </div>
  );
};

export default ManageReview;
