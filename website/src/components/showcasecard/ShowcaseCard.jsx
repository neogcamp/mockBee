import React from "react";
import CardFilterChip from "../cardfilterchip/CardFilterChip";
import Image from "@theme/IdealImage";
import { filters } from "../../data/filters";
import "./ShowcaseCard.css";

function ShowcaseCards({ user }) {
  return (
    <div className="showcase-card-wrapper">
      <Image
        img={user.preview}
        alt={user.title}
        className="showcase-card-thumbnail"
      />
      <div className="showcase-card-header">
        <h4 className="showcase-card-heading">{user.title}</h4>
        <div>
          <span className="showcase-card-icon">Heart Icon</span>
          <button className="source-btn">Source</button>
        </div>
      </div>
      <p className="showcase-card-desc">{user.description}</p>
      <div className="showcase-card-footer">
        {filters.map((filter) => (
          <CardFilterChip key={filter.id} filter={filter} />
        ))}
      </div>
    </div>
  );
}

export default ShowcaseCards;
