export const slugify = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/['\"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const makePlace = ({
  title,
  category,
  image,
  summary,
  about,
  rating,
  reviews,
  hours,
  highlights,
  gallery,
}) => {
  const placeSlug = slugify(title);

  return {
    slug: placeSlug,
    title,
    category,
    image,
    summary,
    about,
    rating,
    reviews,
    hours,
    highlights,
    gallery,
  };
};

// ── Local image paths ──────────────────────────────────────────────────────────
const IMG = {
  bayonFaces:   "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
  ancientHead:  "/images/ancient-head-temple-cambodia.jpg",
  angkorThom:   "/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg",
  localScene:   "/images/chanratanak-nay-GRK6KO4exaI-unsplash.jpg",
  nature:       "/images/george-bakos-OvEr7BwXxxg-unsplash.jpg",
  countryside:  "/images/graham-h-cambodia-2388090_1920.jpg",
  coastal:      "/images/vicky-t-EY3tC81nFt0-unsplash.jpg",
  urban:        "/images/allphoto-bangkok-VoLyNETLCSU-unsplash.jpg",
};

export const provinceCatalog = [
  {
    slug: "siem-reap",
    name: "Siem Reap",
    category: "Temple",
    heroImage: IMG.bayonFaces,
    description:
      "Gateway to Angkor and the best known temple province in Cambodia.",
    places: [
      makePlace({
        title: "Angkor Wat",
        category: "Temple",
        image: IMG.bayonFaces,
        summary:
          "The world's largest religious monument and Cambodia's most famous landmark.",
        about: [
          "Angkor Wat is the signature temple complex of the Khmer Empire and one of the most visited heritage sites in Southeast Asia.",
          "Its bas-reliefs, long causeways, and sunrise views make it a defining stop in Cambodia travel.",
        ],
        rating: 4.8,
        reviews: 2151,
        hours: [
          { label: "Angkor Wat Temple", time: "5:00 AM - 5:30 PM" },
          { label: "Srah Srang", time: "5:00 AM - 5:30 PM" },
          { label: "Phnom Bakheng", time: "5:00 AM - 7:00 PM" },
          { label: "Pre Rup", time: "5:00 AM - 7:00 PM" },
        ],
        highlights: ["Sunrise view", "Bas-reliefs", "UNESCO heritage"],
        gallery: [
          IMG.bayonFaces,
          IMG.ancientHead,
          IMG.angkorThom,
          IMG.localScene,
        ],
      }),
      makePlace({
        title: "Bayon Temple",
        category: "Temple",
        image: IMG.angkorThom,
        summary: "Known for the giant smiling faces carved into its towers.",
        about: [
          "Bayon Temple stands at the center of Angkor Thom and is famous for its serene stone faces.",
          "It is one of the most recognizable temples in the region and a favorite for architecture lovers.",
        ],
        rating: 4.7,
        reviews: 1460,
        hours: [
          { label: "Bayon Temple", time: "7:30 AM - 5:30 PM" },
          { label: "Angkor Thom", time: "7:30 AM - 5:30 PM" },
        ],
        highlights: ["Smiling faces", "Angkor Thom", "Stone carvings"],
        gallery: [
          IMG.angkorThom,
          IMG.bayonFaces,
          IMG.ancientHead,
          IMG.localScene,
        ],
      }),
      makePlace({
        title: "Pub Street",
        category: "Nightlife",
        image: IMG.urban,
        summary:
          "The center of nightlife, food, and entertainment in Siem Reap.",
        about: [
          "Pub Street is the busiest evening zone in Siem Reap, full of restaurants, bars, and market stalls.",
          "It is the easiest place to find food and entertainment after a temple day.",
        ],
        rating: 4.5,
        reviews: 980,
        hours: [
          { label: "Night Market Zone", time: "4:00 PM - 12:00 AM" },
          { label: "Bars and Restaurants", time: "Late Afternoon - Late Night" },
        ],
        highlights: ["Food", "Night market", "Entertainment"],
        gallery: [
          IMG.urban,
          IMG.localScene,
          IMG.bayonFaces,
          IMG.ancientHead,
        ],
      }),
      makePlace({
        title: "Psar Chaa - Old Market",
        category: "Urban",
        image: IMG.localScene,
        summary: "A classic market for souvenirs, food, and local shopping.",
        about: [
          "Old Market is a great stop for souvenirs, snacks, and everyday Cambodian products.",
          "It offers a more local shopping experience than the tourist-heavy nightlife areas.",
        ],
        rating: 4.4,
        reviews: 740,
        hours: [{ label: "Market Hours", time: "7:00 AM - 8:00 PM" }],
        highlights: ["Souvenirs", "Local shopping", "Street food"],
        gallery: [
          IMG.localScene,
          IMG.urban,
          IMG.bayonFaces,
          IMG.angkorThom,
        ],
      }),
    ],
  },
  {
    slug: "sihanoukville",
    name: "Sihanoukville",
    category: "Coastal",
    heroImage: IMG.coastal,
    description:
      "Cambodia's coastal gateway to islands, beaches, and sea views.",
    places: [
      makePlace({
        title: "Otres Beach",
        category: "Beach",
        image: IMG.coastal,
        summary: "A relaxed beach area known for sunsets and laid-back cafes.",
        about: [
          "Otres Beach is a quieter alternative to the busier city center and is popular for long walks and sunsets.",
          "It is a good base for travelers who want a slower coastal pace.",
        ],
        rating: 4.3,
        reviews: 620,
        hours: [{ label: "Beach Access", time: "All day" }],
        highlights: ["Sunset", "Relaxed cafes", "Swimming"],
        gallery: [
          IMG.coastal,
          IMG.nature,
          IMG.countryside,
          IMG.bayonFaces,
        ],
      }),
      makePlace({
        title: "Koh Rong",
        category: "Island",
        image: IMG.coastal,
        summary: "A famous island escape with clear water and white sand.",
        about: [
          "Koh Rong is one of Cambodia's best-known island destinations and is ideal for beach stays and snorkeling.",
          "Ferry access from Sihanoukville makes it a popular weekend getaway.",
        ],
        rating: 4.7,
        reviews: 1030,
        hours: [{ label: "Island Access", time: "Boat schedules vary" }],
        highlights: ["Island hopping", "Snorkeling", "White sand"],
        gallery: [
          IMG.coastal,
          IMG.nature,
          IMG.countryside,
          IMG.localScene,
        ],
      }),
      makePlace({
        title: "Ream National Park",
        category: "Nature",
        image: IMG.nature,
        summary: "Mangroves, wildlife, and quiet nature trails near the coast.",
        about: [
          "Ream National Park is a protected area with mangroves, forest trails, and boat trips.",
          "It is a strong match for travelers who want nature rather than nightlife.",
        ],
        rating: 4.4,
        reviews: 410,
        hours: [{ label: "Park Hours", time: "7:00 AM - 5:00 PM" }],
        highlights: ["Mangroves", "Boats", "Wildlife"],
        gallery: [
          IMG.nature,
          IMG.countryside,
          IMG.coastal,
          IMG.bayonFaces,
        ],
      }),
    ],
  },
  {
    slug: "mondulkiri",
    name: "Mondulkiri",
    category: "Nature",
    heroImage: IMG.nature,
    description:
      "Highland province with rolling hills, waterfalls, and elephant sanctuaries.",
    places: [
      makePlace({
        title: "Bou Sra Waterfall",
        category: "Waterfall",
        image: IMG.nature,
        summary: "A scenic waterfall deep in the eastern highlands.",
        about: [
          "Bou Sra Waterfall is one of Mondulkiri's most popular natural attractions and a favorite day trip.",
          "The surrounding forest and cool air make it a strong escape from the lowlands.",
        ],
        rating: 4.6,
        reviews: 540,
        hours: [{ label: "Waterfall Site", time: "7:00 AM - 6:00 PM" }],
        highlights: ["Waterfall", "Highland air", "Photography"],
        gallery: [
          IMG.nature,
          IMG.countryside,
          IMG.coastal,
          IMG.bayonFaces,
        ],
      }),
      makePlace({
        title: "Elephant Valley Project",
        category: "Wildlife",
        image: IMG.countryside,
        summary: "A sanctuary focused on ethical elephant tourism.",
        about: [
          "The Elephant Valley Project focuses on conservation and responsible wildlife tourism in Mondulkiri.",
          "Visitors can observe elephants in a more natural environment and learn about the sanctuary's mission.",
        ],
        rating: 4.7,
        reviews: 390,
        hours: [{ label: "Sanctuary Visits", time: "Morning tours" }],
        highlights: ["Conservation", "Elephants", "Guided tours"],
        gallery: [
          IMG.countryside,
          IMG.nature,
          IMG.localScene,
          IMG.bayonFaces,
        ],
      }),
      makePlace({
        title: "Sea Forest",
        category: "Nature",
        image: IMG.nature,
        summary: "A calm landscape of hills, forest, and sunrise views.",
        about: [
          "Mondulkiri's forested hills offer some of the most peaceful sunrise scenes in Cambodia.",
          "This is a good stop for hiking and landscape photography.",
        ],
        rating: 4.5,
        reviews: 280,
        hours: [{ label: "Trail Access", time: "Daylight hours" }],
        highlights: ["Hiking", "Sunrise", "Landscapes"],
        gallery: [
          IMG.nature,
          IMG.countryside,
          IMG.localScene,
          IMG.bayonFaces,
        ],
      }),
    ],
  },
  {
    slug: "battambang",
    name: "Battambang",
    category: "Urban",
    heroImage: IMG.localScene,
    description:
      "A cultural city known for architecture, art, and countryside rides.",
    places: [
      makePlace({
        title: "Battambang Riverside",
        category: "Urban",
        image: IMG.localScene,
        summary: "A walkable riverside stretch with cafes and colonial views.",
        about: [
          "Battambang Riverside gives a calm city experience with easy access to the old quarter.",
          "It is a strong base for travelers who want architecture and relaxed city life.",
        ],
        rating: 4.4,
        reviews: 410,
        hours: [{ label: "Riverside Area", time: "All day" }],
        highlights: ["City walk", "Colonial buildings", "Cafes"],
        gallery: [
          IMG.localScene,
          IMG.urban,
          IMG.bayonFaces,
          IMG.countryside,
        ],
      }),
      makePlace({
        title: "Bamboo Train",
        category: "Urban",
        image: IMG.countryside,
        summary: "A classic Battambang activity on a rustic rail platform.",
        about: [
          "The Bamboo Train is one of Battambang's most famous attractions and offers a fun, short ride through the countryside.",
          "It is a classic stop for first-time visitors.",
        ],
        rating: 4.6,
        reviews: 670,
        hours: [{ label: "Ride Hours", time: "Morning - Late Afternoon" }],
        highlights: ["Local experience", "Countryside", "Family friendly"],
        gallery: [
          IMG.countryside,
          IMG.localScene,
          IMG.nature,
          IMG.urban,
        ],
      }),
      makePlace({
        title: "Phnom Sampeau",
        category: "Temple",
        image: IMG.ancientHead,
        summary: "A hilltop temple with views, caves, and sunset scenery.",
        about: [
          "Phnom Sampeau is known for its hilltop views, caves, and temples near Battambang.",
          "Sunset from the summit is one of the most memorable experiences in the province.",
        ],
        rating: 4.7,
        reviews: 520,
        hours: [{ label: "Hill Access", time: "7:00 AM - 6:00 PM" }],
        highlights: ["Sunset", "Caves", "Hill views"],
        gallery: [
          IMG.ancientHead,
          IMG.bayonFaces,
          IMG.angkorThom,
          IMG.localScene,
        ],
      }),
    ],
  },
  {
    slug: "kep",
    name: "Kep",
    category: "Coastal",
    heroImage: IMG.coastal,
    description:
      "A quiet seaside province known for crab, sunsets, and island access.",
    places: [
      makePlace({
        title: "Kep Beach",
        category: "Beach",
        image: IMG.coastal,
        summary: "A relaxed shoreline great for evenings and food walks.",
        about: [
          "Kep Beach is smaller and calmer than the main resort beaches, making it ideal for a relaxed day out.",
          "The food scene, especially seafood, is one of the province's major draws.",
        ],
        rating: 4.4,
        reviews: 390,
        hours: [{ label: "Beach Access", time: "All day" }],
        highlights: ["Seafood", "Sunset", "Relaxed shore"],
        gallery: [
          IMG.coastal,
          IMG.nature,
          IMG.countryside,
          IMG.localScene,
        ],
      }),
      makePlace({
        title: "Kep Crab Market",
        category: "Market",
        image: IMG.localScene,
        summary: "Famous for fresh crab and coastal food stalls.",
        about: [
          "The Crab Market is the food anchor of Kep and a must-visit for seafood lovers.",
          "It is especially known for crab cooked with Kampot pepper.",
        ],
        rating: 4.6,
        reviews: 820,
        hours: [{ label: "Market Hours", time: "Morning - Evening" }],
        highlights: ["Seafood", "Local market", "Kampot pepper crab"],
        gallery: [
          IMG.localScene,
          IMG.coastal,
          IMG.countryside,
          IMG.bayonFaces,
        ],
      }),
      makePlace({
        title: "Rabbit Island",
        category: "Island",
        image: IMG.coastal,
        summary: "A small island getaway off the coast of Kep.",
        about: [
          "Rabbit Island is a simple island escape with quiet beaches and rustic guesthouses.",
          "It is the best match for travelers wanting a low-key overnight trip.",
        ],
        rating: 4.3,
        reviews: 310,
        hours: [{ label: "Boat Trips", time: "Daytime departures" }],
        highlights: ["Island stay", "Quiet beach", "Boat trip"],
        gallery: [
          IMG.coastal,
          IMG.nature,
          IMG.countryside,
          IMG.localScene,
        ],
      }),
    ],
  },
  {
    slug: "preah-vihear",
    name: "Preah Vihear",
    category: "Temple",
    heroImage: IMG.ancientHead,
    description:
      "Remote temple province with cliffside views and heritage sites.",
    places: [
      makePlace({
        title: "Preah Vihear Temple",
        category: "Temple",
        image: IMG.ancientHead,
        summary: "A mountain-top temple with dramatic views over the plains.",
        about: [
          "Preah Vihear Temple sits on a cliff in the Dangrek Mountains and is famous for its dramatic location.",
          "It is one of Cambodia's most important heritage temples and rewards the long journey north.",
        ],
        rating: 4.8,
        reviews: 430,
        hours: [{ label: "Temple Site", time: "7:00 AM - 5:00 PM" }],
        highlights: ["Cliff views", "Heritage site", "Mountain temple"],
        gallery: [
          IMG.ancientHead,
          IMG.bayonFaces,
          IMG.angkorThom,
          IMG.localScene,
        ],
      }),
      makePlace({
        title: "Koh Ker",
        category: "Temple",
        image: IMG.angkorThom,
        summary: "A remote temple complex with a distinctive stepped pyramid.",
        about: [
          "Koh Ker is a less visited but remarkable temple site with a more remote, adventurous feel.",
          "It is a strong choice for travelers interested in archaeology and quieter sites.",
        ],
        rating: 4.6,
        reviews: 260,
        hours: [{ label: "Temple Site", time: "7:00 AM - 5:00 PM" }],
        highlights: ["Pyramid temple", "Remote site", "Photography"],
        gallery: [
          IMG.angkorThom,
          IMG.ancientHead,
          IMG.bayonFaces,
          IMG.localScene,
        ],
      }),
      makePlace({
        title: "Sra Em",
        category: "Nature",
        image: IMG.countryside,
        summary: "A quieter nature area with rural scenery and open skies.",
        about: [
          "The Sra Em area is known for rural landscapes and serves as part of a slower travel route in the province.",
          "It works well for travelers combining temple visits with countryside stops.",
        ],
        rating: 4.2,
        reviews: 150,
        hours: [{ label: "Countryside Access", time: "All day" }],
        highlights: ["Rural scenery", "Open skies", "Travel stop"],
        gallery: [
          IMG.countryside,
          IMG.nature,
          IMG.bayonFaces,
          IMG.angkorThom,
        ],
      }),
    ],
  },
];

