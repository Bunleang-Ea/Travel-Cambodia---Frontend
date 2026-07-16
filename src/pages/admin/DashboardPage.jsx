import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAdminGeneralStats, updateAdminReview, updateAdminContact, getAdminPlaces } from "../../services/modules/adminApi";

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const DashboardPage = () => {
  const location = useLocation();
  const portalBasePath = location.pathname.startsWith("/super-admin")
    ? "/super-admin"
    : "/admin";

  const [stats, setStats] = useState(null);
  const [placesById, setPlacesById] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const loadStats = async () => {
    try {
      const [statsData, placesData] = await Promise.all([
        getAdminGeneralStats(),
        getAdminPlaces(),
      ]);
      setStats(statsData);
      const placeLookup = {};
      (Array.isArray(placesData) ? placesData : []).forEach((place) => {
        placeLookup[String(place.place_id)] = place;
      });
      setPlacesById(placeLookup);
      setError("");
    } catch (err) {
      setError(err?.message || "Failed to load dashboard statistics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleToggleReview = async (reviewId, currentStatus) => {
    try {
      await updateAdminReview(reviewId, { is_approved: !currentStatus });
      loadStats();
    } catch (err) {
      alert("Failed to update review status: " + err.message);
    }
  };

  const handleOpenContact = (contact) => {
    setSelectedContact(contact);
    setReplyText(contact.admin_reply || "");
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!selectedContact) return;
    setIsSending(true);
    try {
      await updateAdminContact(selectedContact.id, {
        admin_reply: replyText,
        is_resolved: true,
      });
      setSelectedContact(null);
      setReplyText("");
      loadStats();
    } catch (err) {
      alert("Failed to send reply: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-500">
          Real-time metrics, content status, and user engagement monitoring.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Destinations */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Destinations</p>
          <p className="text-4xl font-extrabold mb-2">{stats?.total_places || 0}</p>
          <div className="text-xs font-semibold bg-white bg-opacity-20 inline-block px-2 py-0.5 rounded-full">
            Active Places
          </div>
        </div>

        {/* Card 2: Categories */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Categories</p>
          <p className="text-4xl font-extrabold mb-2">{stats?.total_categories || 0}</p>
          <div className="text-xs font-semibold bg-white bg-opacity-20 inline-block px-2 py-0.5 rounded-full">
            Travel Themes
          </div>
        </div>

        {/* Card 3: Reviews */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Total Reviews</p>
          <p className="text-4xl font-extrabold mb-2">{stats?.total_reviews || 0}</p>
          <div className="text-xs font-semibold bg-white bg-opacity-20 inline-block px-2 py-0.5 rounded-full">
            User Feedback
          </div>
        </div>

        {/* Card 4: Inquiries */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Contact Messages</p>
          <p className="text-4xl font-extrabold mb-2">{stats?.total_contacts || 0}</p>
          <div className="text-xs font-semibold bg-white bg-opacity-25 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></span>
            {stats?.unresolved_contacts || 0} unresolved
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reviews Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
            <h3 className="text-lg font-bold text-gray-900">Recent Reviews</h3>
            <Link to={`${portalBasePath}/reviews`} className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {stats?.recent_reviews?.length > 0 ? (
              stats.recent_reviews.map((rev) => {
                const place = placesById[String(rev.place)] || null;
                return (
                  <div key={rev.review_id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-200">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-gray-800 truncate">{rev.user_name || rev.user_email}</span>
                        <span className="text-[10px] text-gray-400">{new Date(rev.created_at).toLocaleDateString()}</span>
                      </div>
                      {place && (
                        <div className="mb-1 text-[11px] font-medium text-gray-500">
                          on{" "}
                          <Link
                            to={`/details/${slugify(place.location_name)}/${slugify(place.name)}`}
                            target="_blank"
                            className="text-[#009B3E] hover:underline font-bold"
                          >
                            {place.name}
                          </Link>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-amber-500 mb-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 italic">"{rev.comment || 'No comment provided'}"</p>
                    </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleReview(rev.review_id, rev.is_approved)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border transition ${
                        rev.is_approved
                          ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                          : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                      }`}
                    >
                      {rev.is_approved ? "Approved" : "Pending"}
                    </button>
                  </div>
                </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 text-center py-6">No recent reviews submitted.</p>
            )}
          </div>
        </div>

        {/* Recent Inquiries Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
            <h3 className="text-lg font-bold text-gray-900">Recent Contact Inquiries</h3>
            <Link to={`${portalBasePath}/contacts`} className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {stats?.recent_contacts?.length > 0 ? (
              stats.recent_contacts.map((contact) => (
                <div key={contact.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-200">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-800 truncate">{contact.name}</span>
                      <span className="text-[10px] text-gray-400">{new Date(contact.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 truncate mb-1">{contact.subject}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{contact.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenContact(contact)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${
                        contact.is_resolved
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 animate-pulse"
                      }`}
                    >
                      {contact.is_resolved ? "Resolved" : "Respond"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-6">No recent contact inquiries.</p>
            )}
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Respond to Inquiry</h3>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600 transition"
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
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <span className="font-semibold text-gray-500 text-xs uppercase block mb-1">Message</span>
                <p className="text-gray-700 text-xs whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4">
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
                  onClick={() => setSelectedContact(null)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-800 transition px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="bg-[#009B3E] hover:bg-green-700 text-white text-xs font-bold py-2 px-5 rounded-lg shadow-sm transition disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Mark Resolved & Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
