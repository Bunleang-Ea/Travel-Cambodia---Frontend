import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  deleteSuperAdminUser,
  getSuperAdminRoles,
  getSuperAdminStats,
  getSuperAdminUsers,
  updateSuperAdminUser,
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
  if (
    normalized === "superadmin" ||
    normalized === "super-admin" ||
    normalized === "super_admin" ||
    normalized === "super admin"
  ) {
    return "SUPER ADMIN";
  }
  if (normalized === "administrator" || normalized === "admin") {
    return "ADMIN";
  }
  if (!normalized) return "USER";
  return normalized.replace(/_/g, " ").toUpperCase();
};

const getRoleBadgeClass = (roleName) => {
  const normalized = normalizeRoleName(roleName);
  if (
    normalized === "superadmin" ||
    normalized === "super-admin" ||
    normalized === "super_admin" ||
    normalized === "super admin"
  ) {
    return "bg-emerald-100 text-emerald-700";
  }
  if (normalized === "admin" || normalized === "administrator") {
    return "bg-blue-100 text-blue-700";
  }
  return "bg-gray-100 text-gray-600";
};

const getUserInitials = (user) => {
  const text = String(user?.full_name || user?.email || "U").trim();
  if (!text) return "U";
  const parts = text.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
};

const formatDateJoined = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString();
};

const getPrimaryRole = (user) => {
  if (Array.isArray(user?.roles) && user.roles.length > 0) return user.roles[0];
  if (user?.is_superuser) return "super_admin";
  if (user?.is_staff) return "admin";
  return "user";
};

const ManageUsersPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({
    active_users: 0,
    new_signups_24h: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.created ? "User created successfully." : ""
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [assignForm, setAssignForm] = useState({
    userId: "",
    roleName: "",
  });

  const roleOptions = useMemo(() => {
    const roleNames = roles
      .map((item) => String(item?.name || "").trim())
      .filter(Boolean);

    if (roleNames.length > 0) return roleNames;
    return ["super_admin", "admin", "user"];
  }, [roles]);

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [statsData, usersData, rolesData] = await Promise.all([
        getSuperAdminStats(),
        getSuperAdminUsers(),
        getSuperAdminRoles(),
      ]);

      setStats({
        active_users: Number(statsData?.active_users || 0),
        new_signups_24h: Number(statsData?.new_signups_24h || 0),
      });
      setUsers(Array.isArray(usersData) ? usersData : []);
      setRoles(Array.isArray(rolesData) ? rolesData : []);

      const firstRole =
        Array.isArray(rolesData) && rolesData.length > 0 ? rolesData[0]?.name : "user";
      setAssignForm((prev) => ({
        ...prev,
        roleName: prev.roleName || String(firstRole || "user"),
      }));
    } catch (error) {
      setErrorMessage(error?.message || "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!isMounted) return;
      await loadData();
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const roleName = getPrimaryRole(user);
      const matchesSearch =
        !keyword ||
        String(user?.full_name || "")
          .toLowerCase()
          .includes(keyword) ||
        String(user?.email || "")
          .toLowerCase()
          .includes(keyword);

      const matchesRole =
        roleFilter === "All" || normalizeRoleName(roleName) === normalizeRoleName(roleFilter);

      return matchesSearch && matchesRole;
    });
  }, [roleFilter, searchTerm, users]);

  const handleToggleActive = async (user) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const updated = await updateSuperAdminUser(user.id, {
        is_active: !user?.is_active,
      });

      setUsers((prev) =>
        prev.map((item) => (item.id === user.id ? { ...item, ...updated } : item)),
      );
    } catch (error) {
      setErrorMessage(error?.message || "Failed to update user status.");
    }
  };

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(`Remove user ${user.email}?`);
    if (!confirmed) return;

    setErrorMessage("");
    setSuccessMessage("");
    try {
      await deleteSuperAdminUser(user.id);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
      setSuccessMessage("User removed successfully.");
    } catch (error) {
      setErrorMessage(error?.message || "Failed to remove user.");
    }
  };

  const handleQuickAssignRole = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!assignForm.userId) {
      setErrorMessage("Please select a user.");
      return;
    }
    if (!assignForm.roleName) {
      setErrorMessage("Please select a role.");
      return;
    }

    const selectedUser = users.find(
      (item) => String(item.id) === String(assignForm.userId),
    );
    if (!selectedUser) {
      setErrorMessage("Selected user was not found.");
      return;
    }

    try {
      const updated = await updateSuperAdminUser(selectedUser.id, {
        roles: [assignForm.roleName],
      });
      setUsers((prev) =>
        prev.map((item) => (item.id === selectedUser.id ? { ...item, ...updated } : item)),
      );
      setSuccessMessage("Role updated successfully.");
    } catch (error) {
      setErrorMessage(error?.message || "Failed to assign role.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Manage Users
          </h2>
          <p className="text-sm text-gray-500">
            Control administrative access and manage user accounts across the
            platform.
          </p>
        </div>
        <Link
          to="/super-admin/create-user"
          className="inline-flex items-center bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 shrink-0"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New User
        </Link>
      </div>

      {(errorMessage || successMessage) && (
        <div
          className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
            errorMessage
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {errorMessage || successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              Active Users
            </div>
            <div className="text-4xl font-black text-[#009B3E] tracking-tight mb-2">
              {stats.active_users}
            </div>
            <div className="text-xs font-bold text-gray-400">
              From all registered users
            </div>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#009B3E]">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
              New Signups
            </div>
            <div className="text-4xl font-black text-[#009B3E] tracking-tight mb-2">
              {stats.new_signups_24h}
            </div>
            <div className="text-xs font-bold text-gray-400">Last 24 hours</div>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name or email"
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-200 rounded-lg text-sm"
          />

          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <span>Role:</span>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
            >
              <option value="All">All</option>
              {roleOptions.map((roleName) => (
                <option key={roleName} value={roleName}>
                  {toRoleLabel(roleName)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-8 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-1/3">
                  User
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Joined
                </th>
                <th className="px-8 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-8 py-6 text-sm text-gray-500">
                    Loading users...
                  </td>
                </tr>
              )}

              {!isLoading && filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-6 text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredUsers.map((user) => {
                  const primaryRole = getPrimaryRole(user);
                  const active = Boolean(user?.is_active);

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 bg-emerald-100 text-emerald-700">
                            {getUserInitials(user)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 leading-none mb-1">
                              {user?.full_name || "No name"}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <select
                          value={primaryRole}
                          onChange={async (e) => {
                            const newRole = e.target.value;
                            setErrorMessage("");
                            setSuccessMessage("");
                            try {
                              const updated = await updateSuperAdminUser(user.id, {
                                roles: [newRole],
                              });
                              setUsers((prev) =>
                                prev.map((item) => (item.id === user.id ? { ...item, ...updated } : item))
                              );
                              setSuccessMessage(`Role for ${user.email} updated to ${toRoleLabel(newRole)}.`);
                            } catch (error) {
                              setErrorMessage(error?.message || "Failed to update role.");
                            }
                          }}
                          className={`px-2 py-1 text-xs font-bold rounded-md uppercase tracking-wider border border-gray-200 bg-white focus:bg-white focus:ring-1 focus:ring-green-500 focus:outline-none cursor-pointer`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-5">
                        <div
                          className={`flex items-center text-xs font-bold ${
                            active ? "text-[#009B3E]" : "text-gray-500"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              active ? "bg-[#009B3E]" : "bg-gray-400"
                            }`}
                          ></div>
                          {active ? "Active" : "Inactive"}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-500">
                          {formatDateJoined(user?.date_joined)}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleActive(user)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                          >
                            {active ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-400 font-medium">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Role Assignment</h3>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Super-admin portal access removed
            </span>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-200 mb-8">
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
              Quick Assign Role
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={assignForm.userId}
                onChange={(event) =>
                  setAssignForm((prev) => ({ ...prev, userId: event.target.value }))
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium"
              >
                <option value="">Select User...</option>
                {users.map((user) => (
                  <option key={user.id} value={String(user.id)}>
                    {user.full_name || user.email}
                  </option>
                ))}
              </select>

              <select
                value={assignForm.roleName}
                onChange={(event) =>
                  setAssignForm((prev) => ({ ...prev, roleName: event.target.value }))
                }
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium"
              >
                {roleOptions.map((roleName) => (
                  <option key={roleName} value={roleName}>
                    {toRoleLabel(roleName)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleQuickAssignRole}
              className="w-full py-3 bg-[#0F172A] hover:bg-black text-white text-sm font-bold rounded-lg transition-colors"
            >
              Update Role
            </button>
          </div>

          <div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Role Definitions
            </div>
            <div className="space-y-4">
              {roles.slice(0, 4).map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between border-b border-gray-50 pb-3"
                >
                  <div className="flex items-center text-sm font-bold text-gray-900">
                    <svg
                      className="w-4 h-4 text-[#009B3E] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    {toRoleLabel(role.name)}
                  </div>
                  <span className="text-xs text-gray-400 truncate max-w-[220px]">
                    {role.description || "No description"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-8 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Password & Security
          </h3>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-xl bg-[#e6f7ec] text-[#009B3E] flex items-center justify-center shrink-0 mr-4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                Force Password Reset
              </h4>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Use the forgot-password flow for password reset OTP. This panel
                keeps user account and role access in sync.
              </p>
              <button
                onClick={loadData}
                className="px-5 py-2 bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Refresh User Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
