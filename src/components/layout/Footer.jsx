import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t-[3px] border-[#009B3E] pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand & Description Column (Left) */}
          <div className="md:col-span-5 lg:col-span-6">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#009B3E] rounded flex items-center justify-center text-white">
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
                    d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#009B3E] tracking-tight">
                Travel Cambodia
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm mb-6">
              Explore Cambodia with us - your trusted tourism guide for
              destinations, culture, and unforgettable travel experiences. We
              help you discover the magic of the Kingdom of Wonder.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#009B3E] transition-colors"
              >
                {/* Facebook */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.03 3.66 9.2 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.58v1.9h2.8l-.45 2.9h-2.35V22c4.78-.73 8.44-4.9 8.44-9.93z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#009B3E] transition-colors"
              >
                {/* TikTok */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.24h-3.01v13.31a2.67 2.67 0 11-2.67-2.67c.23 0 .45.03.67.09V10.1a5.7 5.7 0 00-.67-.04 5.68 5.68 0 105.68 5.68V9.05a7.84 7.84 0 004.58 1.47V7.5a4.76 4.76 0 01-.81-.81z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#009B3E] transition-colors"
              >
                {/* Instagram */}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.76 5.76 0 0122 7.75v8.5A5.76 5.76 0 0116.25 22h-8.5A5.76 5.76 0 012 16.25v-8.5A5.76 5.76 0 017.75 2zm-.2 2A3.55 3.55 0 004 7.55v8.9A3.55 3.55 0 007.55 20h8.9A3.55 3.55 0 0020 16.45v-8.9A3.55 3.55 0 0016.45 4h-8.9zm9.9 1.5a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column (Middle) */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-xs font-bold text-[#009B3E] tracking-wider mb-4 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-[#009B3E] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/locations"
                  className="text-sm text-gray-500 hover:text-[#009B3E] transition-colors"
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-[#009B3E] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-sm text-gray-500 hover:text-[#009B3E] transition-colors"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column (Right) */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-xs font-bold text-[#009B3E] tracking-wider mb-4 uppercase">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {/* Location */}
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-3 mt-0.5 flex-shrink-0"
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
                <span className="text-sm text-gray-500">
                  Phnom Penh, Cambodia
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm text-gray-500">
                  +855 (0) 12 345 678
                </span>
              </li>

              {/* Email */}
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-500">
                  hello@travelcambodia.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-100 py-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest">
            © 2026 TRAVEL CAMBODIA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
