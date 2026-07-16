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
  deleteAdminLocation,
  getAdminLocations,
} from "../../services/modules/adminApi";
import { toAbsoluteMediaUrl } from "../../services/modules/travelApi";

const ManageLocations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portalBasePath = location.pathname.startsWith("/super-admin")
    ? "/super-admin"
    : "/admin";
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadLocations = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await getAdminLocations();
      setLocations(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to load locations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return locations;

    return locations.filter((loc) => {
      const name = String(loc?.name || "").toLowerCase();
      return name.includes(keyword);
    });
  }, [locations, searchTerm]);

  const handleEdit = (loc) => {
    // Redirect to the add/edit form and pass location data in location state
    navigate(`${portalBasePath}/add-location`, { state: { location: loc } });
  };

  const handleDelete = async (loc) => {
    setConfirmState({
      open: true,
      title: "Delete Location",
      message: `Are you sure you want to delete the location "${loc.name}"? This will unlink it from any associated destinations.`,
      onConfirm: async () => {
        setConfirmState((s) => ({ ...s, loading: true }));
        setErrorMessage("");
        try {
          await deleteAdminLocation(loc.id);
          setLocations((prev) =>
            prev.filter((item) => item.id !== loc.id),
          );
          setConfirmState({ open: false });
        } catch (error) {
          setErrorMessage(error?.message || "Failed to delete location.");
          setConfirmState({ open: false });
        }
      },
    });
  };

  const [confirmState, setConfirmState] = useState({ open: false });

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              City & Province Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage tourist destinations' regions and configure their customized cover images.
            </p>
          </div>

          <button
            onClick={() => navigate(`${portalBasePath}/add-location`)}
            className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 shrink-0"
          >
            Add Location
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        )}

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search city or province..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#009B3E]"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Location Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Associated Places
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {isLoading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-sm text-gray-500">
                      Loading locations...
                    </td>
                  </tr>
                )}

                {!isLoading && filteredLocations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-sm text-gray-500">
                      No locations found.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredLocations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-5">
                        <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                          {loc.image || loc.image_url ? (
                            <img
                              src={toAbsoluteMediaUrl(loc.image_url || loc.image)}
                              alt={loc.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-semibold">
                              No Image
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <Link
                          to={`/destinations/${slugify(loc.name)}`}
                          target="_blank"
                          className="text-sm font-bold text-gray-900 hover:text-[#009B3E] hover:underline transition-colors block"
                        >
                          {loc.name}
                        </Link>
                        <div className="text-xs text-gray-400 font-medium">
                          ID: {loc.id}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-[#009B3E]">
                          {Number(loc.places_count || 0)} Places
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(loc)}
                          className="text-gray-500 hover:text-[#009B3E] mr-4 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(loc)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
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
            Total locations:{" "}
            <span className="font-bold text-gray-900">
              {filteredLocations.length}
            </span>
          </div>
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
    </>
  );
};

export default ManageLocations;
