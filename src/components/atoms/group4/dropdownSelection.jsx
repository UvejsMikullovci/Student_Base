import { useState } from "react";
import "./dropdownSelection.css";

export default function Dropdown({ label, options, onChange }) {

  const [selected, setSelected] = useState(options[0]?.value || "");

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <label>
        {label}:{" "}
        <select value={selected} onChange={handleChange} className="custom-select">
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
