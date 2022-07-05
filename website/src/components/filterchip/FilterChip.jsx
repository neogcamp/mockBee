import React from "react";
import "./FilterChip.css";

function FilterChip({ filter }) {
  return (
    <div className="filter-chip-wrapper">
      <p className="filter-chip-text">{filter.name}</p>
      <span
        style={{ backgroundColor: filter.color }}
        className="filter-chip-icon"
      ></span>
    </div>
  );
}

export default FilterChip;