export const categoryCatalog = [
  {
    slug: "temples",
    title: "Ancient Temples",
    subtitle: "UNESCO HERITAGE",
    description:
      "Journey through the centuries-old stone corridors of Angkor Wat, Bayon, and the jungle-reclaimed Ta Prohm. Experience the pinnacle of Khmer architecture and spiritual majesty.",
    image: IMG.bayonFaces,
    provinceSlugs: ["siem-reap", "preah-vihear", "battambang"],
  },
  {
    slug: "nature",
    title: "Nature & Wildlife",
    subtitle: "ECO-TOURISM",
    description:
      "From highland waterfalls to mangrove forests and wildlife sanctuaries, discover Cambodia's vibrant biodiversity.",
    image: IMG.nature,
    provinceSlugs: ["mondulkiri", "sihanoukville", "preah-vihear"],
  },
  {
    slug: "coastal",
    title: "Coastal Escapes",
    subtitle: "ISLAND GETAWAYS",
    description:
      "Pristine sands, island ferries, relaxed seaside towns, and fresh seafood await along Cambodia's coast.",
    image: IMG.coastal,
    provinceSlugs: ["sihanoukville", "kep"],
  },
  {
    slug: "culture",
    title: "Cultural Immersion",
    subtitle: "LIVING TRADITIONS",
    description:
      "Connect with Cambodia's living traditions through markets, architecture, performances, and local communities.",
    image: IMG.localScene,
    provinceSlugs: ["siem-reap", "battambang", "kep"],
  },
  {
    slug: "gastronomy",
    title: "Gastronomy",
    subtitle: "CULINARY DELIGHTS",
    description:
      "Taste Cambodia from street food markets to famous seafood stalls and regional specialties.",
    image: IMG.urban,
    provinceSlugs: ["siem-reap", "kep", "battambang"],
  },
  {
    slug: "adventure",
    title: "Adventure",
    subtitle: "THRILL SEEKERS",
    description:
      "Trek, kayak, climb, and explore Cambodia's more active side through hills, trails, islands, and outdoor escapes.",
    image: IMG.countryside,
    provinceSlugs: ["mondulkiri", "sihanoukville", "preah-vihear"],
  },
];

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

