import React from 'react';

import './FilterButtons.css'

const FilterButtons = ({ handleChange, activeId }) => {
  return (
    <div className="FilterButtons">
      <button
        id="drink"
        onClick={handleChange}
        className={activeId === "drink" ? "active" : ""}
      >
        Ta boisson
      </button>
      <button
        id="movie"
        onClick={handleChange}
        className={activeId === "movie" ? "active" : ""}
      >
        Ton film
      </button>
      <button
        id="recipe"
        onClick={handleChange}
        className={activeId === "recipe" ? "active" : ""}
      >
        Ta recette
      </button>
    </div>
  );
};

export default FilterButtons;