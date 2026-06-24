import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getMyProfile } from "../../services/modules/authApi";
import { API_BASE_URL } from "../../services/core/apiConfig";
import { getAuthUser } from "../../utils/authRole";

const toAbsoluteMediaUrl = (value) => {
  const source = String(value || "").trim();
  if (!source) return "";
  if (/^https?:\/\//i.test(source)) return source;
  if (source.startsWith("data:")) return source;

  // Resolve relative paths (e.g. "profile_pictures/file.jpg") against the
  // Django backend origin, not the React dev-server origin.
  try {
    const backendOrigin = new URL(API_BASE_URL).origin;
    return new URL(source, backendOrigin).toString();
  } catch {
    return source;
  }
};

const AdminLayout = ({ children }) => {
  const { email } = getAuthUser();
  const navClass = ({ isActive }) =>
    `flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-[#e6f7ec] text-[#009B3E] font-bold"
        : "text-gray-600 hover:bg-gray-50 font-medium"
    }`;

  const [profile, setProfile] = useState({
    full_name: "",
    profile_picture: "",
    profile_picture_url: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        if (isMounted) {
          setProfile({
            full_name: String(data?.full_name || "").trim(),
            profile_picture: toAbsoluteMediaUrl(data?.profile_picture || ""),
            profile_picture_url: toAbsoluteMediaUrl(
              data?.profile_picture_url || "",
            ),
          });
        }
      } catch {
        if (isMounted) {
          setProfile({
            full_name: "",
            profile_picture: "",
            profile_picture_url: "",
          });
        }
      }
    };

    loadProfile();
    window.addEventListener("auth-changed", loadProfile);

    return () => {
      isMounted = false;
      window.removeEventListener("auth-changed", loadProfile);
    };
  }, []);

  const sidebarUser = useMemo(() => {
    const name = profile.full_name || (email ? email.split("@")[0] : "Admin");
    const avatar =
      profile.profile_picture || profile.profile_picture_url || "";

    return {
      name,
      avatar,
      initials: name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "A",
    };
  }, [email, profile.full_name, profile.profile_picture, profile.profile_picture_url]);

  return (
    <div className="flex h-screen bg-[#F7FBFC] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-white border-r border-gray-200 hidden md:flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-gray-200">
            <div className="w-8 h-8 bg-[#009B3E] rounded flex items-center justify-center text-white mr-3">
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
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-tight">
                Travel Cambodia
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <NavLink to="/admin/dashboard" className={navClass}>
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Dashboard
            </NavLink>
            <NavLink to="/admin/places" className={navClass}>
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Manage Destinations
            </NavLink>
            <NavLink to="/admin/categories" className={navClass}>
              <svg
                className="w-5 h-5 mr-3"
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
            <NavLink to="/admin/locations" className={navClass}>
              <svg
                className="w-5 h-5 mr-3"
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
              Manage Locations
            </NavLink>
            <NavLink to="/admin/reviews" className={navClass}>
              <svg
                className="w-5 h-5 mr-3"
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
            <NavLink to="/admin/contacts" className={navClass}>
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12H8m0 0l4-4m-4 4l4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              User Contacts
            </NavLink>
          </nav>
        </div>

        {/* User Profile Bottom */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#009B3E] text-white flex items-center justify-center font-bold text-sm mr-3 overflow-hidden shrink-0">
              {sidebarUser.avatar ? (
                <img
                  src={sidebarUser.avatar}
                  alt={sidebarUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                sidebarUser.initials
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">
                {sidebarUser.name}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">Content Admin</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center flex-1">
            <Link
              to="/"
              className="text-sm text-gray-500 font-medium mr-6 hover:text-gray-900 cursor-pointer"
            >
              Home
            </Link>

            {/* Search Bar */}
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
                placeholder="Search by destination name, city, or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Notification Bell */}
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
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
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Add Button */}
            <Link
              to="/admin/add-destination"
              className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg shadow-sm transition duration-200 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1.5"
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
              Add New Destination
            </Link>
          </div>
        </header>

        {/* INJECTED PAGE CONTENT GOES HERE */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
