import React from "react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-[#F7FBFC]">
      {/* Left side - Bayon Temple Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden border-r border-green-300">
        <img
          // Replace with your local asset path, e.g., src="/assets/bayon-temple.jpg"
          src="src/assets/images/image.png"
          alt="Ancient temple ruins"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-end p-10">
          <div className="max-w-sm text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">
              Cambodia Travel
            </p>
            <h2 className="text-4xl font-bold leading-tight mb-3">
              Welcome back to the journey
            </h2>
            <p className="text-base text-white/85 leading-relaxed">
              Sign in to continue exploring Cambodia’s most memorable places.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-lg rounded-[2rem] bg-white/90 border border-gray-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] px-6 py-8 sm:px-10 sm:py-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-base font-medium">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2 gap-4">
              <label className="flex items-center text-base text-gray-600 cursor-pointer hover:text-gray-700 transition-colors">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 rounded border-gray-400 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-base text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-base text-gray-500 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google OAuth Button (Corrected Branding) */}
          <button
            type="button"
            className="w-full flex items-center justify-center border-2 border-gray-300 hover:bg-gray-50 text-gray-700 text-lg font-semibold py-3.5 px-4 rounded-xl transition duration-200 bg-white shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
            Google
          </button>

          {/* Register Link */}
          <div className="mt-8 text-center text-xs text-gray-700">
            <span className="text-base">Don't have account?</span>{" "}
            <a
              href="#"
              className="text-purple-700 text-base font-bold hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
