import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getJourneyById,
  updateJourney,
  deleteJourney,
  createItineraryItem,
  deleteItineraryItem,
  updateItineraryItem,
} from "../../services/modules/itineraryApi";
import { getProvinces } from "../../services/modules/travelApi";
import ItinerarySidebar from "../../components/layout/ItinerarySidebar";

const STATUS_STYLES = {
  UPCOMING: "bg-blue-50 text-blue-600",
  COMPLETED: "bg-gray-100 text-gray-600",
  CURRENT: "bg-[#00D06A] text-white",
  DRAFT: "bg-orange-50 text-orange-500",
};

const JourneyDetailPage = () => {
  const { journeyId } = useParams();
  const navigate = useNavigate();

  const [journey, setJourney] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingDayIdx, setEditingDayIdx] = useState(null);
  const [dayNotesDraft, setDayNotesDraft] = useState("");
  const [newPlaceName, setNewPlaceName] = useState("");
  const [addingPlaceDayIdx, setAddingPlaceDayIdx] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Suggestions state
  const [provincePlaces, setProvincePlaces] = useState([]);
  const [showPlacesDropdown, setShowPlacesDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ---------- Load journey data ----------
  const loadJourney = async (showSpinner = true) => {
    if (showSpinner) setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await getJourneyById(journeyId);
      setJourney(data);
    } catch (err) {
      setErrorMessage(err?.message || "Failed to load journey.");
    } finally {
      if (showSpinner) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJourney(true);
  }, [journeyId]);

  // ---------- Load suggestions from province of the destination ----------
  useEffect(() => {
    if (!journey || !journey.destination) return;
    let isMounted = true;
    const loadPlaces = async () => {
      try {
        const provinces = await getProvinces();
        if (!isMounted) return;
        const destLower = journey.destination.trim().toLowerCase();

        // Find matching province
        let matchedProvince = provinces.find(
          (p) =>
            p.name?.toLowerCase() === destLower ||
            p.slug?.toLowerCase() === destLower
        );

        if (!matchedProvince) {
          // Find province that owns a place matching the destination
          matchedProvince = provinces.find((p) =>
            (p.places || []).some(
              (pl) =>
                pl.title?.toLowerCase() === destLower ||
                pl.name?.toLowerCase() === destLower
            )
          );
        }

        if (matchedProvince) {
          setProvincePlaces(matchedProvince.places || []);
        } else {
          // Fallback to all places
          const all = [];
          provinces.forEach((p) => {
            (p.places || []).forEach((pl) => {
              all.push(pl);
            });
          });
          setProvincePlaces(all);
        }
      } catch (err) {
        console.error("Failed to load suggestions:", err);
      }
    };
    loadPlaces();
    return () => { isMounted = false; };
  }, [journey]);

  // ---------- Close dropdown on click outside ----------
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPlacesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Filter matching places for autocomplete
  const filteredPlaces = newPlaceName.trim()
    ? provincePlaces.filter((p) =>
        (p.title || p.name || "").toLowerCase().includes(newPlaceName.toLowerCase())
      )
    : provincePlaces;

  // ---------- Day notes ----------
  const startEditNotes = (idx) => {
    setEditingDayIdx(idx);
    setDayNotesDraft(journey.days[idx].notes || "");
  };

  const saveNotes = async (idx) => {
    setErrorMessage("");
    const day = journey.days[idx];
    const firstPlace = day?.places?.[0]; // Get the first itinerary item of this day

    if (!firstPlace) {
      setErrorMessage("Please add at least one place to this day first to save notes.");
      setEditingDayIdx(null);
      return;
    }

    try {
      await updateItineraryItem(firstPlace.id, { notes: dayNotesDraft });
      setEditingDayIdx(null);
      await loadJourney(false); // Silent refresh
    } catch (err) {
      setErrorMessage(err?.message || "Failed to save notes.");
    }
  };

  // ---------- Places ----------
  const startAddPlace = (idx) => {
    setAddingPlaceDayIdx(idx);
    setNewPlaceName("");
    setShowPlacesDropdown(true);
  };

  const handleAddPlaceSelect = async (dayIdx, place) => {
    setAddingPlaceDayIdx(null);
    setNewPlaceName("");
    setShowPlacesDropdown(false);
    setErrorMessage("");
    try {
      await createItineraryItem({
        itinerary: Number(journeyId),
        place: place.id,
        day_number: dayIdx + 1,
      });
      await loadJourney(false); // Silent refresh
    } catch (err) {
      setErrorMessage(err?.message || "Failed to add place.");
    }
  };

  const removePlace = async (dayIdx, placeId) => {
    setErrorMessage("");
    try {
      await deleteItineraryItem(placeId); // placeId is the item_id from DB
      await loadJourney(false); // Silent refresh
    } catch (err) {
      setErrorMessage(err?.message || "Failed to remove place.");
    }
  };

  // ---------- Delete journey ----------
  const handleDelete = async () => {
    try {
      await deleteJourney(journeyId);
      navigate("/itinerary");
    } catch {
      setErrorMessage("Failed to delete journey.");
    }
  };

  // ---------- Format date ----------
  const formatDate = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-[#F4F7F8] font-sans overflow-hidden">
      <ItinerarySidebar activeView="plans" />

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Error */}
        {errorMessage && (
          <div className="mx-6 mt-6 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium px-4 py-3 relative">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="absolute right-4 top-3 text-red-400 hover:text-red-600 font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center h-full text-sm text-gray-400 font-medium">
            Loading journey...
          </div>
        )}

        {!isLoading && journey && (
          <>
            {/* ── Hero Banner ── */}
            <div className="relative h-56 w-full overflow-hidden shrink-0">
              <img
                src={journey.image}
                alt={journey.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <Link
                    to="/itinerary"
                    className="inline-flex items-center text-white/80 hover:text-white text-xs font-semibold mb-2 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Journeys
                  </Link>
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">{journey.title}</h1>
                  <p className="text-white/80 text-sm mt-1">{journey.dateLabel}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest ${STATUS_STYLES[journey.status] || STATUS_STYLES.DRAFT}`}>
                    {journey.status}
                  </span>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 transition-colors"
                    title="Delete Journey"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10 max-w-4xl">
              {/* ── Trip Info Pills ── */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "Destination", value: journey.destination },
                  { label: "Trip Type", value: journey.tripType },
                  { label: "Duration", value: journey.days?.length ? `${journey.days.length} day${journey.days.length !== 1 ? "s" : ""}` : "No dates set" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                    <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">{label}</span>
                    <span className="block text-sm font-bold text-gray-800 mt-0.5">{value || "—"}</span>
                  </div>
                ))}
                {journey.notes && (
                  <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm flex-1 min-w-[200px]">
                    <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Notes</span>
                    <span className="block text-sm font-medium text-gray-600 mt-0.5">{journey.notes}</span>
                  </div>
                )}
              </div>

              {/* ── Day-by-Day Timeline ── */}
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-4">
                Day-by-Day Plan
              </h2>

              {journey.days?.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-sm text-gray-400 font-medium shadow-sm">
                  No dates set for this journey. <Link to={`/itinerary/create`} className="text-[#00D06A] font-semibold hover:underline">Edit dates</Link> to build a day plan.
                </div>
              )}

              <div className="space-y-4">
                {journey.days?.map((day, idx) => (
                  <div key={day.id || day.date || idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
                    {/* Day Header */}
                    <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#00D06A] rounded-xl flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-bold text-gray-800">
                          {formatDate(day.date) || day.label || `Day ${idx + 1}`}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (day.places.length === 0) {
                            setErrorMessage("Please add at least one place to this day first to save notes.");
                            return;
                          }
                          startEditNotes(idx);
                        }}
                        className={`text-xs font-semibold transition-colors ${
                          day.places.length === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                        title={day.places.length === 0 ? "Add a place first to write notes" : ""}
                      >
                        {day.notes ? "Edit notes" : "+ Add notes"}
                      </button>
                    </div>

                    <div className="px-5 py-4 space-y-3">
                      {/* Places list */}
                      {day.places.length === 0 && addingPlaceDayIdx !== idx && (
                        <p className="text-xs text-gray-400 font-medium italic">No places planned yet.</p>
                      )}
                      {day.places.map((place) => (
                        <div key={place.id} className="flex items-center justify-between group">
                          <div className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                            <div className="w-2 h-2 rounded-full bg-[#00D06A] shrink-0" />
                            {place.name}
                          </div>
                          <button
                            onClick={() => removePlace(idx, place.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove place"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}

                      {/* Add place inline with Autocomplete suggestions */}
                      {addingPlaceDayIdx === idx ? (
                        <div ref={dropdownRef} className="relative flex-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <input
                              autoFocus
                              type="text"
                              value={newPlaceName}
                              onChange={(e) => {
                                setNewPlaceName(e.target.value);
                                setShowPlacesDropdown(true);
                              }}
                              onFocus={() => setShowPlacesDropdown(true)}
                              placeholder="Type place name..."
                              className="flex-1 px-3 py-1.5 text-sm border-2 border-[#00D06A] rounded-lg focus:outline-none bg-white font-medium"
                            />
                            <button
                              onClick={() => {
                                setAddingPlaceDayIdx(null);
                                setShowPlacesDropdown(false);
                              }}
                              className="text-xs font-bold text-gray-400 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                          </div>

                          {showPlacesDropdown && filteredPlaces.length > 0 && (
                            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-50 max-h-56 overflow-y-auto">
                              {filteredPlaces.map((pl) => (
                                <button
                                  key={pl.id}
                                  type="button"
                                  onClick={() => handleAddPlaceSelect(idx, pl)}
                                  className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50 text-sm font-semibold text-gray-800 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-b-0"
                                >
                                  {pl.image && (
                                    <div className="w-7 h-7 rounded overflow-hidden shrink-0 bg-gray-100">
                                      <img src={pl.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-bold text-gray-900">{pl.title || pl.name}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">{pl.category}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                          {showPlacesDropdown && newPlaceName.trim() && filteredPlaces.length === 0 && (
                            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 text-center">
                              <p className="text-xs text-gray-400 font-semibold">No matches found in this province.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => startAddPlace(idx)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#00D06A] hover:text-green-700 transition-colors mt-1"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                          </svg>
                          Add Place
                        </button>
                      )}

                      {/* Notes */}
                      {editingDayIdx === idx ? (
                        <div className="mt-2 space-y-2">
                          <textarea
                            autoFocus
                            rows={2}
                            value={dayNotesDraft}
                            onChange={(e) => setDayNotesDraft(e.target.value)}
                            placeholder="Notes for this day..."
                            className="w-full px-3 py-2 text-sm border-2 border-[#00D06A] rounded-lg focus:outline-none resize-none bg-white font-medium"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => saveNotes(idx)} className="text-xs font-bold text-[#00D06A] hover:text-green-700">Save</button>
                            <button onClick={() => setEditingDayIdx(null)} className="text-xs font-bold text-gray-400 hover:text-gray-600">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        day.notes && (
                          <p className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-3 mt-1">{day.notes}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Delete Journey?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently delete <strong>{journey?.title}</strong> and all its day plans.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default JourneyDetailPage;
