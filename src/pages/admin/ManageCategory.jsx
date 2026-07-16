import React, { useEffect, useMemo, useState } from "react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteAdminCategory,
  getAdminCategories,
} from "../../services/modules/adminApi";
import { toAbsoluteMediaUrl } from "../../services/modules/travelApi";

const ManageCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const portalBasePath = location.pathname.startsWith("/super-admin")
    ? "/super-admin"
    : "/admin";
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const loadCategories = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await getAdminCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(error?.message || "Failed to load categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return categories;

    return categories.filter((category) => {
      const name = String(category?.name || "").toLowerCase();
      const description = String(category?.description || "").toLowerCase();
      return name.includes(keyword) || description.includes(keyword);
    });
  }, [categories, searchTerm]);

  const handleEdit = (category) => {
    // Redirect to the add/edit form and pass category data in location state
    navigate(`${portalBasePath}/add-category`, { state: { category } });
  };

  const handleDelete = async (category) => {
    // handled by confirmation modal
    setConfirmState({
      open: true,
      title: "Delete Category",
      message: `Delete "${category.name}" category? This cannot be undone.`,
      onConfirm: async () => {
        setConfirmState((s) => ({ ...s, loading: true }));
        setErrorMessage("");
        try {
          await deleteAdminCategory(category.id);
          setCategories((prev) =>
            prev.filter((item) => item.id !== category.id),
          );
          setConfirmState({ open: false });
        } catch (error) {
          setErrorMessage(error?.message || "Failed to delete category.");
          setConfirmState({ open: false });
        }
      },
    });
  };

  const [confirmState, setConfirmState] = useState({ open: false });

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Category Management
            </h2>
            <p className="text-sm text-gray-500">
              Organize and define the types of experiences available in
              Cambodia.
            </p>
          </div>

          <button
            onClick={() => navigate(`${portalBasePath}/add-category`)}
            className="bg-[#009B3E] hover:bg-green-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-sm transition duration-200 shrink-0"
          >
            Add Category
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
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
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
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Places
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
                      Loading categories...
                    </td>
                  </tr>
                )}

                {!isLoading && filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-sm text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-5">
                        <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                          {category.image || category.image_url ? (
                            <img
                              src={toAbsoluteMediaUrl(category.image_url || category.image)}
                              alt={category.name}
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
                        <div className="text-sm font-bold text-gray-900">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          ID: {category.id}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-500 whitespace-normal max-w-xl leading-relaxed">
                          {category.description || "No description"}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-[#009B3E]">
                          {Number(category.places_count || 0)} Sites
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-gray-500 hover:text-[#009B3E] mr-4 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
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
            Total categories:{" "}
            <span className="font-bold text-gray-900">
              {filteredCategories.length}
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

export default ManageCategory;
