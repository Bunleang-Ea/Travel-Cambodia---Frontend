import { API_BASE_URL } from "../core/apiConfig";
import { httpRequest } from "../core/httpClient";

const DEFAULT_JOURNEY_IMAGE =
  "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg";

const toAbsoluteMediaUrl = (value) => {
  const source = String(value || "").trim();
  if (!source) return "";
  if (/^https?:\/\//i.test(source)) return source;
  if (source.startsWith("data:")) return source;
  try {
    const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;
    return new URL(source, apiOrigin).toString();
  } catch {
    return source;
  }
};

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
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

const normalizeDate = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const resolveStatus = (startDate, endDate) => {
  if (!startDate || !endDate) return "DRAFT";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "DRAFT";
  if (end < today) return "COMPLETED";
  if (start <= today && today <= end) return "CURRENT";
  return "UPCOMING";
};

const buildDaysFromItems = ({ startDate, endDate, items }) => {
  const normalizedItems = Array.isArray(items) ? items : [];
  const maxDayFromItems = normalizedItems.reduce((max, item) => {
    const dayNumber = Number(item?.day_number || 0);
    return dayNumber > max ? dayNumber : max;
  }, 0);

  let rangeDays = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (
      !Number.isNaN(start.getTime()) &&
      !Number.isNaN(end.getTime()) &&
      end >= start
    ) {
      rangeDays = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
    }
  }

  const totalDays = Math.max(rangeDays, maxDayFromItems);
  if (totalDays <= 0) return [];

  const days = [];
  for (let index = 0; index < totalDays; index += 1) {
    const dayNumber = index + 1;
    let dayDate = "";
    if (startDate) {
      const base = new Date(startDate);
      if (!Number.isNaN(base.getTime())) {
        base.setDate(base.getDate() + index);
        dayDate = base.toISOString().slice(0, 10);
      }
    }
    const dayItems = normalizedItems.filter(
      (item) => Number(item?.day_number || 0) === dayNumber,
    );
    days.push({
      id: `day-${dayNumber}`,
      dayNumber,
      date: dayDate,
      label: dayDate ? formatDateLabel(dayDate) : `Day ${dayNumber}`,
      places: dayItems.map((item) => ({
        id: item?.item_id,
        name: String(item?.place_name || "Place").trim(),
      })),
      notes: dayItems.find((item) => String(item?.notes || "").trim())?.notes || "",
    });
  }
  return days;
};

const mapBackendJourney = (raw) => {
  const id = raw?.itinerary_id ?? raw?.id;
  const title = String(raw?.title || "Untitled Itinerary").trim();
  const startDate = normalizeDate(raw?.start_date || raw?.startDate);
  const endDate = normalizeDate(raw?.end_date || raw?.endDate);
  const dateLabelStart = formatDateLabel(startDate);
  const dateLabelEnd = formatDateLabel(endDate);
  const dateLabel =
    dateLabelStart && dateLabelEnd
      ? `${dateLabelStart} - ${dateLabelEnd}`
      : "Not Scheduled";
  const items = Array.isArray(raw?.items) ? raw.items : [];
  return {
    id,
    itinerary_id: id,
    title,
    destination: title,
    startDate,
    endDate,
    start_date: startDate,
    end_date: endDate,
    dateLabel,
    status: resolveStatus(startDate, endDate),
    image:
      toAbsoluteMediaUrl(raw?.image || raw?.image_url || "") ||
      DEFAULT_JOURNEY_IMAGE,
    tripType: String(raw?.tripType || "Trip").trim() || "Trip",
    notes: String(raw?.description || raw?.notes || "").trim(),
    createdAt: raw?.created_at || raw?.createdAt || "",
    updatedAt: raw?.updated_at || raw?.updatedAt || "",
    days: buildDaysFromItems({ startDate, endDate, items }),
    items,
  };
};

const sortJourneys = (journeys, sortBy) => {
  const sorted = [...journeys];
  if (sortBy === "date") {
    sorted.sort((a, b) => {
      const aTime = new Date(a.startDate || 0).getTime();
      const bTime = new Date(b.startDate || 0).getTime();
      return bTime - aTime;
    });
    return sorted;
  }
  sorted.sort((a, b) => {
    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });
  return sorted;
};

export const getJourneys = async ({ sortBy = "recent" } = {}) => {
  const data = await httpRequest("/itineraries/", { query: { sortBy } });
  const list = toList(data).map(mapBackendJourney);
  return sortJourneys(list, sortBy);
};

export const createJourney = async (payload) => {
  const data = await httpRequest("/itineraries/", {
    method: "POST",
    body: {
      destination: String(payload?.destination || payload?.title || "").trim(),
      image: String(payload?.image || "").trim(),
      tripType: String(payload?.tripType || "Trip").trim(),
      startDate: payload?.startDate || "",
      endDate: payload?.endDate || "",
      notes: String(payload?.notes || "").trim(),
    },
  });
  return mapBackendJourney(data);
};

export const deleteJourney = async (journeyId) =>
  httpRequest(`/itineraries/${journeyId}/`, { method: "DELETE" });

export const getJourneyById = async (journeyId) => {
  const data = await httpRequest(`/itineraries/${journeyId}/`);
  return mapBackendJourney(data);
};

export const updateJourney = async (journeyId, updates) => {
  const payload = {};
  if (updates?.title !== undefined) payload.title = updates.title;
  if (updates?.destination !== undefined) payload.destination = updates.destination;
  if (updates?.notes !== undefined) payload.notes = updates.notes;
  if (updates?.description !== undefined) payload.description = updates.description;
  if (updates?.image !== undefined) payload.image = updates.image;
  if (updates?.startDate !== undefined) payload.startDate = updates.startDate;
  if (updates?.endDate !== undefined) payload.endDate = updates.endDate;
  if (updates?.start_date !== undefined) payload.start_date = updates.start_date;
  if (updates?.end_date !== undefined) payload.end_date = updates.end_date;

  if (Object.keys(payload).length === 0) return getJourneyById(journeyId);

  const data = await httpRequest(`/itineraries/${journeyId}/`, {
    method: "PUT",
    body: payload,
  });
  return mapBackendJourney(data);
};

export const createItineraryItem = async (payload) => {
  return httpRequest("/itinerary-items/", {
    method: "POST",
    body: payload,
  });
};

export const deleteItineraryItem = async (itemId) => {
  return httpRequest(`/itinerary-items/${itemId}/`, {
    method: "DELETE",
  });
};

export const updateItineraryItem = async (itemId, payload) => {
  return httpRequest(`/itinerary-items/${itemId}/`, {
    method: "PATCH",
    body: payload,
  });
};

