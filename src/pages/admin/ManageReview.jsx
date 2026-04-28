import React from "react";
import { Link } from "react-router-dom";

const ManageReview = () => {
  // Mock data matching your User Reviews mockup
  const reviews = [
    {
      id: 1,
      reviewer: {
        name: "Sarah Johnson",
        handle: "@sarah_travels",
        avatar: "https://i.pravatar.cc/150?u=sarah",
      },
      destination: {
        name: "Angkor Wat",
        location: "Siem Reap",
      },
      rating: 5,
      comment: '"Unforgettable...',
      date: "Oct 24, 2023",
      status: "LIVE",
      actionType: "live", // Determines which buttons show
    },
    {
      id: 2,
      reviewer: {
        name: "Michael Chen",
        handle: "@m_chen88",
        avatar: "https://i.pravatar.cc/150?u=michael",
      },
      destination: {
        name: "Bayon Temple",
        location: "Siem Reap",
      },
      rating: 4,
      comment: '"The stone face...',
      date: "Oct 23, 2023",
      status: "REVIEW",
      actionType: "review",
    },
    {
      id: 3,
      reviewer: {
        name: "David Miller",
        handle: "@dmiller",
        avatar: "https://i.pravatar.cc/150?u=david",
      },
      destination: {
        name: "Royal Palace",
        location: "Phnom Penh",
      },
      rating: 1,
      comment: "[Link Removed]...",
      date: "Oct 21, 2023",
      status: "REPORTED",
      actionType: "reported",
    },
    {
      id: 4,
      reviewer: {
        name: "Laura Jones",
        handle: "@lauraj_travels",
        avatar: null, // Test for initials fallback
        initials: "LJ",
      },
      destination: {
        name: "Kampot Salt Fields",
        location: "Kampot",
      },
      rating: 5,
      comment: '"Authentic local...',
      date: "Oct 20, 2023",
      status: "LIVE",
      actionType: "live",
    },
  ];

  // Helper to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex text-[#009B3E]">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? "fill-current" : "text-gray-200 fill-current"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-full">
      {/* Top Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Post-Moderation Feed
          </h2>
          <p className="text-sm text-gray-500">
            Monitor live reviews. Reviews are published immediately but can be
            flagged or taken down.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[120px] shadow-sm">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Needs Review
            </div>
            <div className="text-2xl font-black text-[#009B3E]">8</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 text-center min-w-[120px] shadow-sm">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Reported
            </div>
            <div className="text-2xl font-black text-red-500">3</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 border-b border-gray-200 pb-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-[#009B3E] text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
            All Reviews
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Live
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Needs Review
            <span className="ml-2 w-5 h-5 bg-green-100 text-[#009B3E] text-[10px] font-bold rounded-full flex items-center justify-center">
              8
            </span>
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Reported
            <span className="ml-2 w-5 h-5 bg-red-100 text-red-500 text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* More Filters */}
        <button className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-800 text-sm font-bold transition-colors">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          More Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Table Header */}
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

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Reviewer Col */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {review.reviewer.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={review.reviewer.avatar}
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                          {review.reviewer.initials}
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="text-sm font-bold text-gray-900">
                          {review.reviewer.name}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {review.reviewer.handle}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Destination Col */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">
                      {review.destination.name}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {review.destination.location}
                    </div>
                  </td>

                  {/* Rating Col */}
                  <td className="px-6 py-4">{renderStars(review.rating)}</td>

                  {/* Comment Col */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${review.comment.includes("[Link") ? "text-red-500 font-medium" : "text-gray-600"}`}
                    >
                      {review.comment}
                    </span>
                  </td>

                  {/* Date Col */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 whitespace-pre-wrap leading-tight max-w-[50px]">
                      {review.date.replace(", ", ",\n")}
                    </div>
                  </td>

                  {/* Status Col */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 inline-flex text-[10px] leading-4 font-extrabold rounded-md uppercase tracking-wider
                      ${
                        review.status === "LIVE"
                          ? "bg-green-100 text-[#009B3E]"
                          : review.status === "REVIEW"
                            ? "bg-green-100 text-[#009B3E]"
                            : "bg-red-50 text-red-500"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>

                  {/* Actions Col */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                      {/* Conditional Action Buttons based on status */}
                      {review.actionType === "live" && (
                        <>
                          <button className="w-28 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-sm transition-colors uppercase tracking-wider">
                            Take Down
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors mt-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                              />
                            </svg>
                          </button>
                        </>
                      )}

                      {review.actionType === "review" && (
                        <>
                          <button className="w-28 py-1.5 bg-[#009B3E] hover:bg-green-700 text-white text-[10px] font-bold rounded shadow-sm transition-colors uppercase tracking-wider">
                            Keep Live
                          </button>
                          <button className="w-28 py-1.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 text-[10px] font-bold rounded transition-colors uppercase tracking-wider">
                            Take Down
                          </button>
                        </>
                      )}

                      {review.actionType === "reported" && (
                        <>
                          <button className="w-28 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-sm transition-colors uppercase tracking-wider">
                            Confirm Take Down
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors mt-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-400 font-medium whitespace-pre-line sm:whitespace-normal">
            Showing 1 - 10 of 248{"\n"}reviews
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <button className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-50">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#009B3E] text-white shadow-sm text-xs">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-50 transition-colors text-xs border border-transparent hover:border-gray-200">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-50 transition-colors text-xs border border-transparent hover:border-gray-200">
              3
            </button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-gray-50 transition-colors text-xs border border-transparent hover:border-gray-200">
              25
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Links */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>© 2024 TRAVEL CAMBODIA ADMIN PORTAL</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-600 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-gray-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageReview;
