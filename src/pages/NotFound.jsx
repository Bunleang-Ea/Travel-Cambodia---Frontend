import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg"
            alt="Error 404 - Page Lost in Time"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
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

          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 mb-3 font-bold">
              Error 404
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Page Lost in Time
            </h1>
            <p className="text-gray-200 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              The page you're seeking has vanished like the lost temples of the
              jungle. But don't worry, your journey continues here.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Error Details */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-6">
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
              404
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            This Page Doesn't Exist
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            It seems you've wandered off the path. Let us guide you back to
            explore Cambodia's beautiful destinations.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Home Card */}
          <Link
            to="/"
            className="group bg-white rounded-[1.5rem] border border-gray-200 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h2m14-11v10a1 1 0 01-1 1h-2m-4-11l-4-2.5M9 9h6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Back to Home
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Return to the homepage and start your Cambodia journey.
            </p>
            <span className="inline-flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
              Go Home
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>

          {/* Locations Card */}
          <Link
            to="/locations"
            className="group bg-white rounded-[1.5rem] border border-gray-200 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Explore Locations
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Discover destinations across Cambodia's provinces.
            </p>
            <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>

          {/* Categories Card */}
          <Link
            to="/categories"
            className="group bg-white rounded-[1.5rem] border border-gray-200 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Browse Categories
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Find places by theme and travel style.
            </p>
            <span className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
              Browse
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Additional Help Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-[1.5rem] border border-green-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Need More Help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you think this is a mistake, please contact our support team or
            return to the homepage to continue planning your Cambodia adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-sm py-3 px-8 rounded-xl transition-all duration-300"
            >
              Go to Homepage
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold text-sm py-3 px-8 rounded-xl transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
