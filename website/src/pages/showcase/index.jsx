import React from "react";
import Translate from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import { users } from "../../data/users";
import ShowcaseCard from "../../components/ShowcaseCard/ShowcaseCard";
import "./showcase.css";
import FilterChip from "../../components/FilterChip/FilterChip";

const filters = [
  {
    id: 1,
    name: "Favourite",
    color: "pink",
  },
  {
    id: 2,
    name: "Open Source",
    color: "red",
  },
  {
    id: 3,
    name: "Product",
    color: "green",
  },
  {
    id: 4,
    name: "Design",
    color: "blue",
  },
];

const ShowcaseHeader = () => {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>Mockbee Showcase</h1>
      <p>List of projetcs people are building with Mockbee</p>
      <a
        className="button button--primary"
        href="#"
        target="_blank"
        rel="noreferrer"
      >
        <Translate id="showcase.header.button">
          🙏 Please add your site
        </Translate>
      </a>
    </section>
  );
};

function ShowcaseFilters() {
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className="margin-bottom--sm">
        <div>
          <h2>
            <Translate id="showcase.filters.title">Filters</Translate>
          </h2>
        </div>
      </div>
      <ul className="clean-list filter-container">
        {filters.map((filter) => (
          <FilterChip key={filter.id} filter={filter} />
        ))}
      </ul>
    </section>
  );
}

function ShowcaseCards() {
  return (
    <div className="showcase-cards-container container margin-top--l margin-bottom--lg">
      {users.map((user) => (
        <ShowcaseCard key={user.id} user={user} />
      ))}
    </div>
  );
}

const Showcase = () => {
  return (
    <Layout
      title={`Showcase`}
      description="Description will go into a meta tag in <head />"
    >
      <ShowcaseHeader />
      <ShowcaseFilters />
      <ShowcaseCards />
    </Layout>
  );
};

export default Showcase;
