import React, { useState, useEffect } from "react";
import CollegeCard from "../../../molecules/group1/Collages/CollegeCard";
import FilterBar from "../../../molecules/group1/Collages/FilterBar";
import collegesData from "../../../../data/colleges.json";
import '../../../styles/group1/Collages/Collages.css'

function CollagesSection() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    if (!Array.isArray(collegesData)) return;

    const results = collegesData.filter((college) => {
      const matchesSearch = college.name?.toLowerCase().includes(search.toLowerCase());
      const matchesCity = city ? college.location === city : true;
      const matchesType = type ? college.type === type : true;
      const matchesPrice =
        price === "low"
          ? college.price <= 2500
          : price === "mid"
          ? college.price > 2500 && college.price <= 3500
          : price === "high"
          ? college.price > 3500
          : true;

      return matchesSearch && matchesCity && matchesType && matchesPrice;
    });

    setFilteredColleges(results);
  }, [search, city, type, price]);

  return (
    <div className="collages-section">
      <h2>Kolegjet</h2>
      <p className="paragraph-collage">Zbulo 6+ kolegje dhe universitete në Kosovë</p>
      <FilterBar
        search={search}
        setSearch={setSearch}
        city={city}
        setCity={setCity}
        type={type}
        setType={setType}
        price={price}
        setPrice={setPrice}
      />
      <div className="cards-container">
        {Array.isArray(filteredColleges) && filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))
        ) : (
          <p>Nuk u gjet asnjë kolegj me kriteret e zgjedhura.</p>
        )}
      </div>
    </div>
  );
}

export default CollagesSection;
