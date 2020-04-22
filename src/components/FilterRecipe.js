import React, { Component } from 'react';

import './FilterRecipe.css'
class FilterRecipe extends Component {
  render() {
    return (
      <div id="recipe" className="FilterRecipe">
        <select name="categories" id="recipe-categories">
          <option className="option" value="categorie">Catégories</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary recipe">Ordinary recipe</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <select name="ingredients" id="recipe-ingredients">
          <option className="option" value="Ingrédients">Ingrédients</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary recipe">Ordinary recipe</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <select name="countries" id="recipe-countries">
          <option className="option" value="country">Pays</option>
          <option className="option" value="Cocktail">Cocktail</option>
          <option className="option" value="Milk / Float / Shake">Milk / Float / Shake</option>
          <option className="option" value="Ordinary recipe">Ordinary recipe</option>
          <option className="option" value="Cocoa">Cocoa</option>
        </select>
        <button className="form-btn">Chercher</button>
      </div>
    );
  }
}

export default FilterRecipe;