import { httpRequest } from "../core/httpClient";

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

export const createContact = async (payload) =>
  httpRequest("/contacts/", {
    method: "POST",
    body: payload,
  });

export const getAdminContacts = async () => {
  const data = await httpRequest("/admin/contacts/");
  return toList(data);
};

export const getAdminContact = async (contactId) =>
  httpRequest(`/admin/contacts/${contactId}/`);

export const deleteAdminContact = async (contactId) =>
  httpRequest(`/admin/contacts/${contactId}/`, {
    method: "DELETE",
  });
