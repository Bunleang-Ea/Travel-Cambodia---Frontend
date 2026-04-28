import { API_BASE_URL, API_TIMEOUT_MS } from "./apiConfig";

const withTimeout = (signal, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeout),
  };
};

const buildUrl = (path, query) => {
  const normalizedPath = String(path || "").startsWith("/")
    ? String(path)
    : `/${String(path || "")}`;

  const url = new URL(
    `${API_BASE_URL}${normalizedPath}`,
    window.location.origin,
  );

  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
};

const pickValidationMessage = (data) => {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  if (typeof data.detail === "string") return data.detail;

  if (Array.isArray(data)) {
    const first = data[0];
    return typeof first === "string" ? first : null;
  }

  if (typeof data === "object") {
    for (const value of Object.values(data)) {
      if (typeof value === "string") return value;
      if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    }
  }

  return null;
};

export const httpRequest = async (
  path,
  { method = "GET", query, body, headers = {}, signal } = {},
) => {
  const { signal: timeoutSignal, cleanup } = withTimeout(
    signal,
    API_TIMEOUT_MS,
  );

  try {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("travelCambodiaToken")
        : null;

    const response = await fetch(buildUrl(path, query), {
      method,
      signal: timeoutSignal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      const error = new Error(
        pickValidationMessage(data) || `Request failed: ${response.status}`,
      );
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } finally {
    cleanup();
  }
};
