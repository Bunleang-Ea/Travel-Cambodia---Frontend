const AUTH_STORAGE_KEY = "travelCambodiaAuth";

const normalizeRole = (value) => {
  if (!value) return "user";
  const role = String(value).trim().toLowerCase();

  if (role === "super-admin" || role === "super_admin") return "superadmin";
  if (role === "superadmin") return "superadmin";
  if (role === "admin") return "admin";

  return "user";
};

export const resolveRoleFromEmail = (email = "") => {
  const normalizedEmail = String(email).trim().toLowerCase();

  if (!normalizedEmail) return "user";
  if (normalizedEmail.includes("superadmin")) return "superadmin";
  if (normalizedEmail.includes("admin")) return "admin";

  return "user";
};

const TOKEN_STORAGE_KEY = "travelCambodiaToken";
const REFRESH_TOKEN_STORAGE_KEY = "travelCambodiaRefreshToken";

export const saveAuthUser = ({
  email = "",
  role,
  token,
  refreshToken,
} = {}) => {
  if (typeof window === "undefined") return;

  const user = {
    email: String(email).trim(),
    role: normalizeRole(role || resolveRoleFromEmail(email)),
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, String(token));
  }
  if (refreshToken) {
    window.localStorage.setItem(
      REFRESH_TOKEN_STORAGE_KEY,
      String(refreshToken),
    );
  }
  window.dispatchEvent(new Event("auth-changed"));
};

export const clearAuthUser = () => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-changed"));
};

export const getAuthUser = () => {
  if (typeof window === "undefined") {
    return { email: "", role: "user" };
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { email: "", role: "user" };

    const parsed = JSON.parse(raw);
    return {
      email: String(parsed?.email || ""),
      role: normalizeRole(parsed?.role),
    };
  } catch {
    return { email: "", role: "user" };
  }
};

export const getRoleDestination = (role) => {
  const normalized = normalizeRole(role);

  if (normalized === "superadmin") return "/super-admin/users";
  if (normalized === "admin") return "/admin/places";

  return null;
};
