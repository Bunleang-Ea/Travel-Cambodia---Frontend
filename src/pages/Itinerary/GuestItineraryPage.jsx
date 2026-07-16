import React from "react";
import { Link } from "react-router-dom";
import ItinerarySidebar from "../../components/layout/ItinerarySidebar";

const GuestItineraryPage = () => {
  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-[260px] bg-white border-r border-gray-100 hidden md:flex md:flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        <div className="p-6">
          {/* Brand Logo */}
          <div className="flex items-center mb-12">
            <div className="w-10 h-10 bg-[#00D06A] rounded-xl flex items-center justify-center text-white mr-3 shadow-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-gray-900 text-sm leading-tight tracking-tight">
                Travel Cambodia
              </h1>
              <p className="text-[10px] font-medium text-gray-400 mt-0.5">
                The Modern Navigator
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-3">
            <Link
              to="/login"
              className="w-full flex items-center px-4 py-3.5 bg-emerald-50 text-[#00D06A] rounded-xl font-bold text-xs tracking-wider uppercase transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Plans
            </Link>
            <Link
              to="/login"
              className="w-full flex items-center px-4 py-3.5 text-gray-500 hover:bg-gray-50 hover:text-gray-800 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add Plans
            </Link>
          </nav>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 relative flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50/40 via-white to-white overflow-hidden p-6 z-10">
        {/* Floating Decorative Images (Hidden on small screens) */}
        <div className="hidden lg:block absolute top-16 right-24 transform rotate-6 hover:rotate-12 transition-transform duration-500 z-0">
          <div className="w-48 h-48 p-2 bg-white rounded-2xl shadow-xl">
            <img
              src="/images/chanratanak-nay-GRK6KO4exaI-unsplash.jpg"
              alt="Temple view"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-24 left-16 transform -rotate-6 hover:-rotate-12 transition-transform duration-500 z-0">
          <div className="w-64 h-40 p-2 bg-white rounded-2xl shadow-xl">
            <img
              src="/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg"
              alt="Angkor Wat reflection"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* 3. CENTER CALL TO ACTION */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
          {/* Compass Icon Badge */}
          <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-emerald-200 flex items-center justify-center mb-8 bg-white/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#00D06A] rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>

          {/* Typography */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-5">
            Ready to start planning your <br />
            <span className="text-[#00D06A]">Cambodian</span> <br />
            adventure?
          </h2>

          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-lg mb-10">
            Sign in or create an account to view and manage your saved travel
            itineraries, curated routes through Angkor Wat, and hidden gems in
            Phnom Penh.
          </p>

          {/* Authentication Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center px-10 py-3.5 bg-[#00D06A] hover:bg-[#00B05A] text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-100 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-xl shadow-sm transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create Account
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full">
            {/* Stat 1 */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 flex-1 min-w-[140px] shadow-sm border border-white">
              <div className="text-2xl font-black text-[#00D06A] mb-1">
                500<span className="text-xl">+</span>
              </div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                Curated Routes
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 flex-1 min-w-[140px] shadow-sm border border-white">
              <div className="text-2xl font-black text-[#00D06A] mb-1">12k</div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                Happy Travelers
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 flex-1 min-w-[140px] shadow-sm border border-white">
              <div className="text-2xl font-black text-[#00D06A] mb-1">
                24<span className="text-xl">/</span>7
              </div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                Local Support
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestItineraryPage;
