import React from "react";
import '../../styles/group1/Collages/Collages.css'

function FilterBar({ search, setSearch, city, setCity, type, setType, price, setPrice }) {
  return (
    <div className="filter-bar">
       <div className="search-icon">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
      <input
        type="text"
        placeholder="Kërko kolegje..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
       </div>
      <div className="select-inp">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Të gjitha qytetet</option>
        <option value="Prishtinë">Prishtinë</option>
        <option value="Mitrovicë">Mitrovicë</option>
        <option value="Gjilan">Gjilan</option>
        <option value="Prizren">Prizren</option>
        <option value="Gjakovë">Gjakovë</option>
        <option value="Pejë">Pejë</option>
        <option value="Ferizaj">Ferizaj</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Të gjitha llojet</option>
        <option value="Public">Publik</option>
        <option value="Private">Privat</option>
      </select>
      <select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value="">Të gjitha çmimet</option>
        <option value="low">deri në €2500</option>
        <option value="mid">€2500 - €3500</option>
        <option value="high">mbi €3500</option>
      </select>
      </div>
    </div>
  );
}

export default FilterBar;