export const getCategoryBySlug = (categorySlug) =>
  categoryCatalog.find((category) => category.slug === categorySlug) || null;

export const getDefaultCategory = () => categoryCatalog[0] || null;

export const getAllPlaces = () =>
  provinceCatalog.flatMap((province) =>
    province.places.map((place) => ({
      ...place,
      provinceName: province.name,
      provinceSlug: province.slug,
    })),
  );

export const getPlacesByCategorySlug = (categorySlug) => {
  const category = getCategoryBySlug(categorySlug);
  const allPlaces = getAllPlaces();

  if (!category) return [];

  if (category.slug === "temples") {
    return allPlaces.filter((place) =>
      ["temple"].includes(normalizeText(place.category)),
    );
  }

  if (category.slug === "nature") {
    return allPlaces.filter((place) =>
      ["nature", "wildlife", "waterfall"].includes(
        normalizeText(place.category),
      ),
    );
  }

  if (category.slug === "coastal") {
    return allPlaces.filter((place) =>
      ["beach", "island"].includes(normalizeText(place.category)),
    );
  }

  if (category.slug === "culture") {
    return allPlaces.filter((place) =>
      ["temple", "urban", "market"].includes(normalizeText(place.category)),
    );
  }

  if (category.slug === "gastronomy") {
    return allPlaces.filter((place) =>
      ["market", "urban", "beach"].includes(normalizeText(place.category)),
    );
  }

  if (category.slug === "adventure") {
    return allPlaces.filter((place) =>
      ["nature", "wildlife", "waterfall", "island"].includes(
        normalizeText(place.category),
      ),
    );
  }

  return allPlaces;
};

export const getProvinceBySlug = (provinceSlug) =>
  provinceCatalog.find((province) => province.slug === provinceSlug) || null;

export const getPlaceBySlug = (provinceSlug, placeSlug) => {
  const province = provinceSlug ? getProvinceBySlug(provinceSlug) : null;

  if (province) {
    return province.places.find((place) => place.slug === placeSlug) || null;
  }

  for (const currentProvince of provinceCatalog) {
    const match = currentProvince.places.find(
      (place) => place.slug === placeSlug,
    );
    if (match) {
      return match;
    }
  }

  return null;
};

export const getDefaultProvince = () => provinceCatalog[0];

export const getDefaultPlace = () => provinceCatalog[0]?.places[0] || null;
