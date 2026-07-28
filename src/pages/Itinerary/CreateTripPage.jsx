import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createJourney } from "../../services/modules/itineraryApi";
import { getProvinces } from "../../services/modules/travelApi";
import ItinerarySidebar from "../../components/layout/ItinerarySidebar";

const FALLBACK_IMAGE =
  "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg";

const CreateTripPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDestination = String(location.state?.destination || "");
  const initialNotes = String(location.state?.notes || "");

  const [activeTripType, setActiveTripType] = useState("Solo Travel");
  const [destination, setDestination] = useState(initialDestination);
  const [selectedImage, setSelectedImage] = useState(
    String(location.state?.image || "").trim(),
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);   // flat list: {label, image, type}
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const tripTypes = ["Solo Travel", "Family", "Business", "Honeymoon"];

  // ---------- Load suggestions data on mount ----------
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const provinces = await getProvinces();
        if (!mounted) return;

        // Build flat suggestions: province names + individual place names
        const items = [];
        const seen = new Set();

        provinces.forEach((province) => {
          const provinceName = String(province?.name || "").trim();
          if (provinceName && !seen.has(provinceName.toLowerCase())) {
            seen.add(provinceName.toLowerCase());
            items.push({
              label: provinceName,
              image: province?.heroImage || FALLBACK_IMAGE,
              type: "Province",
            });
          }

          // Add individual places under this province
          (province?.places || []).forEach((place) => {
            const placeName = String(place?.title || place?.name || "").trim();
            if (placeName && !seen.has(placeName.toLowerCase())) {
              seen.add(placeName.toLowerCase());
              items.push({
                label: placeName,
                image: place?.image || province?.heroImage || FALLBACK_IMAGE,
                type: "Place",
              });
            }
          });
        });

        setSuggestions(items);
      } catch {
        setSuggestions([]);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // ---------- Close dropdown on outside click ----------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- Filtered suggestions ----------
  const query = destination.trim().toLowerCase();
  const filtered =
    query.length === 0
      ? []
      : suggestions
          .filter((item) => item.label.toLowerCase().includes(query))
          .slice(0, 8);

  // ---------- Handlers ----------
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setSelectedImage(""); // reset selected image when typing freely
    setShowSuggestions(true);
    setHighlightedIndex(-1);
    if (errorMessage) setErrorMessage("");
  };

  const handleSelect = (item) => {
    setDestination(item.label);
    setSelectedImage(item.image);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

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
      const resolvedImage = selectedImage || FALLBACK_IMAGE;
      await createJourney({
        destination: destination.trim(),
        image: resolvedImage,
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

      <main className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Create New Trip
            </h2>
            <p className="text-sm text-gray-500">
              Fill in the details below to start crafting your next adventure.
            </p>
          </div>

          <div>
            {/* Form Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {errorMessage ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium px-4 py-3">
                    {errorMessage}
                  </div>
                ) : null}

                {/* Destination Input with Autocomplete */}
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Destination Name
                  </label>
                  <div className="relative">
                    {/* Pin icon */}
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
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

                    {/* Input */}
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type a place or province…"
                      value={destination}
                      onChange={handleDestinationChange}
                      onFocus={() => {
                        if (destination.trim()) setShowSuggestions(true);
                      }}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00D06A] focus:bg-white transition-all text-sm font-medium text-gray-900"
                    />

                    {/* Clear button */}
                    {destination && (
                      <button
                        type="button"
                        onClick={() => {
                          setDestination("");
                          setSelectedImage("");
                          setShowSuggestions(false);
                          inputRef.current?.focus();
                        }}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}

                    {/* Dropdown */}
                    {showSuggestions && filtered.length > 0 && (
                      <div
                        ref={dropdownRef}
                        className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.10)] z-50 overflow-hidden"
                      >
                        <div className="px-3 pt-3 pb-1">
                          <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                            Suggestions
                          </p>
                        </div>
                        <ul className="max-h-72 overflow-y-auto pb-2">
                          {filtered.map((item, idx) => (
                            <li key={`${item.label}-${idx}`}>
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 mx-0 transition-colors text-left ${
                                  highlightedIndex === idx
                                    ? "bg-emerald-50"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                {/* Thumbnail */}
                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                  <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = FALLBACK_IMAGE;
                                    }}
                                  />
                                </div>

                                {/* Label + badge */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                                    {item.type}
                                  </p>
                                </div>

                                {/* Arrow */}
                                <svg
                                  className={`w-4 h-4 shrink-0 transition-colors ${
                                    highlightedIndex === idx
                                      ? "text-[#00D06A]"
                                      : "text-gray-300"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* No results hint */}
                    {showSuggestions && destination.trim().length > 0 && filtered.length === 0 && suggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 px-4 py-4 text-center">
                        <p className="text-sm text-gray-400 font-medium">No places match "{destination}"</p>
                        <p className="text-xs text-gray-300 mt-0.5">You can still type any destination.</p>
                      </div>
                    )}
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
                        min={new Date().toISOString().split("T")[0]}
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
                        min={startDate || new Date().toISOString().split("T")[0]}
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
                    className="bg-[#00D06A] hover:bg-[#00B05A] text-white text-sm font-bold py-3.5 px-8 rounded-xl shadow-md shadow-emerald-100 transition duration-200 disabled:opacity-60"
                  >
                    {isSubmitting ? "Creating..." : "Create Itinerary"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTripPage;
