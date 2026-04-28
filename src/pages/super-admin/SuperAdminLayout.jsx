import React from "react";
import { Link, NavLink } from "react-router-dom";

const SuperAdminLayout = ({ children }) => {
  const navClass = ({ isActive }) =>
    `flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-[#e6f7ec] text-[#009B3E] font-bold"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
    }`;

  return (
    <div className="flex h-screen bg-[#F7FBFC] font-sans overflow-hidden">
      <aside className="w-[260px] bg-white border-r border-gray-200 hidden md:flex flex-col justify-between shrink-0">
        <div className="flex-1 overflow-y-auto">
          <div className="h-24 flex items-center px-6 border-b border-gray-50">
            <div className="w-8 h-8 bg-[#009B3E] rounded-lg flex items-center justify-center text-white mr-3 shadow-sm">
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
              <h1 className="font-black text-[#009B3E] text-lg leading-tight tracking-tight">
                Super Admin
              </h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                System Control
              </p>
            </div>
          </div>

          <div className="py-6 space-y-8">
            <div>
              <h2 className="px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                Super Admin Panel
              </h2>
              <nav className="space-y-1 px-3">
                <NavLink to="/super-admin/users" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Manage Users
                </NavLink>

                <NavLink to="/super-admin/roles" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Role Management
                </NavLink>

                <NavLink to="/super-admin/permissions" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  System Permissions
                </NavLink>

                <NavLink to="/super-admin/settings" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Admin Settings
                </NavLink>
              </nav>
            </div>

            <div>
              <h2 className="px-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                Content Management
              </h2>
              <nav className="space-y-1 px-3">
                <NavLink to="/super-admin/places" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
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
                  Manage Destinations
                </NavLink>

                <NavLink to="/super-admin/categories" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Manage Categories
                </NavLink>

                <NavLink to="/super-admin/reviews" className={navClass}>
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Manage User Reviews
                </NavLink>
              </nav>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#009B3E] flex items-center justify-center font-bold text-xs mr-3">
              AR
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">
                Alex Rivera
              </p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center flex-1">
            <Link
              to="/"
              className="text-sm text-gray-500 font-medium mr-6 hover:text-gray-900 cursor-pointer"
            >
              Home
            </Link>

            <div className="max-w-md w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search members, roles or status..."
                className="w-full pl-10 pr-4 py-2 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009B3E] bg-gray-100 hover:bg-white focus:bg-white transition-colors font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
