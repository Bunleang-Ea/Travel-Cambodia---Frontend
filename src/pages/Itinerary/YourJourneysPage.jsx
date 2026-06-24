import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteJourney,
  getJourneys,
} from "../../services/modules/itineraryApi";
import ItinerarySidebar from "../../components/layout/ItinerarySidebar";

const renderBadge = (status) => {
  const styles = {
    UPCOMING: "bg-blue-50 text-blue-600",
    COMPLETED: "bg-white text-gray-800 shadow-sm",
    CURRENT: "bg-[#00D06A] text-white shadow-sm",
    DRAFT: "bg-white/90 backdrop-blur-sm text-gray-600",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-widest ${styles[status] || styles.DRAFT}`}>
      {status}
    </span>
  );
};

const renderJourneyIcon = (status) => {
  if (status === "UPCOMING")
    return (
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
      </svg>
    );
  if (status === "COMPLETED")
    return (
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (status === "CURRENT")
    return (
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  return (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
};

const YourJourneysPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("recent");
  const [journeys, setJourneys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [journeyToDelete, setJourneyToDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadJourneys = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await getJourneys({ sortBy });
        if (!isMounted) return;
        setJourneys(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load journeys.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadJourneys();
    return () => { isMounted = false; };
  }, [sortBy]);

  const handleDeleteJourney = async () => {
    if (!journeyToDelete) return;
    const journeyId = journeyToDelete.id;
    try {
      await deleteJourney(journeyId);
      setJourneys((prev) => prev.filter((j) => j.id !== journeyId));
      setJourneyToDelete(null);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to delete journey.");
      setJourneyToDelete(null);
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F7F8] font-sans overflow-hidden relative">
      <ItinerarySidebar activeView="plans" />

      <main className="flex-1 overflow-y-auto p-6 lg:p-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Header & Sorting */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Your Journeys</h1>
              <p className="text-sm text-gray-500 max-w-lg">
                Manage your upcoming travel plans, explore saved routes, and organize your next big adventure.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Sort By:</span>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                {["recent", "date"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                      sortBy === opt ? "bg-white text-[#00D06A] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium px-4 py-3">
              {errorMessage}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 font-medium">
                Loading journeys...
              </div>
            )}

            {!isLoading && !journeys.length && (
              <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 font-medium">
                No journeys yet. Create your first trip.
              </div>
            )}

            {journeys.map((journey) => (
              <div
                key={journey.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300"
              >
                {/* Image & Badge */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={journey.image}
                    alt={journey.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">{renderBadge(journey.status)}</div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{journey.title}</h2>
                    <div className="shrink-0 mt-1">{renderJourneyIcon(journey.status)}</div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 font-medium mb-6">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {journey.dateLabel || journey.date || "Not Scheduled"}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {journey.tripType || "Trip"}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* View details */}
                      <button
                        onClick={() => navigate(`/itinerary/${journey.id}`)}
                        className="p-2 text-gray-400 hover:text-[#00D06A] hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => setJourneyToDelete(journey)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Plan New Trip card */}
            <Link
              to="/itinerary/create"
              className="min-h-[300px] rounded-2xl border-2 border-dashed border-[#00D06A]/30 bg-emerald-50/30 hover:bg-emerald-50 hover:border-[#00D06A]/50 transition-colors flex flex-col items-center justify-center cursor-pointer group shadow-sm text-center p-6"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-[#00D06A] mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Plan New Trip</h3>
              <p className="text-xs text-gray-500 font-medium max-w-[200px] leading-relaxed">
                Start designing your next unforgettable journey from scratch.
              </p>
            </Link>
          </div>
        </div>
      </main>

      {/* FAB */}
      <Link
        to="/itinerary/create"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#00D06A] hover:bg-[#00B05A] text-white rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center transition-all hover:scale-105 hover:-translate-y-1 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
        </svg>
      </Link>

      {/* ── Delete Confirmation Modal ── */}
      {journeyToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Delete Journey?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently delete <strong>{journeyToDelete.title}</strong> and all its day plans.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setJourneyToDelete(null)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteJourney}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-bold text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourJourneysPage;
