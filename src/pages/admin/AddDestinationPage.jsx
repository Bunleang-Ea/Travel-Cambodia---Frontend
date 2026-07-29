import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createAdminPlace,
  getAdminCategories,
  updateAdminPlace,
  getAdminLocations,
} from "../../services/modules/adminApi";
import { clearTravelCache, toAbsoluteMediaUrl } from "../../services/modules/travelApi";

const AddDestinationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portalBasePath = location.pathname.startsWith("/super-admin")
    ? "/super-admin"
    : "/admin";
  const editingPlace = location.state?.mode === "edit" ? location.state?.place : null;

  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const provinceContainerRef = useRef(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [previewItems, setPreviewItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    locationName: "",
    categoryId: "",
    description: "",
    mapLink: "",
    contactInfo: "",
    bestTimeToVisit: "",
    recommendedDuration: "",
    dressCode: "",
    openingHours: "",
    publishingStatus: "Draft",
    isFeatured: false,
  });

  const getPlaceImageUrls = (place) => {
    const galleryImages = Array.isArray(place?.gallery_images)
      ? place.gallery_images
      : [];
    const fromMainImage = toAbsoluteMediaUrl(String(place?.image || "").trim());
    const fromGallery = galleryImages
      .map((image) => toAbsoluteMediaUrl(String(image?.image_url || "").trim()))
      .filter(Boolean);

    return [fromMainImage, ...fromGallery].filter(
      (url, index, source) => Boolean(url) && source.indexOf(url) === index,
    );
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [categoryData, provinceData] = await Promise.all([
          getAdminCategories(),
          getAdminLocations(),
        ]);
        if (!isMounted) return;
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setProvinces(Array.isArray(provinceData) ? provinceData : []);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load categories/provinces.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        provinceContainerRef.current &&
        !provinceContainerRef.current.contains(event.target)
      ) {
        setShowProvinceDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProvinces = useMemo(() => {
    const query = String(formData.locationName || "").trim().toLowerCase();
    if (!query) {
      return provinces;
    }
    return provinces.filter((prov) =>
      String(prov.name || "").toLowerCase().includes(query)
    );
  }, [provinces, formData.locationName]);

  useEffect(() => {
    if (!editingPlace) return;
    setFormData({
      name: String(editingPlace?.name || ""),
      locationName: String(editingPlace?.location_name || ""),
      categoryId: editingPlace?.category ? String(editingPlace.category) : "",
      description: String(editingPlace?.description || ""),
      mapLink: String(editingPlace?.map_link || ""),
      contactInfo: String(editingPlace?.contact_info || ""),
      bestTimeToVisit: String(editingPlace?.best_time_to_visit || ""),
      recommendedDuration: String(editingPlace?.recommended_duration || ""),
      dressCode: String(editingPlace?.dress_code || ""),
      openingHours: String(editingPlace?.opening_hours || ""),
      publishingStatus: String(editingPlace?.publishing_status || "Draft"),
      isFeatured: Boolean(editingPlace?.is_featured),
    });
    const existingUrls = getPlaceImageUrls(editingPlace);
    setPreviewItems(
      existingUrls.map((url) => ({
        id: url,
        url: url,
        file: null,
        isExisting: true,
      }))
    );
  }, [editingPlace]);

  useEffect(
    () => () => {
      previewItems.forEach((item) => {
        if (item.url.startsWith("blob:")) {
          URL.revokeObjectURL(item.url);
        }
      });
    },
    [previewItems],
  );

  // Support pasting images from clipboard one by one
  useEffect(() => {
    const handleGlobalPaste = (event) => {
      const items = event.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            if (file.size > 5 * 1024 * 1024) {
              setErrorMessage("Pasted image exceeds 5 MB limit.");
              return;
            }
            setErrorMessage("");
            setSuccessMessage("");
            const newItem = {
              id: `pasted-${Date.now()}-${Math.random()}`,
              url: URL.createObjectURL(file),
              file: file,
              isExisting: false,
            };
            setPreviewItems((prev) => [...prev, newItem]);
          }
        }
      }
    };

    window.addEventListener("paste", handleGlobalPaste);
    return () => window.removeEventListener("paste", handleGlobalPaste);
  }, []);

  const pageTitle = useMemo(
    () => (editingPlace ? "Edit Destination" : "Add New Destination"),
    [editingPlace],
  );

  const submitLabel = useMemo(
    () => (editingPlace ? "Save Changes" : "Create Destination"),
    [editingPlace],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const nextFiles = Array.from(event.target.files || []);
    if (nextFiles.length === 0) return;

    for (const file of nextFiles) {
      if (!String(file.type || "").startsWith("image/")) {
        setErrorMessage("Please select valid image files only.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Each image must not exceed 5 MB.");
        return;
      }
    }

    setErrorMessage("");
    setSuccessMessage("");

    const newItems = nextFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file: file,
      isExisting: false,
    }));

    setPreviewItems((prev) => [...prev, ...newItems]);
  };

  const handleDeleteItem = (idToDelete) => {
    setPreviewItems((prev) => {
      const item = prev.find((x) => x.id === idToDelete);
      if (item && item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
      }
      return prev.filter((x) => x.id !== idToDelete);
    });
  };

  const [isDragOverCover, setIsDragOverCover] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Destination name is required.");
      return;
    }
    if (!formData.locationName.trim()) {
      setErrorMessage("City / province is required.");
      return;
    }

    const matchedProvince = provinces.find(
      (prov) => String(prov.name || "").trim().toLowerCase() === formData.locationName.trim().toLowerCase()
    );

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.categoryId ? Number(formData.categoryId) : null,
      location: matchedProvince ? matchedProvince.id : null,
      location_name_input: matchedProvince ? "" : formData.locationName.trim(),
      publishing_status: formData.publishingStatus,
      is_featured: Boolean(formData.isFeatured),
      map_link: (() => {
        let ml = formData.mapLink.trim();
        if (ml.includes("<iframe") && ml.includes("src=")) {
          const match = ml.match(/src="([^"]+)"/);
          if (match) ml = match[1];
        }
        return ml || null;
      })(),
      contact_info: formData.contactInfo.trim() || null,
      best_time_to_visit: formData.bestTimeToVisit.trim() || null,
      recommended_duration: formData.recommendedDuration.trim() || null,
      dress_code: formData.dressCode.trim() || null,
      opening_hours: formData.openingHours.trim() || null,
    };

    const requestPayload = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        requestPayload.append(key, "");
        return;
      }

      if (typeof value === "boolean") {
        requestPayload.append(key, value ? "true" : "false");
        return;
      }

      requestPayload.append(key, String(value));
    });

    if (previewItems.length > 0) {
      const coverItem = previewItems[0];
      if (coverItem.file) {
        requestPayload.append("main_image", coverItem.file);
      } else if (coverItem.isExisting) {
        requestPayload.append("main_image_url", coverItem.url);
      }

      const galleryItems = previewItems.slice(1);
      galleryItems.forEach((item) => {
        if (item.file) {
          requestPayload.append("gallery_image_files", item.file);
        }
      });
    }

    if (editingPlace) {
      const keptExistingUrls = previewItems.filter((item) => item.isExisting).map((item) => item.url);
      if (keptExistingUrls.length === 0) {
        requestPayload.append("keep_gallery_image_urls", "");
      } else {
        keptExistingUrls.forEach((url) => {
          requestPayload.append("keep_gallery_image_urls", url);
        });
      }
    }

    setIsSaving(true);
    try {
      if (editingPlace) {
        await updateAdminPlace(editingPlace.place_id, requestPayload);
        clearTravelCache();
        setSuccessMessage("Destination updated successfully.");
      } else {
        await createAdminPlace(requestPayload);
        clearTravelCache();
        setSuccessMessage("Destination created successfully.");
        setFormData({
          name: "",
          locationName: "",
          categoryId: "",
          description: "",
          mapLink: "",
          contactInfo: "",
          bestTimeToVisit: "",
          recommendedDuration: "",
          dressCode: "",
          openingHours: "",
          publishingStatus: "Draft",
          isFeatured: false,
        });
        setPreviewItems([]);
      }
    } catch (error) {
      setErrorMessage(error?.message || "Failed to save destination.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          {pageTitle}
        </h2>
        <p className="text-sm text-gray-500">
          Create or update destination details for the public portal.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Destination Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Angkor Wat Temple"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          <div className="relative" ref={provinceContainerRef}>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              City / Province <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              onFocus={() => setShowProvinceDropdown(true)}
              placeholder="e.g. Siem Reap"
              autoComplete="off"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] focus:bg-white transition-all text-sm font-medium"
            />
            {showProvinceDropdown && filteredProvinces.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-[0_12px_30px_rgba(15,23,42,0.08)] py-2">
                {filteredProvinces.map((prov) => (
                  <button
                    key={prov.slug}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, locationName: prov.name }));
                      setShowProvinceDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-[#009B3E] transition-colors text-sm font-semibold text-gray-700"
                  >
                    {prov.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Best Time To Visit
            </label>
            <input
              type="text"
              name="bestTimeToVisit"
              value={formData.bestTimeToVisit}
              onChange={handleChange}
              placeholder="e.g. November to March"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Recommended Duration
            </label>
            <input
              type="text"
              name="recommendedDuration"
              value={formData.recommendedDuration}
              onChange={handleChange}
              placeholder="e.g. 3 - 4 Hours"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Dress Code
            </label>
            <input
              type="text"
              name="dressCode"
              value={formData.dressCode}
              onChange={handleChange}
              placeholder="e.g. Shoulders and knees covered"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Opening Hours (Text)
            </label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              placeholder="e.g. Daily: 7:00 AM - 5:00 PM"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            >
              <option value="">No Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Publishing Status
            </label>
            <select
              name="publishingStatus"
              value={formData.publishingStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            placeholder="Describe this destination..."
            className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Destination Images
            </label>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-700 file:font-semibold"
            />
            <p className="mt-2 text-xs text-gray-500">
              Upload JPG, PNG, or WEBP (max 5 MB each). You can also paste images directly from your clipboard (Ctrl+V) one by one. Drag and drop grid images onto the Main Cover to set them as the primary cover, or delete individual photos.
            </p>
            {previewItems.length > 0 ? (
              <p className="mt-1 text-xs font-medium text-emerald-700">
                Total images: {previewItems.length} ({previewItems.filter(x => !x.isExisting).length} new)
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Image Previews
            </label>
            <div className="min-h-[150px] w-full bg-[#F7FBFC] rounded-xl border border-dashed border-gray-300 overflow-hidden p-3">
              {previewItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {/* Main Cover Image */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setIsDragOverCover(true)}
                    onDragLeave={() => setIsDragOverCover(false)}
                    onDrop={(e) => {
                      setIsDragOverCover(false);
                      const fromIndexStr = e.dataTransfer.getData("text/plain");
                      const fromIndex = Number(fromIndexStr);
                      if (!isNaN(fromIndex) && fromIndex > 0 && fromIndex < previewItems.length) {
                        setPreviewItems((prev) => {
                          const next = [...prev];
                          const [movedItem] = next.splice(fromIndex, 1);
                          next.unshift(movedItem);
                          return next;
                        });
                      }
                    }}
                    className={`relative h-[200px] w-full bg-gray-100 rounded-lg overflow-hidden transition-all duration-200 border-2 ${isDragOverCover ? "border-[#009B3E] scale-[0.99]" : "border-transparent"
                      }`}
                  >
                    <img
                      src={previewItems[0].url}
                      alt="Main Cover Preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded shadow-sm tracking-wider z-10">
                      Main Cover
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(previewItems[0].id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
                      title="Remove cover image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {isDragOverCover && (
                      <div className="absolute inset-0 bg-[#009B3E]/20 backdrop-blur-[1px] flex items-center justify-center z-20 pointer-events-none">
                        <span className="bg-white/90 text-[#009B3E] font-bold text-xs px-3 py-1.5 rounded-full shadow border border-[#009B3E]/30">
                          Drop here to set as Cover
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Other Gallery Images */}
                  {previewItems.length > 1 ? (
                    <div>
                      <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
                        Gallery Images (Drag to cover to swap)
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {previewItems.slice(1).map((item, index) => {
                          const actualIndex = index + 1;
                          return (
                            <div
                              key={item.id}
                              draggable="true"
                              onDragStart={(e) => {
                                e.dataTransfer.setData("text/plain", String(actualIndex));
                              }}
                              className="relative h-[64px] rounded-lg overflow-hidden bg-gray-100 group cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-[#009B3E] transition-all"
                            >
                              <img
                                src={item.url}
                                alt={`Gallery preview ${actualIndex}`}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 py-0.5 rounded font-mono">
                                #{actualIndex}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                                className="absolute top-1 right-1 w-5 h-5 bg-black/50 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Remove gallery image"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="h-[134px] w-full flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-medium">
                    No images selected
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Map Link
            </label>
            <input
              type="text"
              name="mapLink"
              value={formData.mapLink}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">
              Contact Info
            </label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Phone or email"
              className="w-full px-4 py-3 bg-[#F7FBFC] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009B3E] transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  isFeatured: event.target.checked,
                }))
              }
              className="mr-2 h-4 w-4"
            />
            Featured destination
          </label>
        </div>

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(`${portalBasePath}/places`)}
            className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors px-4 py-2.5"
          >
            Back to List
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-8 rounded-lg shadow-sm transition duration-200 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinationPage;
