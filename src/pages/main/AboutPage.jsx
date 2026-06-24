import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const values = [
    {
      title: "Verified Historical Authenticity",
      description:
        "We collaborate directly with local historians, archaeologists, and regional curators to ensure that every story and temple guide we present is rich, respectful, and historically accurate.",
    },
    {
      title: "Empowering Local Communities",
      description:
        "Over 60% of our network partners are local family-run homestays, indigenous guides in eco-tourism zones, and traditional artisan collectives, ensuring tourism directly benefits Cambodian families.",
    },
    {
      title: "Mindful & Slow Footprints",
      description:
        "We advocate for slow travel, carbon-conscious choices, reduced plastic footprints, and deep respect for sacred pagoda grounds to keep Cambodia's cultural heritage pristine.",
    },
  ];

  const team = [
    {
      name: "Ea Bunleang",
      role: "Database Architect",
      image: "/images/team/bunleang.jpg",
      description:
        "Database Architect building the data foundation and managing SQL Server. Structured the Django models, implemented query indexes for fast search, and established automated backup routines.",
      quote: "Structuring the Data Foundation",
    },
    {
      name: "Mon Makara",
      role: "UI/UX & Layout Specialist",
      image: "/images/team/makara.jpg",
      description:
        "Frontend UI/UX Specialist translating Figma to React. Led the build of global Navigation, Footer, responsive Place Details, Browse views, and the day-by-day Itinerary timeline.",
      quote: "Figma to Responsive React",
    },
    {
      name: "Heng Pengly",
      role: "Logic & API Specialist",
      image: "/images/team/pengly.jpg",
      description:
        "Logic & API Integration Specialist connecting the UI to the backend. Managed React Router navigation, API integration (Search, Browsing, Auth), and secure authentication tokens.",
      quote: "Bringing Interfaces to Life",
    },
    {
      name: "Heng Hour",
      role: "Security & Auth Specialist",
      image: "/images/team/hour.jpg",
      description:
        "Security & Auth Specialist securing the application and managing user identities. Implemented Django user authentication endpoints, email OTP verification flows, and role-based Super Admin panels.",
      quote: "Securing Digital Identities",
    },
    {
      name: "Heng Sengthay",
      role: "Core API Developer",
      image: "/images/team/sengthay.jpg",
      description:
        "Core API Developer building the REST endpoints that power the application. Designed Django serializers and views for destination browsing, search engine query filters, and itinerary CRUD logic.",
      quote: "Engineering High-Performance APIs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans pb-16 text-gray-800 pt-24">
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full bg-gray-900 overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src="/images/historic-statues-angkor-thom-siem-reap-cambodia.jpg"
            alt="Angkor Thom statues — Siem Reap"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 tracking-tight">
            About Us
          </h1>
          <p className="text-gray-200 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
            Our mission is to help travelers discover the true soul of Cambodia,
            connecting ancient monuments with modern cultural experiences.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* 2. Intro Split Layout */}
        <section className="bg-white rounded-[1.5rem] border border-gray-200 p-6 sm:p-10 shadow-[0_12px_30px_rgba(15,23,42,0.07)] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#009B3E] font-bold text-xs uppercase tracking-wider mb-2">
                Our Journey & Vision
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                A Love Letter to the Kingdom of Wonder
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Travel Cambodia was founded not just to list destinations, but to celebrate the history, people, and pristine landscapes of this beautiful country. We believe that true travel is about building bridges.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you are exploring the colossal stone faces of Bayon, cruising through the quiet mangroves of Koh Kong, or relaxing along the southern coastline, our curated guides help you explore Cambodia with respect and curiosity.
              </p>
            </div>
            
            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src="/images/bayon-temple-with-giant-stone-faces-angkor-wat-siem-reap-cambodia.jpg"
                alt="Bayon Temple face"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 3. Value Pillars */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val) => (
              <article
                key={val.title}
                className="bg-white rounded-[1.5rem] border border-gray-200 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="w-10 h-10 bg-[#e6f7ec] text-[#009B3E] rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                  ✓
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-sm leading-6">
                  {val.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Travel Trust Stats Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-[2rem] p-8 md:p-10 text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-1">120+</p>
              <p className="text-green-150 text-xs font-medium">Sacred Sites Mapped</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-1">45+</p>
              <p className="text-green-150 text-xs font-medium">Local Community Partners</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-1">15k+</p>
              <p className="text-green-150 text-xs font-medium">Custom Journeys Made</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-1">100%</p>
              <p className="text-green-150 text-xs font-medium">Authentic & Vetted</p>
            </div>
          </div>
        </section>

        {/* 5. Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left">
            Meet the Cultural Guardians
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-[1.5rem] border border-gray-200 overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.06)] group hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)] transition-all duration-300 flex flex-col text-center"
              >
                {/* Visual Header card */}
                <div className="bg-gradient-to-r from-green-600/10 to-green-700/10 h-28 flex items-center justify-center p-4 border-b border-gray-100 relative">
                  <span className="text-[#009B3E] font-semibold text-xs italic opacity-85">
                    "{member.quote}"
                  </span>
                </div>

                {/* Overlapping Avatar Area */}
                <div className="flex justify-center -mt-10 relative z-10">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#e6f7ec] flex items-center justify-center text-[#009B3E] font-black text-lg relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      className="w-full h-full object-cover"
                    />
                    {/* Soft Initial Fallback (EB, MM, HP, HH, HS) */}
                    <span className="absolute inset-0 flex items-center justify-center bg-[#e6f7ec] text-[#009B3E] font-bold text-base select-none -z-10">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 pt-3 flex-grow flex flex-col">
                  <p className="text-[#009B3E] font-bold text-[10px] uppercase tracking-wider mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-bold text-gray-900 text-base mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-grow">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Final CTA */}
        <section className="pt-4">
          <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-[0_12px_30px_rgba(15,23,42,0.06)] text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ready to discover Cambodia?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start building your custom travel plan, pinning local wonders, and saving
              your favorite province coordinates today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/itinerary"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Create Itinerary
              </Link>
              <Link
                to="/destinations"
                className="bg-white text-[#009B3E] border border-green-300 hover:bg-green-50 text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Explore Places
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutPage;
