import React, { Component } from 'react';
import axios from 'axios'
import './FilterDrink.css'

class FilterDrink extends Component {
  state = {
    categories: [],
    // selectedCategory: '',
    nonAlcohol: false
  }

  getCategoriesDrink = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(res => this.setState({ categories: res.data.drinks.map(c => c.strCategory) }))
  }
  
  componentDidMount = () => {
    this.getCategoriesDrink()
  }

  filterAlcohol = () => {
    this.setState({ nonAlcohol: !this.state.nonAlcohol })
    this.props.handleAlcoholChange(this.state.nonAlcohol)
  }

  filterCategory = (event) => {
    this.props.handleCategoryChange(event.target.value)
  }

  render() {
    return (
      <div className="FilterDrink">
        <select name="selectedCategory" id="drink-categories" value={this.state.value} onChange={this.filterCategory}>
          <option className="option" value="categories">All categories</option>
          {this.state.categories.map(cat => (<option className="option" value={cat} key={cat}>{cat}</option>))}
        </select>
        <div className="checkbox">
          <p>Sans alcool</p>
          <label className="switch">
            <input name="nonAlcohol" type="checkbox" value={this.state.nonAlcohol} onChange={this.filterAlcohol} />
            <span className="slider round" />
          </label>
        </div>
      </div>
    );
  }
}

export default FilterDrink;