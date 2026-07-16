import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  getFeaturedPlaces,
  getProvinces,
} from "../../services/modules/travelApi";

const HERO_SLIDES = [
  {
    src: "/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg",
    alt: "Angkor Thom statues — Siem Reap",
    headline: "Discover Cambodia's",
    highlight: "Hidden Gems",
    subtitle: "Plan your perfect journey through ancient temples and breathtaking landscapes.",
  },
  {
    src: "/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg",
    alt: "Bayon Temple stone faces — Angkor Wat",
    headline: "Explore the",
    highlight: "Ancient Temples",
    subtitle: "Walk through centuries-old stone corridors of Angkor Wat and Bayon.",
  },
  {
    src: "/images/ancient-head-temple-cambodia.jpg",
    alt: "Ancient temple ruins — Cambodia",
    headline: "Experience",
    highlight: "Living History",
    subtitle: "Uncover the rich heritage and spiritual majesty of Khmer civilization.",
  },
];

const SLIDE_INTERVAL_MS = 5000;

const HomePage = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const autoPlayRef = useRef(null);

  const goToSlide = useCallback((index) => {
    if (isFading) return;
    setIsFading(true);
    setPrevSlide(activeSlide);
    setTimeout(() => {
      setActiveSlide(index);
      setPrevSlide(null);
      setIsFading(false);
    }, 600);
  }, [activeSlide, isFading]);

  const goNext = useCallback(() => {
    goToSlide((activeSlide + 1) % HERO_SLIDES.length);
  }, [activeSlide, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [activeSlide, goToSlide]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goNext, SLIDE_INTERVAL_MS);
  }, [goNext]);

  useEffect(() => {
    autoPlayRef.current = setInterval(goNext, SLIDE_INTERVAL_MS);
    return () => clearInterval(autoPlayRef.current);
  }, [goNext]);

  const handleDotClick = (index) => {
    if (index === activeSlide) return;
    goToSlide(index);
    resetAutoPlay();
  };

  const handleArrow = (direction) => {
    direction === "next" ? goNext() : goPrev();
    resetAutoPlay();
  };

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const [featured, categoryList, provinceList] = await Promise.all([
          getFeaturedPlaces(6),
          getCategories(),
          getProvinces(),
        ]);

        if (!isMounted) return;

        setFeaturedPlaces(Array.isArray(featured) ? featured : []);
        setCategories(Array.isArray(categoryList) ? categoryList : []);
        setProvinces(Array.isArray(provinceList) ? provinceList : []);
      } catch (error) {
        if (!isMounted) return;
        setErrorMessage(error?.message || "Failed to load home data.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredCategories = categories.slice(0, 4);
  const featuredProvinces = provinces.slice(0, 4);

  const whyTravelCards = [
    {
      title: "Verified Destination Info",
      description:
        "Each destination page includes highlights, opening hours, and concise summaries.",
    },
    {
      title: "Smart Route Navigation",
      description:
        "Move from province to places to details with back navigation that stays meaningful.",
    },
    {
      title: "Category-First Discovery",
      description:
        "Explore by temples, nature, coast, and more to match your travel style fast.",
    },
  ];

  const stats = useMemo(() => {
    const placesCount = provinces.reduce(
      (total, province) => total + (province.places?.length || 0),
      0,
    );

    return [
      { label: "Provinces Covered", value: provinces.length },
      { label: "Places To Explore", value: placesCount },
      { label: "Travel Categories", value: categories.length },
    ];
  }, [categories.length, provinces]);

  const steps = [
    {
      title: "Choose a Province",
      description:
        "Start from a province and discover the best attractions there.",
      to: "/locations",
      cta: "Go to Locations",
    },
    {
      title: "Browse a Category",
      description:
        "Pick your travel mood like temples, nature, coastal, or food.",
      to: "/categories",
      cta: "Browse Categories",
    },
    {
      title: "Open Place Details",
      description:
        "View ratings, highlights, and gallery before you plan your visit.",
      to: `/details/${featuredPlaces[0]?.provinceSlug || "siem-reap"}/${featuredPlaces[0]?.slug || "angkor-wat"}`,
      cta: "See Sample Details",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-16 text-gray-800">
      {/* 1. Hero Slideshow */}
      <section className="relative h-[65vh] md:h-[75vh] w-full bg-gray-900 overflow-hidden">

        {/* Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: index === activeSlide ? 1 : 0,
              zIndex: index === activeSlide ? 1 : 0,
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Text overlay — animates per slide */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div
            key={activeSlide}
            style={{ animation: "heroFadeUp 0.7s ease both" }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 tracking-tight drop-shadow-lg">
              {HERO_SLIDES[activeSlide].headline}
              <br />
              <span className="text-green-400">{HERO_SLIDES[activeSlide].highlight}</span>
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-10 max-w-2xl font-medium drop-shadow">
              {HERO_SLIDES[activeSlide].subtitle}
            </p>
          </div>

          <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/locations"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-3 px-6 rounded-xl shadow-sm transition-all duration-300"
            >
              Explore Locations
            </Link>
            <Link
              to="/categories"
              className="bg-white/95 text-[#009B3E] border border-green-300 hover:bg-white text-sm font-semibold py-3 px-6 rounded-xl shadow-sm transition-all duration-300"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => handleArrow("prev")}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-sm transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => handleArrow("next")}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-sm transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-6 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Inline keyframe for text fade-up animation */}
        <style>{`
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* 2. Featured Places */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {errorMessage ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 font-medium">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mb-8 bg-white rounded-[1.5rem] border border-gray-200 p-8 text-center text-gray-500 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            Loading home content...
          </div>
        ) : null}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Places</h2>
          <Link
            to="/destinations"
            className="text-[#009B3E] text-sm font-bold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {featuredPlaces.map((place) => (
            <div
              key={`${place.provinceSlug}-${place.slug}`}
              className="bg-white rounded-[1.5rem] shadow-[0_12px_30px_rgba(15,23,42,0.07)] border border-gray-200 overflow-hidden group hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {place.title}
                </h3>
                <p className="text-gray-500 text-sm mb-1">
                  {place.provinceName}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {place.summary}
                </p>
                <Link
                  to={`/details/${place.provinceSlug}/${place.slug}`}
                  className="inline-flex w-full items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Browse By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <Link
            to="/categories"
            className="text-[#009B3E] text-sm font-bold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCategories.map((category) => (
            <Link
              to={`/categories/${category.slug}`}
              key={category.slug}
              className="relative h-64 rounded-[1.5rem] overflow-hidden border-2 border-gray-200 group cursor-pointer shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/90 mb-2">
                  {category.subtitle}
                </p>
              </div>

              <div className="absolute bottom-5 left-0 right-0 text-center">
                <h3 className="text-white font-bold text-lg tracking-wide shadow-sm">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Why Travel With Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Why Travel With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyTravelCards.map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-[1.5rem] border border-gray-200 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Popular Provinces */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Popular Provinces
          </h2>
          <Link
            to="/locations"
            className="text-[#009B3E] text-sm font-bold hover:underline"
          >
            Explore All Provinces
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProvinces.map((province) => (
            <Link
              key={province.slug}
              to={`/destinations/${province.slug}`}
              className="rounded-[1.5rem] overflow-hidden border border-gray-200 bg-white group shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <img
                src={province.heroImage}
                alt={province.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">
                  {province.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {province.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="bg-white rounded-[1.5rem] border border-gray-200 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <p className="text-[#009B3E] font-bold text-sm mb-2">
                Step {index + 1}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-6">
                {step.description}
              </p>
              <Link
                to={step.to}
                className="inline-flex items-center text-[#009B3E] font-semibold text-sm hover:underline"
              >
                {step.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Travel Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-[2rem] p-8 md:p-10 text-white grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div key={item.label} className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-bold mb-2">
                {item.value}+
              </p>
              <p className="text-green-50 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-[0_12px_30px_rgba(15,23,42,0.06)] text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Ready to plan your next Cambodia trip?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start with destinations, compare categories, and open details pages
            for the places that match your style.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/destinations"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Start Exploring
            </Link>
            <Link
              to="/contact"
              className="bg-white text-[#009B3E] border border-green-300 hover:bg-green-50 text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
