import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestResetPassword } from "../../services/modules/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await requestResetPassword({ email: contactInfo });
      navigate("/otp-verification", {
        state: { email: contactInfo, context: "reset" },
      });
    } catch (err) {
      setErrorMessage(err?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7FBFC]">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 mx-auto">
        {/* Forgot Password Card */}
        <div className="w-full max-w-sm rounded-[1.75rem] bg-white/90 border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] px-4 py-6 sm:px-6 sm:py-7 backdrop-blur-sm">
          {/* Icon & Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
              {/* Custom Padlock SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M17 8H7V6c0-2.76 2.24-5 5-5s5 2.24 5 5v2zm-2 0V6c0-1.66-1.34-3-3-3S9 4.34 9 6v2h6zM5 10c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V10z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot your password?
            </h2>
            <p className="text-sm text-gray-500 font-medium px-2">
              Enter your email to receive an OTP code.
            </p>
          </div>

          <div className="mb-4 rounded-2xl border border-green-100 bg-green-50/70 px-4 py-3 text-xs leading-relaxed text-green-800">
            We’ll send a one-time password (OTP) to your email address so you
            can verify your identity and continue.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8.5l8.1 5.4c.5.3 1.1.3 1.6 0L21 8.5M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 disabled:opacity-60"
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-5 text-center text-xs text-gray-700">
            <Link
              to="/login"
              className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-bold"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Login page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
