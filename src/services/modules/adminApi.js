import { httpRequest } from "../core/httpClient";

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

export const getAdminPlaces = async () => {
  const data = await httpRequest("/admin/places/");
  return toList(data);
};

export const createAdminPlace = async (payload) =>
  httpRequest("/admin/places/", {
    method: "POST",
    body: payload,
  });

export const updateAdminPlace = async (placeId, payload) =>
  httpRequest(`/admin/places/${placeId}/`, {
    method: "PATCH",
    body: payload,
  });

export const deleteAdminPlace = async (placeId) =>
  httpRequest(`/admin/places/${placeId}/`, {
    method: "DELETE",
  });

export const getAdminCategories = async () => {
  const data = await httpRequest("/admin/categories/");
  return toList(data);
};

export const createAdminCategory = async (payload) =>
  httpRequest("/admin/categories/", {
    method: "POST",
    body: payload,
  });

export const updateAdminCategory = async (categoryId, payload) =>
  httpRequest(`/admin/categories/${categoryId}/`, {
    method: "PATCH",
    body: payload,
  });

export const deleteAdminCategory = async (categoryId) =>
  httpRequest(`/admin/categories/${categoryId}/`, {
    method: "DELETE",
  });

export const getAdminReviews = async () => {
  const data = await httpRequest("/reviews/");
  return toList(data);
};

export const deleteAdminReview = async (reviewId) =>
  httpRequest(`/reviews/${reviewId}/`, {
    method: "DELETE",
  });

export const getSuperAdminStats = async () => httpRequest("/admin/super/stats/");

export const getSuperAdminUsers = async () => {
  const data = await httpRequest("/admin/super/users/");
  return toList(data);
};

export const createSuperAdminUser = async (payload) =>
  httpRequest("/admin/super/users/", {
    method: "POST",
    body: payload,
  });

export const updateSuperAdminUser = async (userId, payload) =>
  httpRequest(`/admin/super/users/${userId}/`, {
    method: "PATCH",
    body: payload,
  });

export const deleteSuperAdminUser = async (userId) =>
  httpRequest(`/admin/super/users/${userId}/`, {
    method: "DELETE",
  });

export const getSuperAdminRoles = async () => {
  const data = await httpRequest("/admin/super/roles/");
  return toList(data);
};

export const createSuperAdminRole = async (payload) =>
  httpRequest("/admin/super/roles/", {
    method: "POST",
    body: payload,
  });

export const updateSuperAdminRole = async (roleId, payload) =>
  httpRequest(`/admin/super/roles/${roleId}/`, {
    method: "PATCH",
    body: payload,
  });

export const deleteSuperAdminRole = async (roleId) =>
  httpRequest(`/admin/super/roles/${roleId}/`, {
    method: "DELETE",
  });

export const getSuperAdminRolePermissions = async (roleId) =>
  httpRequest(`/admin/super/roles/${roleId}/permissions/`);

export const updateSuperAdminRolePermissions = async (roleId, permissionIds) =>
  httpRequest(`/admin/super/roles/${roleId}/permissions/`, {
    method: "PUT",
    body: { permission_ids: permissionIds },
  });

export const getSuperAdminPermissionsMatrix = async () => {
  const data = await httpRequest("/admin/super/permissions/matrix/");
  return toList(data);
};

export const updateSuperAdminPermissionsMatrix = async (permissions) =>
  httpRequest("/admin/super/permissions/matrix/", {
    method: "PUT",
    body: permissions,
  });

export const getSuperAdminNotificationSettings = async () =>
  httpRequest("/admin/super/settings/notifications/");

export const updateSuperAdminNotificationSettings = async (payload) =>
  httpRequest("/admin/super/settings/notifications/", {
    method: "PUT",
    body: payload,
  });

export const getAdminGeneralStats = async () => httpRequest("/admin/general-stats/");

export const updateAdminReview = async (reviewId, payload) =>
  httpRequest(`/reviews/${reviewId}/`, {
    method: "PATCH",
    body: payload,
  });

export const updateAdminContact = async (contactId, payload) =>
  httpRequest(`/admin/contacts/${contactId}/`, {
    method: "PATCH",
    body: payload,
  });

export const getAdminLocations = async () => {
  const data = await httpRequest("/admin/locations/");
  return toList(data);
};

export const createAdminLocation = async (payload) =>
  httpRequest("/admin/locations/", {
    method: "POST",
    body: payload,
  });

export const updateAdminLocation = async (locationId, payload) =>
  httpRequest(`/admin/locations/${locationId}/`, {
    method: "PATCH",
    body: payload,
  });

export const deleteAdminLocation = async (locationId) =>
  httpRequest(`/admin/locations/${locationId}/`, {
    method: "DELETE",
  });
