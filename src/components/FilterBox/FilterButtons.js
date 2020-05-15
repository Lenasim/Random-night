import React from 'react';

import './FilterButtons.css'

const FilterButtons = ({ handleChange, activeId, filter, reset, close }) => {
  return (
    <div className="FilterButtons">
      <button
        id="drink"
        onClick={handleChange}
        className={activeId === "drink" ? "active" : ""}
      >
        Your Drink
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
      {
        filter &&
        <div className='button-filter-box'>
          <button
            className="button-filter-menu"
            onClick={reset}>
            <i className="fas fa-undo-alt"></i>
          </button>
          <button
            className="button-filter-menu"
            onClick={close}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      }
    </div>
  );
};

export default FilterButtons;