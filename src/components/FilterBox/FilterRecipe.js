import React, { Component } from 'react';
import axios from 'axios'

import './FilterRecipe.css'

class FilterRecipe extends Component {
  state = {
    category: [],
    areas: [],
  }

  getList = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then(resCat => this.setState({
        category: resCat.data.meals.map(cat => cat.strCategory)
      }));
    axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(resArea => this.setState({
        areas: resArea.data.meals.map(ar => ar.strArea)
      }));
  }

  filterCategory = (name, value) => {
    this.setState({ [name]: value });
    this.props.handleCategoryChange(name, value);
  }

  componentDidMount = () => {
    this.getList();
  }

  render() {
    const { category, areas } = this.state
    return (
      <div id="recipe" className="FilterRecipe">
        <select
          name="mealCat"
          id="recipe-categories"
          value={this.props.cat}
          onChange={event => this.filterCategory('mealCat', event.target.value)}
        >
          <option
            className="option"
            value="categorie"
          >
            Categories
          </option>
          {
            category.map((cat, id) =>
              <option key={id}>{cat}</option>)
          }
        </select>
        <select
          name="mealAreas"
          id="recipe-countries"
          value={this.props.area}
          onChange={event => this.filterCategory('mealAreas', event.target.value)}
        >
          <option
            className="option"
            value="country"
          >
            Country
          </option>
          {
            areas.map((area, id) =>
              <option key={id}>{area}</option>)
          }
        </select>
      </div>
    );
  }
}

export default FilterRecipe;