import React, { useEffect, useMemo, useState } from "react";
import {
  getAdminContacts,
  getAdminContact,
  deleteAdminContact,
} from "../../services/modules/contactApi";
import { updateAdminContact } from "../../services/modules/adminApi";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Filters and Search States
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "unresolved", "resolved"
  const [searchQuery, setSearchQuery] = useState("");

  // Custom Modal States
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [successModal, setSuccessModal] = useState({ show: false, message: "", isError: false });

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminContacts();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Filtered and Searched Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      // 1. Status Filter
      if (statusFilter === "resolved" && !c.is_resolved) return false;
      if (statusFilter === "unresolved" && c.is_resolved) return false;

      // 2. Search Query Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (c.name || "").toLowerCase().includes(query);
        const emailMatch = (c.email || "").toLowerCase().includes(query);
        const subjectMatch = (c.subject || "").toLowerCase().includes(query);
        const messageMatch = (c.message || "").toLowerCase().includes(query);
        return nameMatch || emailMatch || subjectMatch || messageMatch;
      }

      return true;
    });
  }, [contacts, statusFilter, searchQuery]);

  // Tab Badge Counts
  const unresolvedCount = useMemo(() => {
    return contacts.filter((c) => !c.is_resolved).length;
  }, [contacts]);

  const resolvedCount = useMemo(() => {
    return contacts.filter((c) => c.is_resolved).length;
  }, [contacts]);

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const confirmDelete = async (id) => {
    try {
      await deleteAdminContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
      setSuccessModal({
        show: true,
        message: "Contact inquiry has been permanently deleted from the database.",
        isError: false,
      });
    } catch (err) {
      setSuccessModal({
        show: true,
        message: err?.message || "Failed to delete contact.",
        isError: true,
      });
    }
  };

  const openContact = async (id) => {
    setSelectedContact(null);
    try {
      const data = await getAdminContact(id);
      setSelectedContact(data);
      setReplyText(data.admin_reply || "");
    } catch (err) {
      setSuccessModal({
        show: true,
        message: err?.message || "Failed to load contact details.",
        isError: true,
      });
    }
  };

  const closeContact = () => {
    setSelectedContact(null);
    setReplyText("");
  };

  const handleSendResponse = async (e) => {
    e.preventDefault();
    if (!selectedContact) return;
    setIsSending(true);
    try {
      await updateAdminContact(selectedContact.id, {
        admin_reply: replyText,
        is_resolved: true,
      });
      
      setContacts((prev) =>
        prev.map((c) => (c.id === selectedContact.id ? { ...c, is_resolved: true, admin_reply: replyText } : c))
      );
      setSelectedContact(null);
      setReplyText("");
      
      setSuccessModal({
        show: true,
        message: "Inquiry resolved! Reply saved and client notified by email.",
        isError: false,
      });
    } catch (err) {
      setSuccessModal({
        show: true,
        message: err?.message || "Failed to send response.",
        isError: true,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Contact Inquiries
        </h2>
        <p className="text-sm text-gray-500">
          Manage user support tickets, general questions, and resolve communication inquiries.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Search and Filters Bar */}
      {!loading && contacts.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              All ({contacts.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("unresolved")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                statusFilter === "unresolved"
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Unresolved
              {unresolvedCount > 0 && (
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-100 text-amber-800 rounded-full animate-pulse">
                  {unresolvedCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("resolved")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                statusFilter === "resolved"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Resolved
              {resolvedCount > 0 && (
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-green-100 text-green-800 rounded-full">
                  {resolvedCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, subject, message..."
              className="w-full pl-9 pr-8 py-2 bg-[#F7FBFC] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:border-transparent transition-all text-xs font-medium"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <div className="w-full min-h-[250px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500 text-sm">
          No contact inquiries found.
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-1">No matches found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-5 leading-relaxed">
            We couldn't find any inquiries matching your current filters or search terms. Try modifying your search.
          </p>
          <button
            onClick={() => {
              setStatusFilter("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Clear Filters & Search
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Subject & Message
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Received Time
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 cursor-pointer" onClick={() => openContact(c.id)}>
                      <div className="text-sm font-bold text-gray-900">{c.name}</div>
                      <div className="text-[11px] text-gray-400">{c.email}</div>
                      {c.phone && <div className="text-[10px] text-gray-400 mt-0.5">{c.phone}</div>}
                    </td>
                    <td className="px-6 py-4 max-w-md cursor-pointer" onClick={() => openContact(c.id)}>
                      <div className="text-sm font-bold text-gray-800 truncate">{c.subject}</div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{c.message}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(c.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-[10px] leading-4 font-extrabold rounded-md uppercase tracking-wider ${
                          c.is_resolved
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700 animate-pulse"
                        }`}
                      >
                        {c.is_resolved ? "Resolved" : "Unresolved"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openContact(c.id)}
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold rounded shadow-sm transition-colors uppercase tracking-wider cursor-pointer"
                        >
                          View / Reply
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-sm transition-colors uppercase tracking-wider cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white px-6 py-4 border-t border-gray-200 text-xs text-gray-500">
            Showing {filteredContacts.length} of {contacts.length} inquiry records.
          </div>
        </div>
      )}

      {/* Response Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Respond to Inquiry</h3>
              <button
                type="button"
                onClick={closeContact}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 mb-4 text-sm">
              <div>
                <span className="font-semibold text-gray-500 text-xs uppercase block">From</span>
                <span className="font-medium text-gray-800">{selectedContact.name} ({selectedContact.email})</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500 text-xs uppercase block">Subject</span>
                <span className="font-medium text-gray-800">{selectedContact.subject}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 max-h-36 overflow-y-auto">
                <span className="font-semibold text-gray-500 text-xs uppercase block mb-1">Message</span>
                <p className="text-gray-700 text-xs whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <form onSubmit={handleSendResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  Admin Response Reply
                </label>
                <textarea
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type response that will resolve this inquiry..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-xs font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeContact}
                  className="text-xs font-bold text-gray-500 hover:text-gray-800 transition px-4 py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="bg-[#009B3E] hover:bg-green-700 text-white text-xs font-bold py-2 px-5 rounded-lg shadow-sm transition disabled:opacity-60 cursor-pointer"
                >
                  {isSending ? "Sending..." : "Mark Resolved & Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100 shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Delete Inquiry?</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              Are you sure you want to delete this contact inquiry permanently? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ show: false, id: null })}
                className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = deleteConfirm.id;
                  setDeleteConfirm({ show: false, id: null });
                  confirmDelete(id);
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Action Success/Error Modal */}
      {successModal.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200 text-center">
            {successModal.isError ? (
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            ) : (
              <div className="w-14 h-14 bg-[#e6f7ec] text-[#009B3E] rounded-2xl flex items-center justify-center mx-auto mb-5 border border-green-100 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {successModal.isError ? "Error Occurred" : "Success"}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              {successModal.message}
            </p>
            <button
              type="button"
              onClick={() => setSuccessModal({ show: false, message: "", isError: false })}
              className={`w-full py-2.5 text-xs font-bold rounded-xl shadow-sm transition cursor-pointer ${
                successModal.isError
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-[#009B3E] hover:bg-green-700 text-white"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
