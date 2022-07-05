import React from "react";
import "./CardFilterChip.css";

function CardFilterChip({ filter }) {
  return (
    <div className="card-filter-chip-wrapper">
      <p className="card-filter-chip-text">{filter.name}</p>
      <span
        style={{ backgroundColor: filter.color }}
        className="card-filter-chip-icon"
      ></span>
    </div>
  );
}

export default CardFilterChip;
