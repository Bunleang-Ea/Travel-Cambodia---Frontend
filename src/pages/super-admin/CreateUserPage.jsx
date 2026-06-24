import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createSuperAdminUser,
  getSuperAdminRoles,
} from "../../services/modules/adminApi";

const ADMIN_LIKE_ROLES = new Set([
  "admin",
  "administrator",
  "superadmin",
  "super-admin",
  "super_admin",
  "super admin",
]);

const normalizeRoleName = (value) => String(value || "").trim().toLowerCase();

const toRoleLabel = (value) => {
  const normalized = normalizeRoleName(value);
  if (["superadmin", "super-admin", "super_admin", "super admin"].includes(normalized))
    return "Super Admin";
  if (["admin", "administrator"].includes(normalized)) return "Admin";
  if (!normalized) return "User";
  return normalized
    .split(/[_\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const CreateUserPage = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roleName: "",
  });

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getSuperAdminRoles();
        const list = Array.isArray(data) ? data : [];
        setRoles(list);
        if (list.length > 0) {
          setForm((prev) => ({
            ...prev,
            roleName: prev.roleName || String(list[0]?.name || "user"),
          }));
        }
      } catch {
        setRoles([]);
      } finally {
        setIsLoadingRoles(false);
      }
    };
    loadRoles();
  }, []);

  const roleOptions =
    roles.length > 0 ? roles.map((r) => String(r?.name || "")) : ["super_admin", "admin", "user"];

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const roleName = form.roleName;

    if (!fullName) return setErrorMessage("Full name is required.");
    if (!email) return setErrorMessage("Email address is required.");
    if (!password) return setErrorMessage("Password is required.");
    if (password.length < 8) return setErrorMessage("Password must be at least 8 characters.");

    setIsSaving(true);
    try {
      const normalizedRole = normalizeRoleName(roleName);
      await createSuperAdminUser({
        full_name: fullName,
        email,
        password,
        phone_number: "",
        is_active: true,
        is_staff: ADMIN_LIKE_ROLES.has(normalizedRole),
        roles: roleName ? [roleName] : [],
      });
      navigate("/super-admin/users", { state: { created: true } });
    } catch (error) {
      setErrorMessage(error?.message || "Failed to create user. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-8 pb-16">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/super-admin/users")}
          className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 mr-3"
          aria-label="Back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create New User</h2>
          <p className="text-xs text-gray-400 mt-0.5">Add a new account and assign a role.</p>
        </div>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8 space-y-6">

          {/* Full Name */}
          <div>
            <label htmlFor="cu-name" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="cu-name"
              type="text"
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="cu-email" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              id="cu-email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="e.g. john@example.com"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="cu-password" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                id="cu-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 pr-12 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="cu-role" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              Assign Role
            </label>
            {isLoadingRoles ? (
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <select
                id="cu-role"
                value={form.roleName}
                onChange={handleChange("roleName")}
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-900 appearance-none"
              >
                {roleOptions.map((r) => (
                  <option key={r} value={r}>{toRoleLabel(r)}</option>
                ))}
              </select>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate("/super-admin/users")}
              className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-5 py-2.5 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="cu-submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#009B3E] hover:bg-green-700 disabled:opacity-60 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-sm transition duration-200"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  Create User
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
