import { API_BASE_URL } from "../core/apiConfig";
import { httpRequest } from "../core/httpClient";

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

const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.results)) return value.results;
  return [];
};

export const toAbsoluteMediaUrl = (value) => {
  const source = String(value || "").trim();
  if (!source) return "";
  if (source.startsWith("data:")) return source;

  const apiOrigin = new URL(API_BASE_URL, window.location.origin).origin;

  if (/^https?:\/\//i.test(source)) {
    try {
      const sourceUrl = new URL(source);
      // If the URL is a media file (starts with /media/), always route it to the active backend server origin
      if (sourceUrl.pathname.startsWith("/media/")) {
        return new URL(
          `${sourceUrl.pathname}${sourceUrl.search}${sourceUrl.hash}`,
          apiOrigin,
        ).toString();
      }
      if (["localhost", "127.0.0.1", "::1"].includes(sourceUrl.hostname)) {
        return new URL(
          `${sourceUrl.pathname}${sourceUrl.search}${sourceUrl.hash}`,
          apiOrigin,
        ).toString();
      }
    } catch {
      return source;
    }
    return source;
  }

  try {
    return new URL(source, apiOrigin).toString();
  } catch {
    return source;
  }
};

const parseOpeningHours = (openingHoursRaw) => {
  const normalized = String(openingHoursRaw || "").trim();
  if (!normalized) return [];

  const segments = normalized
    .split(/\r?\n|;/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  return segments.map((segment, index) => {
    let separatorIndex = -1;
    for (let i = 0; i < segment.length; i++) {
      if (segment[i] === ":") {
        const beforeChar = segment[i - 1];
        const isTimeColon =
          beforeChar >= "0" &&
          beforeChar <= "9" &&
          segment[i + 1] >= "0" &&
          segment[i + 1] <= "9" &&
          segment[i + 2] >= "0" &&
          segment[i + 2] <= "9";
        if (!isTimeColon) {
          separatorIndex = i;
          break;
        }
      }
    }

    if (separatorIndex > 0) {
      return {
        label: segment.slice(0, separatorIndex).trim(),
        time: segment.slice(separatorIndex + 1).trim(),
      };
    }
    return {
      label: segments.length > 1 ? `Schedule ${index + 1}` : "Schedule",
      time: segment,
    };
  });
};

const toUiPlace = (raw) => {
  const provinceName =
    String(
      raw?.province_name ||
        raw?.location_name ||
        raw?.location?.name ||
        raw?.location ||
        "Unknown",
    ).trim() || "Unknown";
  const category =
    String(
      raw?.category_name || raw?.category?.name || raw?.category || "General",
    ).trim() || "General";
  const categoryImage = toAbsoluteMediaUrl(
    raw?.category?.image_url || raw?.category?.image || "",
  );
  const title =
    String(raw?.name || raw?.title || "Untitled Place").trim() ||
    "Untitled Place";
  const summary = String(
    raw?.description || "Explore this destination.",
  ).trim();
  const ratingNumber = Number(raw?.average_rating);
  const bestTimeToVisit = String(raw?.best_time_to_visit || "").trim();
  const recommendedDuration = String(raw?.recommended_duration || "").trim();
  const dressCode = String(raw?.dress_code || "").trim();
  const openingHoursRaw = String(raw?.opening_hours || "").trim();
  const mapLink = String(raw?.map_link || "").trim();
  const galleryImages = ensureArray(raw?.gallery_images)
    .map((image) =>
      toAbsoluteMediaUrl(image?.image_url || image?.url || image || ""),
    )
    .filter(Boolean);
  const primaryImage =
    toAbsoluteMediaUrl(raw?.image || galleryImages[0] || FALLBACK_IMAGE) ||
    FALLBACK_IMAGE;
  const hasRealImages = galleryImages.length > 0 || Boolean(raw?.image);
  const orderedGallery = hasRealImages
    ? (galleryImages.length > 0
        ? [
            primaryImage,
            ...galleryImages.filter((imageUrl) => imageUrl !== primaryImage),
          ]
        : [primaryImage])
    : [];

  return {
    id: raw?.place_id,
    slug: slugify(title),
    title,
    category: toTitleCase(category),
    categoryImage,
    image: primaryImage,
    summary,
    about: [summary],
    rating: Number.isFinite(ratingNumber) ? ratingNumber : 0,
    reviews: Number(raw?.review_count || 0),
    hours: parseOpeningHours(openingHoursRaw),
    openingHours: openingHoursRaw,
    bestTimeToVisit,
    recommendedDuration,
    dressCode,
    mapLink,
    highlights: ensureArray(raw?.tags).map((tag) =>
      String(tag?.name || tag).trim(),
    ),
    gallery: orderedGallery,
    hasRealImages,
    provinceName,
    provinceSlug: slugify(provinceName),
    provinceImage: toAbsoluteMediaUrl(
      raw?.location?.image_url || raw?.location?.image || "",
    ),
  };
};

const buildTravelDataFromPlaces = (placesResponse = []) => {
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
        heroImage: place.provinceImage || place.image,
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
        image: place.categoryImage || place.image,
        places: [place],
      });
      return;
    }
    if (!existing.image && place.categoryImage) {
      existing.image = place.categoryImage;
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

const DERIVED_CACHE_TTL_MS = 15000;
let derivedDataCache = null;
let derivedDataExpiresAt = 0;
let derivedDataPromise = null;

export const clearTravelCache = () => {
  derivedDataCache = null;
  derivedDataExpiresAt = 0;
  derivedDataPromise = null;
};

const getDerivedTravelData = async ({ forceRefresh = false } = {}) => {
  const now = Date.now();
  if (!forceRefresh && derivedDataCache && now < derivedDataExpiresAt) {
    return derivedDataCache;
  }
  if (derivedDataPromise) return derivedDataPromise;

  derivedDataPromise = httpRequest("/places/")
    .then((places) => buildTravelDataFromPlaces(places))
    .then((derived) => {
      derivedDataCache = derived;
      derivedDataExpiresAt = Date.now() + DERIVED_CACHE_TTL_MS;
      return derived;
    })
    .finally(() => {
      derivedDataPromise = null;
    });

  return derivedDataPromise;
};

export const getProvinces = async () => {
  const derived = await getDerivedTravelData();
  return derived.provinces;
};

export const getProvinceDetails = async (provinceSlug) => {
  const derived = await getDerivedTravelData();
  const province = derived.placesByProvince.get(provinceSlug);
  if (!province) throw new Error("Province not found.");
  return province;
};

export const getPlaceDetails = async (provinceSlug, placeSlug) => {
  const derived = await getDerivedTravelData();
  const province = derived.placesByProvince.get(provinceSlug);
  const place = province?.places?.find((item) => item.slug === placeSlug) || null;
  if (!place) throw new Error("Place not found.");
  return place;
};

export const getCategories = async () => {
  const derived = await getDerivedTravelData();
  return derived.categories;
};

export const getCategoryDetails = async (categorySlug) => {
  const derived = await getDerivedTravelData();
  const category = derived.categories.find((item) => item.slug === categorySlug) || null;
  if (!category) throw new Error("Category not found.");
  return category;
};

export const getCategoryPlaces = async (categorySlug) => {
  const derived = await getDerivedTravelData();
  const places = derived.categoryPlaces.get(categorySlug);
  if (!places) throw new Error("Category not found.");
  return places;
};

export const getFeaturedPlaces = async (limit = 6) => {
  const derived = await getDerivedTravelData();
  return derived.featured.slice(0, limit);
};

export const getPlaceReviews = async (placeId) => {
  if (!placeId) return [];
  const data = await httpRequest("/reviews/", { query: { place_id: placeId } });
  return ensureArray(data).map((review) => ({
    ...review,
    photos: ensureArray(review?.photos).map((photo) => ({
      ...photo,
      image_url: toAbsoluteMediaUrl(photo?.image_url || photo?.url || ""),
    })),
  }));
};

const buildReviewFormData = ({ placeId, rating, comment, photoFiles }) => {
  const formData = new FormData();
  formData.append("place", String(placeId));
  formData.append("rating", String(rating));
  formData.append("comment", comment || "");
  const files = Array.isArray(photoFiles) ? photoFiles.filter(Boolean) : [];
  files.forEach((file) => formData.append("photo_files", file));
  return formData;
};

export const submitPlaceReview = async ({ placeId, rating, comment, photoFiles = [] }) => {
  const files = Array.isArray(photoFiles) ? photoFiles.filter(Boolean) : [];
  if (files.length > 0) {
    return httpRequest("/reviews/", {
      method: "POST",
      body: buildReviewFormData({ placeId, rating, comment, photoFiles: files }),
    });
  }
  return httpRequest("/reviews/", {
    method: "POST",
    body: { place: placeId, rating, comment },
  });
};

export const updatePlaceReview = async ({ reviewId, placeId, rating, comment, photoFiles = [] }) => {
  if (!reviewId) throw new Error("Review ID is required.");
  const files = Array.isArray(photoFiles) ? photoFiles.filter(Boolean) : [];
  if (files.length > 0) {
    return httpRequest(`/reviews/${reviewId}/`, {
      method: "PUT",
      body: buildReviewFormData({ placeId, rating, comment, photoFiles: files }),
    });
  }
  return httpRequest(`/reviews/${reviewId}/`, {
    method: "PUT",
    body: { place: placeId, rating, comment },
  });
};

export const deletePlaceReview = async (reviewId) => {
  if (!reviewId) throw new Error("Review ID is required.");
  return httpRequest(`/reviews/${reviewId}/`, { method: "DELETE" });
};
