import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuthenticate, login } from "../../services/modules/authApi";
import { saveAuthUser } from "../../utils/authRole";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const data = await login({ email, password });
      const accessToken = data?.tokens?.access || data?.token || data?.access;
      const refreshToken = data?.tokens?.refresh;

      saveAuthUser({
        email: data?.email || data?.user?.email || email,
        role: data?.user?.role,
        roles: data?.roles,
        isStaff: data?.is_staff ?? data?.user?.is_staff,
        isSuperuser: data?.is_superuser ?? data?.user?.is_superuser,
        token: accessToken,
        refreshToken,
      });
      navigate("/");
    } catch (err) {
      const rawMessage = String(err?.message || "");
      const isEmailNotRegistered =
        err?.status === 400 &&
        rawMessage.includes("not registered yet");
      const isIncorrectPassword =
        err?.status === 400 &&
        (rawMessage.includes("Incorrect password") ||
          rawMessage.includes("Unable to log in with provided credentials"));

      setErrorMessage(
        isEmailNotRegistered
          ? "This email is not registered yet. Please sign up first."
          : isIncorrectPassword
            ? "Incorrect password. Please try again."
            : rawMessage === "Request failed: 400"
              ? "Invalid email or password. Please try again."
              : rawMessage || "Invalid email or password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMessage("");
    setIsGoogleSubmitting(true);
    try {
      const idToken = credentialResponse.credential;
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
    <div className="flex min-h-screen bg-[#F7FBFC]">
      {/* Left side - Bayon Temple Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden border-r border-green-300">
        <img
          src="/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg"
          alt="Ancient temple ruins"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-end p-8">
          <div className="max-w-sm text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">
              Cambodia Travel
            </p>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Welcome back to the journey
            </h2>
            <p className="text-sm text-white/85 leading-relaxed">
              Sign in to continue exploring Cambodia's most memorable places.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-sm rounded-[1.75rem] bg-white/90 border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] px-4 py-6 sm:px-6 sm:py-7 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Sign in to your account
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-11 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
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
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 gap-3">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-gray-700 transition-colors">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 rounded border-gray-400 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-5 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="w-full flex justify-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setErrorMessage("Google sign-in failed or was cancelled.");
              }}
              shape="rectangular"
              size="large"
              text="signin_with"
              theme="outline"
              width="100%"
            />
          </div>

          <div className="mt-5 text-center text-xs text-gray-700">
            <span className="text-sm">Don't have account?</span>{" "}
            <Link
              to="/register"
              className="text-purple-700 text-sm font-bold hover:underline"
            >
              Register
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-gray-700">
            <Link
              to="/"
              className="inline-flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors font-semibold"
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
              Back to Home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
