import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createAdminLocation,
  updateAdminLocation,
} from "../../services/modules/adminApi";

import { toAbsoluteMediaUrl } from "../../services/modules/travelApi";

const AddLocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const portalBasePath = location.pathname.startsWith("/super-admin")
    ? "/super-admin"
    : "/admin";
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    imageFile: null,
    imagePreview: "",
  });

  const locationState = location.state || {};
  const editingLocation = locationState.location || null;

  useEffect(() => {
    if (!editingLocation) return;
    setFormData((prev) => ({
      ...prev,
      name: String(editingLocation.name || "").trim(),
      imagePreview: toAbsoluteMediaUrl(editingLocation.image_url || editingLocation.image || ""),
      imageFile: null,
    }));
  }, [editingLocation]);

  // Support pasting image from clipboard
  useEffect(() => {
    const handleGlobalPaste = (event) => {
      const items = event.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setErrorMessage("");
            setFormData((prev) => ({
              ...prev,
              imageFile: file,
              imagePreview: URL.createObjectURL(file),
            }));
          }
        }
      }
    };

    window.addEventListener("paste", handleGlobalPaste);
    return () => window.removeEventListener("paste", handleGlobalPaste);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: "" }));
      return;
    }

    if (!String(file.type || "").startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Location name is required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      if (formData.imageFile) {
        payload.append("image", formData.imageFile);
      }

      if (editingLocation) {
        await updateAdminLocation(editingLocation.id, payload);
        setSuccessMessage("Location updated successfully.");
        navigate(`${portalBasePath}/locations`);
        return;
      }

      await createAdminLocation(payload);
      setSuccessMessage("Location created successfully.");
      setFormData({
        name: "",
        imageFile: null,
        imagePreview: "",
      });
    } catch (error) {
      setErrorMessage(error?.message || "Failed to save location.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          {editingLocation ? "Edit Location" : "Add New Location"}
        </h2>
        <p className="text-sm text-gray-500">
          Create a new city or province to group travel destinations.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 font-medium">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
            Location Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Siem Reap"
            className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium text-gray-800"
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
            Location Cover Image
          </label>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-64 h-40 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#009B3E] hover:bg-green-50/30 transition-all group relative"
            >
              {formData.imagePreview ? (
                <>
                  <img
                    src={formData.imagePreview}
                    alt="Location preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Replace Image
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-green-100 text-gray-400 group-hover:text-[#009B3E] flex items-center justify-center mx-auto mb-3 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">
                    Click to upload
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    or paste image from clipboard (Ctrl+V)
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Choose File...
              </button>
              <p className="text-xs text-gray-400">
                Supports JPG, PNG, or WebP. Copy image from web/system and paste directly with keyboard shortcut!
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(`${portalBasePath}/locations`)}
            className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2.5"
          >
            Back to List
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-8 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Location"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationPage;
