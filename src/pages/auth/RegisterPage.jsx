import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../services/core/apiConfig";
import { requestGoogleIdToken } from "../../services/core/googleIdentity";
import { googleAuthenticate, register } from "../../services/modules/authApi";
import { saveAuthUser } from "../../utils/authRole";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      };

      await register(payload);
      navigate("/otp-verification", {
        state: {
          email,
          context: "register",
          registerPayload: payload,
        },
      });
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error data:", err?.data);
      
      // Extract detailed error message from backend
      let detailedMessage = err?.message || "Registration failed. Please try again.";
      if (err?.data?.errors) {
        const errorFields = Object.entries(err.data.errors);
        if (errorFields.length > 0) {
          const [field, messages] = errorFields[0];
          const fieldError = Array.isArray(messages) ? messages[0] : messages;
          detailedMessage = `${field}: ${fieldError}`;
        }
      }
      
      setErrorMessage(detailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const EyeIcon = ({ show, onToggle, label }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
      aria-label={label}
    >
      {show ? (
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
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      ) : (
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
      )}
    </button>
  );

  const handleGoogleRegister = async () => {
    setErrorMessage("");
    setIsGoogleSubmitting(true);
    try {
      const idToken = await requestGoogleIdToken(GOOGLE_CLIENT_ID);
      const data = await googleAuthenticate({ id_token: idToken });
      const accessToken = data?.tokens?.access || data?.token || data?.access;
      const refreshToken = data?.tokens?.refresh;

      saveAuthUser({
        email: data?.email || "",
        role: data?.user?.role,
        roles: data?.roles,
        isStaff: data?.is_staff ?? data?.user?.is_staff,
        isSuperuser: data?.is_superuser ?? data?.user?.is_superuser,
        token: accessToken,
        refreshToken,
      });
      navigate("/");
    } catch (err) {
      setErrorMessage(
        err?.message || "Google sign-in failed. Please try again.",
      );
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FBFC]">
      {/* Left side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-4 overflow-hidden">
        <div className="w-full max-w-sm rounded-[1.75rem] bg-white/90 border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] px-5 py-5 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Join our community
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <form className="space-y-2.5" onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all text-sm"
                  required
                />
                <EyeIcon
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  label={showPassword ? "Hide password" : "Show password"}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Password must contain: uppercase, lowercase, number, and special character (!@#$%^&*...)
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all text-sm"
                  required
                />
                <EyeIcon
                  show={showConfirm}
                  onToggle={() => setShowConfirm((v) => !v)}
                  label={showConfirm ? "Hide password" : "Show password"}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isSubmitting || isGoogleSubmitting}
            className="w-full flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold py-2 px-4 rounded-xl transition duration-200 bg-white shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isGoogleSubmitting ? "Connecting..." : "Google"}
          </button>

          {/* Footer links */}
          <div className="mt-3 text-center text-xs text-gray-700">
            <span className="text-sm">Already have an account?</span>{" "}
            <Link
              to="/login"
              className="text-purple-700 text-sm font-bold hover:underline"
            >
              Login
            </Link>
          </div>

          <div className="mt-2 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors font-semibold"
            >
              <svg
                className="w-3 h-3 mr-1.5"
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
              Back to Home page
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Temple Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden border-l border-green-300">
        <img
          src="/images/ancient-head-temple-cambodia.jpg"
          alt="Ta Prohm temple roots"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-end p-8">
          <div className="max-w-sm text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">
              Cambodia Travel
            </p>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Start your journey with us
            </h2>
            <p className="text-sm text-white/85 leading-relaxed">
              Create your account and plan unforgettable trips across Cambodia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
