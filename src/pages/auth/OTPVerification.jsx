import React, { useState, useRef, useEffect } from "react";

const OTPVerification = () => {
  // State for the 6-digit OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // State for the countdown timer (starts at 29s to match your mockup)
  const [timeLeft, setTimeLeft] = useState(29);
  // Refs to manage input focus programmatically
  const inputRefs = useRef([]);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format time display (e.g., 00:29s)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}s`;
  };

  // Handle OTP input changes
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take the last character in case of rapid typing/pasting
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input if a number was entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace for auto-focusing previous input
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

  const handleVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode);
    // Add your API verification logic here
  };

  return (
    <div className="flex min-h-screen bg-[#F7FBFC]">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 mx-auto">
        {/* Verification Card */}
        <div className="w-full max-w-lg rounded-[2rem] bg-white/90 border border-gray-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] px-6 py-8 sm:px-10 sm:py-10 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              OTP Verification
            </h2>
            <p className="text-base text-gray-500 font-medium px-2">
              Please enter the OTP sent to your email to complete your
              verification.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            {/* OTP Input Boxes */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white transition-all"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center text-sm font-medium pt-1">
              <span className="text-gray-600">Remaining time </span>
              <span className="text-purple-700">{formatTime(timeLeft)}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                Verify
              </button>
              <button
                type="button"
                className="w-full bg-white hover:bg-gray-50 text-gray-700 text-lg font-semibold py-3.5 px-4 rounded-xl border-2 border-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Resend Link */}
          <div className="mt-8 text-center text-base text-gray-700">
            <span className="text-gray-600">Didn't get the code? </span>
            <button
              type="button"
              className="text-purple-700 font-bold hover:underline"
              onClick={() => setTimeLeft(29)} // Optional: Reset timer on click
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
