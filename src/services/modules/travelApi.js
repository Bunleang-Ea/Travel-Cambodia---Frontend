import { USE_MOCK_TRAVEL } from "../core/apiConfig";
import { httpRequest } from "../core/httpClient";
import {
  getCategoriesMock,
  getCategoryBySlugMock,
  getFeaturedPlacesMock,
  getPlaceDetailsMock,
  getPlacesByCategorySlugMock,
  getProvinceBySlugMock,
  getProvincesMock,
} from "../mock/travelMockApi";

const FALLBACK_IMAGE =
  "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg";

const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toTitleCase = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const isNotFound = (error) => Number(error?.status) === 404;

const toUiPlace = (raw) => {
  const provinceName = String(raw?.location || "Unknown").trim() || "Unknown";
  const category = String(raw?.category || "General").trim() || "General";
  const title =
    String(raw?.name || "Untitled Place").trim() || "Untitled Place";
  const summary = String(
    raw?.description || "Explore this destination.",
  ).trim();
  const ratingNumber = Number(raw?.average_rating);

  return {
    id: raw?.place_id,
    slug: slugify(title),
    title,
    category: toTitleCase(category),
    image: raw?.image || FALLBACK_IMAGE,
    summary,
    about: [summary],
    rating: Number.isFinite(ratingNumber) ? ratingNumber : 0,
    reviews: 0,
    hours: [],
    highlights: ensureArray(raw?.tags).map((tag) => String(tag)),
    gallery: [raw?.image || FALLBACK_IMAGE],
    provinceName,
    provinceSlug: slugify(provinceName),
  };
};

const buildTravelDataFromPlaces = (placesResponse) => {
  const normalizedPlaces = ensureArray(placesResponse).map(toUiPlace);

  const provincesBySlug = new Map();
  normalizedPlaces.forEach((place) => {
    const key = place.provinceSlug;
    const existing = provincesBySlug.get(key);

    if (!existing) {
      provincesBySlug.set(key, {
        slug: place.provinceSlug,
        name: place.provinceName,
        category: place.category,
        heroImage: place.image,
        description: `Explore top places in ${place.provinceName}.`,
        places: [place],
      });
      return;
    }

    existing.places.push(place);
  });

  const categoriesBySlug = new Map();
  normalizedPlaces.forEach((place) => {
    const title = place.category;
    const slug = slugify(title);
    const existing = categoriesBySlug.get(slug);

    if (!existing) {
      categoriesBySlug.set(slug, {
        slug,
        title,
        subtitle: "Travel Theme",
        description: `Discover ${title.toLowerCase()} experiences across Cambodia.`,
        image: place.image,
        places: [place],
      });
      return;
    }

    existing.places.push(place);
  });

  const provinces = Array.from(provincesBySlug.values());
  const categories = Array.from(categoriesBySlug.values()).map((category) => ({
    ...category,
    subtitle: `${category.places.length} places`,
  }));

  const placesByProvince = new Map(
    provinces.map((province) => [province.slug, province]),
  );
  const categoryPlaces = new Map(
    categories.map((category) => [category.slug, category.places]),
  );

  return {
    provinces,
    categories,
    placesByProvince,
    categoryPlaces,
    featured: [...normalizedPlaces]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 12),
  };
};

const getDerivedTravelData = async () => {
  const places = await httpRequest("/places/");
  return buildTravelDataFromPlaces(places);
};

export const getProvinces = async () => {
  if (USE_MOCK_TRAVEL) return getProvincesMock();

  try {
    return await httpRequest("/provinces/");
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    return derived.provinces;
  }
};

export const getProvinceDetails = async (provinceSlug) => {
  if (USE_MOCK_TRAVEL) return getProvinceBySlugMock(provinceSlug);

  try {
    return await httpRequest(`/provinces/${provinceSlug}/`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    const province = derived.placesByProvince.get(provinceSlug);
    if (!province) throw new Error("Province not found.");
    return province;
  }
};

export const getPlaceDetails = async (provinceSlug, placeSlug) => {
  if (USE_MOCK_TRAVEL) return getPlaceDetailsMock(provinceSlug, placeSlug);

  try {
    return await httpRequest(`/provinces/${provinceSlug}/places/${placeSlug}/`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    const province = derived.placesByProvince.get(provinceSlug);
    const place =
      province?.places?.find((item) => item.slug === placeSlug) || null;
    if (!place) throw new Error("Place not found.");
    return place;
  }
};

export const getCategories = async () => {
  if (USE_MOCK_TRAVEL) return getCategoriesMock();

  try {
    return await httpRequest("/categories/");
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    return derived.categories;
  }
};

export const getCategoryDetails = async (categorySlug) => {
  if (USE_MOCK_TRAVEL) return getCategoryBySlugMock(categorySlug);

  try {
    return await httpRequest(`/categories/${categorySlug}/`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    const category =
      derived.categories.find((item) => item.slug === categorySlug) || null;
    if (!category) throw new Error("Category not found.");
    return category;
  }
};

export const getCategoryPlaces = async (categorySlug) => {
  if (USE_MOCK_TRAVEL) return getPlacesByCategorySlugMock(categorySlug);

  try {
    return await httpRequest(`/categories/${categorySlug}/places/`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    const places = derived.categoryPlaces.get(categorySlug);
    if (!places) throw new Error("Category not found.");
    return places;
  }
};

export const getFeaturedPlaces = async (limit = 6) => {
  if (USE_MOCK_TRAVEL) return getFeaturedPlacesMock(limit);

  try {
    return await httpRequest("/places/featured/", { query: { limit } });
  } catch (error) {
    if (!isNotFound(error)) throw error;
    const derived = await getDerivedTravelData();
    return derived.featured.slice(0, limit);
  }
};
