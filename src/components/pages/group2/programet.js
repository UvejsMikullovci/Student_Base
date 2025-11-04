import React, { useState } from "react";
import programet from "./programet.json";
import { FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./programet.css";

function Programet({ showOnlyCards = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldFilter, setFieldFilter] = useState("Të gjitha fushat");
  const [durationFilter, setDurationFilter] = useState("Të gjitha");
  const [levelFilter, setLevelFilter] = useState("Të gjitha nivelet");
  const [activeCategory, setActiveCategory] = useState("Të gjitha");

  const categories = [
    "Të gjitha",
    "IT",
    "Biznes",
    "Shëndetësi",
    "Inxhinieri",
    "Sociale",
    "Arkitekturë",
  ];

  const handleReset = () => {
    setSearchTerm("");
    setFieldFilter("Të gjitha fushat");
    setDurationFilter("Të gjitha");
    setLevelFilter("Të gjitha nivelet");
    setActiveCategory("Të gjitha");
  };

  const filteredPrograms = programet.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = fieldFilter === "Të gjitha fushat" || card.category === fieldFilter;
    const matchesDuration = durationFilter === "Të gjitha" || card.duration === durationFilter;
    const matchesLevel = levelFilter === "Të gjitha nivelet" || card.degree === levelFilter;
    const matchesCategory = activeCategory === "Të gjitha" || card.category === activeCategory;

    return matchesSearch && matchesField && matchesDuration && matchesLevel && matchesCategory;
  });

  // Vendos slider settingsnpm start
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  // Vetëm 3 karta në HomePage
  const cardsToShow = showOnlyCards ? filteredPrograms.slice(0, 3) : filteredPrograms;

  return (
    <div className="Programet">
      {!showOnlyCards && (
        <>
          <div className="baner">
            <h1>Programet e Studimit</h1>
            <p>Zbulo programe akademike në universitete të Kosovës</p>

            <div className="searchInput">
              <FaSearch />
              <input
                type="text"
                placeholder="Kërko programe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="dropDown">
            <select value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)}>
              <option value="Të gjitha fushat">Të gjitha fushat</option>
              <option value="IT">IT</option>
              <option value="Biznes">Biznes</option>
              <option value="Shëndetësi">Shëndetësi</option>
              <option value="Inxhinieri">Inxhinieri</option>
              <option value="Shkenca Sociale">Shkenca Sociale</option>
              <option value="Arkitekturë">Arkitekturë</option>
            </select>

            <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}>
              <option value="Të gjitha">Të gjitha</option>
              <option value="3 vjet">3 vjet</option>
              <option value="4 vjet">4 vjet</option>
              <option value="5 vjet">5 vjet</option>
              <option value="6 vjet">6 vjet</option>
            </select>

            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="Të gjitha nivelet">Të gjitha nivelet</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master Profesional">Master Profesional</option>
              <option value="Doktoraturë">Doktoraturë</option>
            </select>

            <button className="resetButton" onClick={handleReset}>
              Rivendos filtrat
            </button>
          </div>

          <div className="category-bar">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`category-item ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Slider për HomePage */}
      {showOnlyCards ? (
        <Slider {...sliderSettings}>
          {cardsToShow.map((card) => (
            <div key={card.id} className="card">
              <h2>{card.title}</h2>
              <p className="category">{card.category} - {card.university}</p>
              <p className="description">{card.description}</p>
              <p className="details">{card.duration} | {card.degree}</p>
              <button>{card.buttonText}</button>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="cards-container">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((card) => (
              <div key={card.id} className="card">
                <h2>{card.title}</h2>
                <p className="category">{card.category} - {card.university}</p>
                <p className="description">{card.description}</p>
                <p className="details">{card.duration} | {card.degree}</p>
                <button>{card.buttonText}</button>
              </div>
            ))
          ) : (
            <p className="no-results">Asnjë program nuk u gjet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Programet;
