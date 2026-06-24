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
  const extractMessage = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;

    if (Array.isArray(value)) {
      for (const item of value) {
        const message = extractMessage(item);
        if (message) return message;
      }
      return null;
    }

    if (typeof value === "object") {
      if (typeof value.message === "string") return value.message;
      if (typeof value.error === "string") return value.error;
      if (typeof value.detail === "string") return value.detail;

      for (const nested of Object.values(value)) {
        const message = extractMessage(nested);
        if (message) return message;
      }
    }

    return null;
  };

  if (!data) return null;
  return extractMessage(data);
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

    const isFormData =
      typeof FormData !== "undefined" && body instanceof FormData;
    const hasContentTypeHeader = Object.keys(headers).some(
      (headerName) => headerName.toLowerCase() === "content-type",
    );
    const resolvedHeaders = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    };

    if (body !== undefined && !isFormData && !hasContentTypeHeader) {
      resolvedHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(buildUrl(path, query), {
      method,
      signal: timeoutSignal,
      headers: resolvedHeaders,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),
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
