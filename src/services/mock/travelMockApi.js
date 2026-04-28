import {
  provinceCatalog,
  categoryCatalog,
  getAllPlaces,
  getCategoryBySlug,
  getPlaceBySlug,
  getProvinceBySlug,
} from "../../utils/travelData";

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProvincesMock = async () => {
  await delay();
  return structuredClone(provinceCatalog);
};

export const getProvinceBySlugMock = async (provinceSlug) => {
  await delay();
  const province = getProvinceBySlug(provinceSlug);
  if (!province) throw new Error("Province not found.");
  return structuredClone(province);
};

export const getPlaceDetailsMock = async (provinceSlug, placeSlug) => {
  await delay();
  const place = getPlaceBySlug(provinceSlug, placeSlug);
  if (!place) throw new Error("Place not found.");
  return structuredClone(place);
};

export const getCategoriesMock = async () => {
  await delay();
  return structuredClone(categoryCatalog);
};

export const getCategoryBySlugMock = async (categorySlug) => {
  await delay();
  const category = getCategoryBySlug(categorySlug);
  if (!category) throw new Error("Category not found.");
  return structuredClone(category);
};

export const getPlacesByCategorySlugMock = async (categorySlug) => {
  await delay();
  const { getPlacesByCategorySlug } = await import("../../utils/travelData");
  return structuredClone(getPlacesByCategorySlug(categorySlug));
};

export const getFeaturedPlacesMock = async (limit = 6) => {
  await delay();
  const all = getAllPlaces();
  return structuredClone(all.slice(0, limit));
};
