import React, { useState } from "react";

const ReviewModal = ({
  isOpen = true,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  // State for interactive star rating
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  const activeRating = hoverRating || rating;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) return;

    if (onSubmit) {
      await onSubmit({ rating, reviewText: reviewText.trim() });
      return;
    }

    onClose?.();
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      {/* Modal Content Card */}
      <div className="relative w-full max-w-md bg-white/95 rounded-[1.5rem] shadow-[0_18px_50px_rgba(15,23,42,0.08)] border border-gray-200 overflow-hidden flex flex-col backdrop-blur-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-5 sm:p-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            Share your experiences
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Star Rating Section */}
            <div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= activeRating;
                  return (
                    <div
                      key={star}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      {/* Star Highlight Box (Appears on active/hover like your mockup) */}
                      <div
                        className={`p-1.5 rounded-lg transition-all duration-200 ${
                          rating === star
                            ? "bg-yellow-100 border border-yellow-400 scale-110"
                            : "border border-transparent hover:scale-110"
                        }`}
                      >
                        <svg
                          className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-200 ${
                            isActive ? "text-[#F59E0B]" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700 min-h-5">
                {activeRating
                  ? ratingLabels[activeRating - 1]
                  : "Tap a star to rate"}
              </p>
            </div>

            {/* 2. Review Text Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Write your review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you love? Any tips for our travelers?"
                className="w-full bg-white border-2 border-gray-300 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none transition-all"
                rows="3"
              ></textarea>
            </div>

            {/* 3. Photo Upload Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Photos
              </label>
              <div className="w-full border-2 border-dashed border-gray-300 bg-white rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-green-500 transition-all group">
                <svg
                  className="w-8 h-8 text-black mb-2 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h3l2-2h6l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  PNG, JPG, JPEG (MAX 10MB)
                </p>
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 text-sm font-semibold px-3 py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !rating || !reviewText.trim()}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
