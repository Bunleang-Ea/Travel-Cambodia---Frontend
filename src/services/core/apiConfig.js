const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value == null) return false;

  const normalized = String(value).trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

// ── Base URL & Timeout ────────────────────────────────────────────────────────
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "") || "/api";

export const API_TIMEOUT_MS = toNumber(
  import.meta.env.VITE_API_TIMEOUT_MS,
  10000,
);

// ── Global mock toggle ────────────────────────────────────────────────────────
// Controls ALL modules unless overridden below.
// Set VITE_USE_MOCK_API=false in .env to switch all to real API at once.
const GLOBAL_USE_MOCK = toBoolean(
  import.meta.env.VITE_USE_MOCK_API ?? "true",
);

// ── Per-module overrides ──────────────────────────────────────────────────────
// When your backend has implemented a specific group of endpoints,
// flip that module's flag to "false" below — no other code needs to change.
//
// Example: your backend has /auth/* ready but not /itineraries yet:
//   export const USE_MOCK_AUTH       = false;  ← real
//   export const USE_MOCK_ITINERARY  = true;   ← still mocked
//
// When your backend is fully ready, just set VITE_USE_MOCK_API=false
// and remove all the per-module lines below.

export const USE_MOCK_API        = GLOBAL_USE_MOCK; // legacy alias kept for compatibility
export const USE_MOCK_AUTH       = GLOBAL_USE_MOCK; // src/services/modules/authApi.js
export const USE_MOCK_TRAVEL     = GLOBAL_USE_MOCK; // src/services/modules/travelApi.js
export const USE_MOCK_ITINERARY  = GLOBAL_USE_MOCK; // src/services/modules/itineraryApi.js
