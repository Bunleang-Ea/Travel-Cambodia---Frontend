const ITINERARY_STORAGE_KEY = "travelCambodiaItineraries";

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultJourneys = [
  {
    id: "j-1",
    title: "Trip to Siem Reap",
    destination: "Siem Reap",
    startDate: "2024-10-12",
    endDate: "2024-10-20",
    status: "UPCOMING",
    image:
      "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    tripType: "Solo Travel",
    notes: "Temple tour and city walking routes",
    createdAt: "2024-08-01T00:00:00.000Z",
  },
  {
    id: "j-2",
    title: "Koh Kong",
    destination: "Koh Kong",
    startDate: "2024-08-04",
    endDate: "2024-08-10",
    status: "COMPLETED",
    image:
      "/images/vicky-t-EY3tC81nFt0-unsplash.jpg",
    tripType: "Family",
    notes: "Beach and island trip",
    createdAt: "2024-07-21T00:00:00.000Z",
  },
  {
    id: "j-3",
    title: "Urban Exploration: Tokyo",
    destination: "Tokyo",
    startDate: "2024-12-22",
    endDate: "2025-01-05",
    status: "CURRENT",
    image:
      "/images/allphoto-bangkok-VoLyNETLCSU-unsplash.jpg",
    tripType: "Business",
    notes: "Business + leisure",
    createdAt: "2024-09-05T00:00:00.000Z",
  },
  {
    id: "j-4",
    title: "Winter in the Swiss Alps",
    destination: "Swiss Alps",
    startDate: "",
    endDate: "",
    status: "DRAFT",
    image:
      "/images/george-bakos-OvEr7BwXxxg-unsplash.jpg",
    tripType: "Honeymoon",
    notes: "Draft planning",
    createdAt: "2024-09-11T00:00:00.000Z",
  },
];

const safelyParse = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const readJourneys = () => {
  if (typeof window === "undefined") return [...defaultJourneys];

  const raw = window.localStorage.getItem(ITINERARY_STORAGE_KEY);
  const parsed = safelyParse(raw);

  if (parsed?.length) return parsed;

  window.localStorage.setItem(
    ITINERARY_STORAGE_KEY,
    JSON.stringify(defaultJourneys),
  );

  return [...defaultJourneys];
};

const saveJourneys = (journeys) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(journeys));
};

const formatDateLabel = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const enrichJourney = (journey) => {
  const start = formatDateLabel(journey.startDate);
  const end = formatDateLabel(journey.endDate);

  return {
    ...journey,
    dateLabel: start && end ? `${start} - ${end}` : "Not Scheduled",
  };
};

export const getJourneysMock = async (sortBy = "recent") => {
  await delay();

  const journeys = readJourneys().map(enrichJourney);

  const sorted = [...journeys].sort((a, b) => {
    if (sortBy === "date") {
      const aTime = new Date(a.startDate || 0).getTime();
      const bTime = new Date(b.startDate || 0).getTime();
      return bTime - aTime;
    }

    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });

  return structuredClone(sorted);
};

export const createJourneyMock = async (payload) => {
  await delay();

  const destination = String(payload?.destination || "").trim();
  if (!destination) {
    throw new Error("Destination is required.");
  }

  const journeys = readJourneys();
  const newJourney = {
    id: `j-${Date.now()}`,
    title: payload?.title || `Trip to ${destination}`,
    destination,
    startDate: payload?.startDate || "",
    endDate: payload?.endDate || "",
    status: payload?.status || "UPCOMING",
    image:
      payload?.image ||
      "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    tripType: payload?.tripType || "Solo Travel",
    notes: payload?.notes || "",
    createdAt: new Date().toISOString(),
  };

  const next = [newJourney, ...journeys];
  saveJourneys(next);

  return structuredClone(enrichJourney(newJourney));
};

export const deleteJourneyMock = async (journeyId) => {
  await delay(140);

  const journeys = readJourneys();
  const next = journeys.filter((journey) => journey.id !== journeyId);
  saveJourneys(next);

  return { success: true };
};

export const getJourneyByIdMock = async (journeyId) => {
  await delay();

  const journeys = readJourneys();
  const journey = journeys.find((j) => j.id === journeyId);

  if (!journey) throw new Error("Journey not found.");

  const enriched = enrichJourney(journey);

  // Build day slots between startDate and endDate if not already stored
  if (!enriched.days) {
    const days = [];
    if (enriched.startDate && enriched.endDate) {
      const start = new Date(enriched.startDate);
      const end = new Date(enriched.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push({
          date: new Date(d).toISOString().split("T")[0],
          places: [],
          notes: "",
        });
      }
    }
    enriched.days = days;
  }

  return structuredClone(enriched);
};

export const updateJourneyMock = async (journeyId, updates) => {
  await delay();

  const journeys = readJourneys();
  const idx = journeys.findIndex((j) => j.id === journeyId);
  if (idx === -1) throw new Error("Journey not found.");

  journeys[idx] = { ...journeys[idx], ...updates };
  saveJourneys(journeys);

  return structuredClone(enrichJourney(journeys[idx]));
};
