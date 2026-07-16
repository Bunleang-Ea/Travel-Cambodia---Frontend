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

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "") || "/api";

export const API_TIMEOUT_MS = toNumber(
  import.meta.env.VITE_API_TIMEOUT_MS,
  10000,
);

export const GOOGLE_CLIENT_ID = String(
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
).trim();
