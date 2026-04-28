import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoutModal from "../modals/LogoutModal";
import {
  clearAuthUser,
  getAuthUser,
  getRoleDestination,
} from "../../utils/authRole";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(() => getAuthUser());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const syncAuthUser = () => setAuthUser(getAuthUser());

    window.addEventListener("auth-changed", syncAuthUser);
    window.addEventListener("storage", syncAuthUser);

    return () => {
      window.removeEventListener("auth-changed", syncAuthUser);
      window.removeEventListener("storage", syncAuthUser);
    };
  }, []);

  const roleDestination = getRoleDestination(authUser.role);
  const roleLabel =
    authUser.role === "superadmin"
      ? "Super Admin"
      : authUser.role === "admin"
        ? "Admin"
        : "";
  const isLoggedIn = Boolean(authUser.email);

  const handleConfirmLogout = () => {
    clearAuthUser();
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Left Section - Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            {/* Temple Icon Placeholder */}
            <svg
              className="w-7 h-7 text-gray-500"
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
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Travel Cambodia
            </span>
          </Link>

          {/* Middle Section - Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg py-1 transition-colors ${
                  isActive
                    ? "text-[#009B3E] font-semibold border-b-2 border-[#009B3E]"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/locations"
              className={({ isActive }) =>
                `text-lg py-1 transition-colors ${
                  isActive
                    ? "text-[#009B3E] font-semibold border-b-2 border-[#009B3E]"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`
              }
            >
              Locations
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `text-lg py-1 transition-colors ${
                  isActive
                    ? "text-[#009B3E] font-semibold border-b-2 border-[#009B3E]"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/itinerary"
              className={({ isActive }) =>
                `text-lg py-1 transition-colors ${
                  isActive
                    ? "text-[#009B3E] font-semibold border-b-2 border-[#009B3E]"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`
              }
            >
              Itinerary
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-lg py-1 transition-colors ${
                  isActive
                    ? "text-[#009B3E] font-semibold border-b-2 border-[#009B3E]"
                    : "text-gray-500 hover:text-gray-900 font-medium"
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            {roleDestination ? (
              <Link
                to={roleDestination}
                className="hidden lg:inline-flex px-4 py-2 rounded bg-[#009B3E] text-white hover:bg-green-700 transition-colors text-base font-semibold"
              >
                {roleLabel} Dashboard
              </Link>
            ) : null}

            {!isLoggedIn ? (
              <>
                {/* Log In Button */}
                <Link
                  to="/login"
                  className="hidden lg:inline-flex px-5 py-2 border border-[#009B3E] rounded text-[#009B3E] hover:bg-green-50 transition-colors text-base font-medium bg-white"
                >
                  Log In
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  className="hidden lg:inline-flex px-5 py-2 border border-[#009B3E] rounded text-[#009B3E] hover:bg-green-50 transition-colors text-base font-medium bg-white"
                >
                  Register
                </Link>
              </>
            ) : null}

            {isLoggedIn ? (
              <>
                {/* Divider */}
                <div className="hidden lg:block h-6 border-l border-gray-300 mx-2"></div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="hidden lg:inline-flex px-4 py-2 border border-red-300 rounded text-red-600 hover:bg-red-50 transition-colors text-base font-medium bg-white"
                >
                  Logout
                </button>

                {/* User Profile */}
                <Link
                  to="/user/profile"
                  className="hidden lg:flex items-center justify-center w-8 h-8 border-[1.5px] border-[#009B3E] rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                {/* Settings */}
                <Link
                  to="/user/settings"
                  className="hidden lg:block text-gray-500 hover:text-gray-800 transition-colors pl-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              </>
            ) : null}

            {/* ── Hamburger Button (mobile only) ── */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-sm px-4 pb-5 pt-3 space-y-1 shadow-md">
            {["/ Home", "/locations Locations", "/categories Categories", "/itinerary Itinerary", "/contact Contact Us"].map((entry) => {
              const [to, label] = entry.split(" ");
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-green-50 text-[#009B3E] font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}

            {roleDestination && (
              <Link
                to={roleDestination}
                className="block px-4 py-3 rounded-xl text-base font-semibold bg-[#009B3E] text-white text-center mt-2"
              >
                {roleLabel} Dashboard
              </Link>
            )}

            <div className="pt-2 border-t border-gray-100 mt-2 flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="block w-full text-center px-4 py-3 border-2 border-[#009B3E] rounded-xl text-[#009B3E] font-semibold hover:bg-green-50 transition-colors">
                    Log In
                  </Link>
                  <Link to="/register" className="block w-full text-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/user/profile" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50">
                    My Profile
                  </Link>
                  <Link to="/user/settings" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50">
                    Settings
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setIsMenuOpen(false); setShowLogoutModal(true); }}
                    className="block w-full text-center px-4 py-3 border-2 border-red-300 rounded-xl text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Navbar;
