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
        Your Cocktail
      </button>
      <button
        id="movie"
        onClick={handleChange}
        className={activeId === "movie" ? "active" : ""}
      >
        Your Movie
      </button>
      <button
        id="recipe"
        onClick={handleChange}
        className={activeId === "recipe" ? "active" : ""}
      >
        Your Recipe
      </button>
    </div>
  );
};

export default FilterButtons;