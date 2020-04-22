import React, { Component } from 'react';
import axios from 'axios'

import './FilterRecipe.css'

class FilterRecipe extends Component {
  state = {
    categories: [],
    ingredients: [],
    areas: []
  }

  getList = () => {
    axios.all([
      axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
      axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list'),
      axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    ])
      .then(axios.spread((resCat, resIngr, resArea) => {
        this.setState({
          categories: resCat.data.meals.map(cat => cat.strCategory),
          ingredients: resIngr.data.meals.map(ingr => ingr.strIngredient),
          areas: resArea.data.meals.map(ar => ar.strArea)
        })
      }))
  }

  componentDidMount = () => {
    this.getList()
  }

  render() {
    const { categories, ingredients, areas } = this.state
    return (
      <div id="recipe" className="FilterRecipe">
        <select name="categories" id="recipe-categories">
          <option className="option" value="categorie">Catégories</option>
          {categories.map((cat, id) => <option key={id}>{cat}</option>)}
        </select>
        <select name="ingredients" id="recipe-ingredients">
          <option className="option" value="Ingrédients">Ingrédients</option>
          {ingredients.map((ingr, id) => <option key={id}>{ingr}</option>)}
        </select>
        <select name="countries" id="recipe-countries">
          <option className="option" value="country">Pays</option>
          {areas.map((area, id) => <option key={id}>{area}</option>)}
        </select>
        <button className="form-btn">Chercher</button>
      </div>
    );
  }
}

export default FilterRecipe;