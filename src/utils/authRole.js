const AUTH_STORAGE_KEY = "travelCambodiaAuth";

const normalizeRole = (value) => {
  if (!value) return "user";
  const role = String(value).trim().toLowerCase();

  if (
    role === "super-admin" ||
    role === "super_admin" ||
    role === "super admin"
  ) {
    return "superadmin";
  }
  if (role === "superadmin") return "superadmin";
  if (role === "admin" || role === "administrator") return "admin";

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

const resolveRoleFromPayload = ({
  email = "",
  role,
  roles,
  isStaff,
  isSuperuser,
} = {}) => {
  if (Boolean(isSuperuser)) return "superadmin";

  const normalizedRoles = Array.isArray(roles)
    ? roles.map((item) => normalizeRole(item))
    : [];

  if (normalizedRoles.includes("superadmin")) return "superadmin";
  if (normalizeRole(role) === "superadmin") return "superadmin";
  if (normalizedRoles.includes("admin")) return "admin";
  if (normalizeRole(role) === "admin") return "admin";
  if (Boolean(isStaff)) return "admin";

  return normalizeRole(role || resolveRoleFromEmail(email));
};

export const saveAuthUser = ({
  email = "",
  role,
  roles,
  isStaff,
  isSuperuser,
  token,
  refreshToken,
} = {}) => {
  if (typeof window === "undefined") return;

  const user = {
    email: String(email).trim(),
    role: resolveRoleFromPayload({
      email,
      role,
      roles,
      isStaff,
      isSuperuser,
    }),
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

  if (normalized === "superadmin") return "/super-admin/dashboard";
  if (normalized === "admin") return "/admin/dashboard";

  return null;
};
