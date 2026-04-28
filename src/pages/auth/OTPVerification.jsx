import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyOtp,
  requestResetPassword,
  register,
} from "../../services/modules/authApi";
import { saveAuthUser } from "../../utils/authRole";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const context = location.state?.context || "register"; // "register" | "reset"
  const registerPayload = location.state?.registerPayload;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}s`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setErrorMessage("Please enter all 6 digits.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await verifyOtp({ email, otp_code: otpCode });
      if (context === "register") {
        saveAuthUser({ email });
        navigate("/");
      } else {
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setErrorMessage(err?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setErrorMessage("");
    setTimeLeft(60);
    try {
      if (context === "register") {
        if (!registerPayload) {
          throw new Error(
            "Registration details are missing. Please register again.",
          );
        }
        await register(registerPayload);
      } else {
        await requestResetPassword({ email });
      }
    } catch (err) {
      setErrorMessage(
        err?.message || "Failed to resend OTP. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7FBFC]">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 mx-auto">
        <div className="w-full max-w-sm rounded-[1.75rem] bg-white/90 border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)] px-4 py-6 sm:px-6 sm:py-7 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              OTP Verification
            </h2>
            <p className="text-sm text-gray-500 font-medium px-2">
              Please enter the OTP sent to{" "}
              <span className="font-semibold text-gray-800">
                {email || "your email"}
              </span>{" "}
              to complete your verification.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex justify-between gap-1.5 sm:gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-8 h-10 sm:w-10 sm:h-11 text-center text-base font-semibold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                />
              ))}
            </div>

            <div className="text-center text-sm font-medium pt-1">
              <span className="text-gray-600">Remaining time </span>
              <span
                className={timeLeft > 0 ? "text-purple-700" : "text-red-500"}
              >
                {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
              </span>
            </div>

            <div className="space-y-3 pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 disabled:opacity-60"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl border-2 border-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-5 text-center text-xs text-gray-700">
            <span className="text-gray-600">Didn't get the code? </span>
            <button
              type="button"
              disabled={timeLeft > 0}
              className="text-purple-700 font-bold hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={handleResend}
            >
              Resend To Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
