import React, { useState, useRef, useEffect } from 'react';

const OTPVerification = () => {
  // State for the 6-digit OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}s`;
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
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
    // Add your API verification logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FBFC] p-4">
      {/* Verification Card */}
      <div className="bg-white rounded-lg border border-green-300 shadow-sm w-full max-w-[420px] p-8 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-black mb-3">OTP Verification</h2>
          <p className="text-sm text-gray-600 px-4">
            Please enter the OTP sent to your email to complete your verification.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
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
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold border-[1.5px] border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent transition-colors"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center text-xs font-medium">
            <span className="text-gray-600">Remaining time </span>
            <span className="text-purple-700">{formatTime(timeLeft)}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full bg-[#009B3E] hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition duration-200"
            >
              Verify
            </button>
            <button
              type="button"
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-2.5 px-4 rounded-md border-[1.5px] border-green-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Resend Link */}
        <div className="mt-8 text-center text-xs font-medium">
          <span className="text-gray-600">Didn't get the code? </span>
          <button 
            type="button"
            className="text-purple-700 hover:text-purple-900 transition-colors"
            onClick={() => setTimeLeft(29)} // Optional: Reset timer on click
          >
            Resend To Email
          </button>
        </div>

      </div>
    </div>
  );
};

export default OTPVerification;