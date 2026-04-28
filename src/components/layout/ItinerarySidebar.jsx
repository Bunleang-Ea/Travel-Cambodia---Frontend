import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Shared sidebar for all Itinerary pages.
 * Props:
 *  - activeView: "plans" | "create"  (highlights the active nav item)
 */
const ItinerarySidebar = ({ activeView = "plans" }) => (
  <aside className="w-[260px] bg-white border-r border-gray-100 hidden md:flex md:flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
    <div className="p-6">
      {/* Brand */}
      <div className="flex items-center mb-10">
        <div className="w-10 h-10 bg-[#00D06A] rounded-xl flex items-center justify-center text-white mr-3 shadow-sm shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-extrabold text-gray-900 text-sm leading-tight tracking-tight">
            Travel Cambodia
          </h1>
          <p className="text-[10px] font-medium text-gray-400 mt-0.5">Itinerary Planner</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-2">
        <NavLink
          to="/itinerary"
          end
          className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors ${
            activeView === "plans"
              ? "bg-emerald-50 text-[#00D06A]"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          View Plans
        </NavLink>

        <NavLink
          to="/itinerary/create"
          className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors ${
            activeView === "create"
              ? "bg-emerald-50 text-[#00D06A]"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
          }`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add Plans
        </NavLink>
      </nav>
    </div>
  </aside>
);

export default ItinerarySidebar;
