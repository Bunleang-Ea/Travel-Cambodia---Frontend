import React, { useState } from "react";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7817.525286118235!2d104.8888541!3d11.568866!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e822e434660!2sRoyal%20University%20of%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1777275320363!5m2!1sen!2skh";

const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Royal+University+of+Phnom+Penh,+Cambodia";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API logic here
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-20 text-gray-800">
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/images/vicky-t-EY3tC81nFt0-unsplash.jpg"
            alt="Cambodian landscape"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pt-8">
          <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
            Have questions about planning your dream trip to Cambodia? Our local
            experts are here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16">
        {/* 2. Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {/* Office Location */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-[#e6f7ec] text-[#009B3E] rounded-xl border border-green-100 flex items-center justify-center mb-5 shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Our Office</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              123 Preah Norodom Blvd,
              <br />
              Phnom Penh, Cambodia
            </p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-[#e6f7ec] text-[#009B3E] rounded-xl border border-green-100 flex items-center justify-center mb-5 shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Email Us</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              hello@travelcambodia.com
              <br />
              support@travelcambodia.com
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-[#e6f7ec] text-[#009B3E] rounded-xl border border-green-100 flex items-center justify-center mb-5 shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Call Us</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              +855 (0) 12 345 678
              <br />
              +855 (0) 98 765 432
            </p>
          </div>
        </div>

        {/* 3. Form & Sidebar Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Send us a message
              </h2>
              <p className="text-sm text-gray-500">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold rounded-xl shadow-md transition duration-300 flex items-center justify-center"
              >
                Send Message
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Business Hours Card */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden">
              <div className="bg-[#f0fdf4] px-6 py-4 border-b border-green-100 flex items-center">
                <svg
                  className="w-5 h-5 text-[#009B3E] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Business Hours
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    Monday - Friday
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    8:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    Saturday
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    9:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">
                    Sunday
                  </span>
                  <span className="text-sm font-bold text-[#009B3E]">
                    Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Map Embed Card */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden">
              {/* Real Google Maps iframe */}
              <div className="relative h-56 w-full overflow-hidden">
                <iframe
                  title="Office Location"
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              {/* Get Directions button below the map */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">
                  Royal University of Phnom Penh, Cambodia
                </span>
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#009B3E] hover:underline"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>


            {/* Social Links */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 flex flex-col items-center">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#009B3E] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.03 3.66 9.2 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.58v1.9h2.8l-.45 2.9h-2.35V22c4.78-.73 8.44-4.9 8.44-9.93z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#009B3E] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.24h-3.01v13.31a2.67 2.67 0 11-2.67-2.67c.23 0 .45.03.67.09V10.1a5.7 5.7 0 00-.67-.04 5.68 5.68 0 105.68 5.68V9.05a7.84 7.84 0 004.58 1.47V7.5a4.76 4.76 0 01-.81-.81z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-[#009B3E] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M7.75 2h8.5A5.76 5.76 0 0122 7.75v8.5A5.76 5.76 0 0116.25 22h-8.5A5.76 5.76 0 012 16.25v-8.5A5.76 5.76 0 017.75 2zm-.2 2A3.55 3.55 0 004 7.55v8.9A3.55 3.55 0 007.55 20h8.9A3.55 3.55 0 0020 16.45v-8.9A3.55 3.55 0 0016.45 4h-8.9zm9.9 1.5a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
