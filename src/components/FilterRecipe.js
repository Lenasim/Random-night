import React, { Component } from 'react';
import axios from 'axios'

import './FilterRecipe.css'

class FilterRecipe extends Component {
  state = {
    category: [],
    ingredient: [],
    areas: [],
    mealCat: 'all',
    mealIngr: 'all',
    mealAreas: 'all'
  }

  getList = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then(resCat => this.setState({ category: resCat.data.meals.map(cat => cat.strCategory) }));
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then(resIngr => this.setState({ ingredient: resIngr.data.meals.map(ingr => ingr.strIngredient) }));
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(resArea => this.setState({ areas: resArea.data.meals.map(ar => ar.strArea) }));
  }

  componentDidMount = () => {
    this.getList();
  }

  filterCategory = (name, value) => {
    this.setState({ [name]: value });
    this.props.handleCategoryChange(name, value);
  }

  render() {
    const { category, ingredient, areas } = this.state
    return (
      <div id="recipe" className="FilterRecipe">
        <select name="mealCat" id="recipe-categories" value={this.state.mealCat} onChange={(event) => this.filterCategory('mealCat', event.target.value)}>
          <option className="option" value="categorie">Catégories</option>
          {category.map((cat, id) => <option key={id}>{cat}</option>)}
        </select>
        <select name="mealIngr" id="recipe-ingredients" value={this.state.mealIngr} onChange={(event) => this.filterCategory('mealIngr', event.target.value)}>
          <option className="option" value="Ingrédients">Ingrédients</option>
          {ingredient.map((ingr, id) => <option key={id}>{ingr}</option>)}
        </select>
        <select name="mealAreas" id="recipe-countries" value={this.state.mealAreas} onChange={(event) => this.filterCategory('mealAreas', event.target.value)}>
          <option className="option" value="country">Pays</option>
          {areas.map((area, id) => <option key={id}>{area}</option>)}
        </select>
      </div>
    );
  }
}

export default FilterRecipe;