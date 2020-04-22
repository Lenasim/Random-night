import React, { Component } from 'react';

import './FilterMovie.css'
class FilterMovie extends Component {
  render() {
    return (
      <div id="movie" className="FilterMovie">
        <select name="genres" id="movie-genres">
          <option className="option" value="genre">Genres</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary Drink">Ordinary Drink</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <select name="languages" id="movie-languages">
          <option className="option" value="language">Langue</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary Drink">Ordinary Drink</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <div className="checkbox">
          <div className="checkbox-group">
            <input className="checkbox-box" type="checkbox" id="all" />
            <label className="checkbox-item" htmlFor="all">Tous publics</label>
          </div>
          <div className="checkbox-group">
            <input className="checkbox-box" type="checkbox" id="adult" />
            <label className="checkbox-item" htmlFor="adult">Pour les grands</label>
          </div>
        </div>
        <button className="form-btn">Chercher</button>
      </div>
    );
  }
}

export default FilterMovie;