import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createJourney } from "../../services/modules/itineraryApi";
import ItinerarySidebar from "../../components/layout/ItinerarySidebar";

const CreateTripPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for interactive elements
  const [activeTripType, setActiveTripType] = useState("Solo Travel");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tripTypes = ["Solo Travel", "Family", "Business", "Honeymoon"];

  useEffect(() => {
    if (!location.state) return;

    if (location.state.destination) {
      setDestination(String(location.state.destination));
    }

    if (location.state.notes) {
      setNotes(String(location.state.notes));
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!destination.trim()) {
      setErrorMessage("Destination is required.");
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      setErrorMessage("End date cannot be before start date.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await createJourney({
        destination: destination.trim(),
        tripType: activeTripType,
        startDate,
        endDate,
        notes: notes.trim(),
      });

      navigate("/itinerary");
    } catch (error) {
      setErrorMessage(error?.message || "Failed to create itinerary.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <ItinerarySidebar activeView="create" />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/itinerary"
              className="text-xs font-bold text-gray-500 hover:text-gray-900 border-b border-gray-300 pb-0.5 mb-4 inline-block"
            >
              Home
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Create New Trip
            </h2>
            <p className="text-sm text-gray-500">
              Fill in the details below to start crafting your next adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Form Container */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {errorMessage ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium px-4 py-3">
                    {errorMessage}
                  </div>
                ) : null}

                {/* Destination Input */}
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Destination Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-[#00D06A]"
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
                    <input
                      type="text"
                      placeholder="e.g. Kyoto, Japan"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D06A] focus:bg-white transition-all text-sm font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-[#00D06A]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D06A] focus:bg-white transition-all text-sm font-medium text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-[#00D06A]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D06A] focus:bg-white transition-all text-sm font-medium text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Trip Type */}
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                    Trip Type
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {tripTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveTripType(type)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                          activeTripType === type
                            ? "bg-[#00D06A] text-white shadow-md shadow-emerald-200"
                            : "bg-[#F8FAFC] text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Notes */}
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Quick Notes (Optional)
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Briefly describe your goals for this trip..."
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D06A] focus:bg-white transition-all text-sm font-medium text-gray-900 resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                  <Link
                    to="/itinerary"
                    className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2.5"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#00D06A] hover:bg-[#00B05A] text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-md shadow-emerald-100 transition duration-200"
                  >
                    {isSubmitting ? "Creating..." : "Create Itinerary"}
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: Map Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-full flex flex-col">
                {/* Map Placeholder */}
                <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden relative mb-5">
                  <img
                    src="/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg"
                    alt="Map Background"
                    className="w-full h-full object-cover opacity-25 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center text-sm font-bold text-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-[#00D06A]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Map Preview Disabled
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Map Preview
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    A visual overview of your planned destination and points of
                    interest will appear here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTripPage;
