import React, { Component } from 'react';

import './FilterRecipe.css'
class FilterRecipe extends Component {
  render() {
    return (
      <div id="recipe" className="FilterRecipe">
        <select name="categories" id="drink-categories">
          <option className="option" value="Catégories">Catégories</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary Drink">Ordinary Drink</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <select name="ingrédients" id="drink-ingrédients">
          <option className="option" value="Ingrédients">Ingrédients</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary Drink">Ordinary Drink</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <div className="checkbox">
          <div className="checkbox-group">
            <input className="checkbox-box" type="checkbox" id="alcool" />
            <label className="checkbox-item" htmlFor="alcool">Avec alcool</label>
          </div>
          <div className="checkbox-group">
            <input className="checkbox-box" type="checkbox" id="soft" />
            <label className="checkbox-item" htmlFor="soft">Sans alcool</label>
          </div>
        </div>
        <button className="form-btn">Chercher</button>
      </div>
    );
  }
}

export default FilterRecipe;