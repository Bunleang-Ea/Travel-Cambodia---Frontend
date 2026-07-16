import React, { useEffect, useMemo, useState } from "react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useLocation, useNavigate, Link } from "react-router-dom";

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
import {
  deleteAdminPlace,
  getAdminCategories,
  getAdminPlaces,
  updateAdminPlace,
  createAdminPlace,
} from "../../services/modules/adminApi";
import { clearTravelCache } from "../../services/modules/travelApi";

const parseCSV = (text) => {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push("");
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  return lines;
};

const ManagePlaces = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portalBasePath = location.pathname.startsWith("/super-admin")
    ? "/super-admin"
    : "/admin";
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [placeData, categoryData] = await Promise.all([
        getAdminPlaces(),
        getAdminCategories(),
      ]);
      setPlaces(Array.isArray(placeData) ? placeData : []);
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to load destinations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPlaces = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return places.filter((place) => {
      const matchesKeyword =
        !keyword ||
        String(place?.name || "")
          .toLowerCase()
          .includes(keyword) ||
        String(place?.description || "")
          .toLowerCase()
          .includes(keyword) ||
        String(place?.location_name || "")
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "All" || place?.publishing_status === statusFilter;
      const matchesCategory =
        categoryFilter === "All" || place?.category_name === categoryFilter;

      return matchesKeyword && matchesStatus && matchesCategory;
    });
  }, [places, searchTerm, statusFilter, categoryFilter]);

  const handleDelete = async (placeId) => {
    setConfirmState({
      open: true,
      title: "Delete Destination",
      message: "Delete this destination? This cannot be undone.",
      onConfirm: async () => {
        setConfirmState((s) => ({ ...s, loading: true }));
        setErrorMessage("");
        try {
          await deleteAdminPlace(placeId);
          clearTravelCache();
          setPlaces((prev) =>
            prev.filter((place) => String(place.place_id) !== String(placeId)),
          );
          setConfirmState({ open: false });
        } catch (error) {
          setErrorMessage(error?.message || "Failed to delete destination.");
          setConfirmState({ open: false });
        }
      },
    });
  };

  const [confirmState, setConfirmState] = useState({ open: false });

  const handleToggleStatus = async (place) => {
    const nextStatus =
      place?.publishing_status === "Published" ? "Draft" : "Published";
    setErrorMessage("");
    try {
      const updated = await updateAdminPlace(place.place_id, {
        publishing_status: nextStatus,
      });
      clearTravelCache();
      setPlaces((prev) =>
        prev.map((item) =>
          item.place_id === place.place_id ? { ...item, ...updated } : item,
        ),
      );
    } catch (error) {
      setErrorMessage(error?.message || "Failed to update status.");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Description",
      "Category",
      "City/Province",
      "Publishing Status",
      "Is Featured",
      "Map Link",
      "Contact Info",
      "Best Time To Visit",
      "Recommended Duration",
      "Dress Code",
      "Opening Hours",
    ];

    const escapeCSVValue = (val) => {
      if (val === null || val === undefined) return "";
      let str = String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        str = '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };

    const csvRows = [headers.join(",")];

    places.forEach((place) => {
      const row = [
        place.name,
        place.description,
        place.category_name,
        place.location_name,
        place.publishing_status,
        place.is_featured ? "true" : "false",
        place.map_link,
        place.contact_info,
        place.best_time_to_visit,
        place.recommended_duration,
        place.dress_code,
        place.opening_hours,
      ];
      csvRows.push(row.map(escapeCSVValue).join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `destinations_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      if (!text) return;

      const rows = parseCSV(text);
      if (rows.length < 2) {
        setErrorMessage("CSV file is empty or missing headers.");
        return;
      }

      const headers = rows[0].map((h) => h.trim().toLowerCase());
      const dataRows = rows.slice(1);

      setIsLoading(true);
      setErrorMessage("");
      let successCount = 0;
      let failCount = 0;

      const categoryLookup = {};
      categories.forEach((cat) => {
        categoryLookup[cat.name.toLowerCase().trim()] = cat.id;
      });

      const importedPlaces = [];

      for (let i = 0; i < dataRows.length; i++) {
        const row = dataRows[i];
        if (row.length === 1 && row[0] === "") continue;

        const getRowVal = (headerName) => {
          const idx = headers.indexOf(headerName.toLowerCase());
          return idx !== -1 ? (row[idx] || "").trim() : "";
        };

        const name = getRowVal("name");
        const locationName = getRowVal("city/province") || getRowVal("city") || getRowVal("location_name") || getRowVal("location");
        
        if (!name || !locationName) {
          failCount++;
          continue;
        }

        const categoryName = getRowVal("category");
        let categoryId = null;
        if (categoryName) {
          const matchId = categoryLookup[categoryName.toLowerCase().trim()];
          if (matchId) {
            categoryId = matchId;
          }
        }

        const payload = {
          name,
          description: getRowVal("description"),
          category: categoryId,
          location_name_input: locationName,
          publishing_status: getRowVal("publishing status") || getRowVal("publishing_status") || "Draft",
          is_featured: getRowVal("is featured").toLowerCase() === "true" || getRowVal("is_featured").toLowerCase() === "true",
          map_link: getRowVal("map link") || getRowVal("map_link") || null,
          contact_info: getRowVal("contact info") || getRowVal("contact_info") || null,
          best_time_to_visit: getRowVal("best time to visit") || getRowVal("best_time_to_visit") || null,
          recommended_duration: getRowVal("recommended duration") || getRowVal("recommended_duration") || null,
          dress_code: getRowVal("dress code") || getRowVal("dress_code") || null,
          opening_hours: getRowVal("opening hours") || getRowVal("opening_hours") || null,
        };

        try {
          const newPlace = await createAdminPlace(payload);
          importedPlaces.push(newPlace);
          successCount++;
        } catch (err) {
          console.error("Failed to import destination row:", row, err);
          failCount++;
        }
      }

      if (successCount > 0) {
        clearTravelCache();
        setPlaces((prev) => [...prev, ...importedPlaces]);
      }

      alert(`CSV Import Finished!\nSuccessfully imported: ${successCount} destinations.\nFailed/skipped: ${failCount}.`);
      setIsLoading(false);
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Destinations Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage and monitor all travel locations across Cambodia.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportCSV}
              className="bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold py-2.5 px-4 rounded-lg shadow-sm border border-gray-200 transition duration-200"
            >
              Export CSV
            </button>
            <label className="bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold py-2.5 px-4 rounded-lg shadow-sm border border-gray-200 transition duration-200 cursor-pointer">
              Import CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => navigate(`${portalBasePath}/add-destination`)}
              className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm transition duration-200"
            >
              Add Destination
            </button>
          </div>
        </div>
        <ConfirmModal
          open={confirmState.open}
          title={confirmState.title}
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState({ open: false })}
          loading={confirmState.loading}
          confirmLabel={confirmState.confirmLabel || "Delete"}
          cancelLabel={confirmState.cancelLabel || "Cancel"}
        />

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <input
            type="text"
            placeholder="Search destination, description, location..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="md:col-span-2 px-4 py-2.5 border border-gray-200 bg-white rounded-lg text-sm"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-4 py-2.5 border border-gray-200 bg-white rounded-lg text-sm"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="px-4 py-2.5 border border-gray-200 bg-white rounded-lg text-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    City / Province
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-sm text-gray-500">
                      Loading destinations...
                    </td>
                  </tr>
                )}

                {!isLoading && filteredPlaces.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-sm text-gray-500">
                      No destinations found.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredPlaces.map((place) => (
                    <tr
                      key={place.place_id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`/details/${slugify(place.location_name)}/${slugify(place.name)}`}
                          target="_blank"
                          className="text-sm font-bold text-gray-900 hover:text-[#009B3E] hover:underline transition-colors block"
                        >
                          {place.name}
                        </Link>
                        <div className="text-[11px] text-gray-500 max-w-[320px] truncate">
                          {place.description || "No description"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-700">
                          {place.location_name || "Unknown"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 inline-flex text-[10px] leading-4 font-extrabold rounded bg-emerald-100 text-emerald-700">
                          {place.category_name || "Uncategorized"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full mr-2 ${
                              place.publishing_status === "Published"
                                ? "bg-[#009B3E]"
                                : "bg-gray-400"
                            }`}
                          />
                          <span className="text-sm font-bold text-gray-700">
                            {place.publishing_status}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            navigate(`${portalBasePath}/add-destination`, {
                              state: { mode: "edit", place },
                            })
                          }
                          className="text-gray-500 hover:text-[#009B3E] mr-3 transition-colors"
                          title="Edit destination"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(place)}
                          className="text-gray-500 hover:text-blue-600 mr-3 transition-colors"
                          title="Toggle status"
                        >
                          {place.publishing_status === "Published"
                            ? "Move to Draft"
                            : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDelete(place.place_id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          title="Delete destination"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
            Total destinations:{" "}
            <span className="font-bold text-gray-900">
              {filteredPlaces.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePlaces;
