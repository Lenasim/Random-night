import React, { Component } from 'react';
import axios from 'axios'

import './FilterDrink.css'

class FilterDrink extends Component {
  state = {
    categories: [],
    isAlcohol: "all"
  }

  getCategoriesDrink = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(res => this.setState({
        categories: res.data.drinks.map(c => c.strCategory)
      }))
  }

  componentDidMount = () => {
    this.getCategoriesDrink()
  }

  filterAlcohol = (e) => {
    this.setState({ isAlcohol: e.target.value })
    const isAlcohol = e.target.value
    this.props.handleAlcoholChange(isAlcohol)
  }

  filterCategory = (event) => {
    this.props.handleCategoryChange(event.target.value)
  }

  render() {
    return (
      <div className="FilterDrink">
        <select
          name="selectedCategory"
          id="drink-categories"
          value={this.props.cat}
          onChange={this.filterCategory}
        >
          <option
            className="option"
            value="categories"
          >
            Categories
            </option>
          {
            this.state.categories.map(cat => (
              <option
                className="option"
                value={cat}
                key={cat}
              >
                {cat}
              </option>
            ))}
        </select>
        <div className="switch-field">
          <input
            type="radio"
            name="nonAlcohol"
            value="all"
            id="all"
            onChange={this.filterAlcohol}
            checked={this.props.alc === 'all'}
          />
          <label
            htmlFor="all"
            className="radio-label"
          >
            All types
          </label>
          <input
            type="radio"
            name="nonAlcohol"
            value="alcohol"
            id="alcohol"
            onChange={this.filterAlcohol}
            checked={this.props.alc === 'alcohol'}
          />
          <label
            htmlFor="alcohol"
            className="radio-label"
          >
            Alcoholic
          </label>
          <input
            type="radio"
            name="nonAlcohol"
            value="nonAlcohol"
            id="nonAlcohol"
            onChange={this.filterAlcohol}
            checked={this.props.alc === 'nonAlcohol'}
          />
          <label
            htmlFor="nonAlcohol"
            className="radio-label"
          >
            Non-alcoholic
          </label>
        </div>
      </div>
    );
  }
}

export default FilterDrink;