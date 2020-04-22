import React, { Component } from 'react';
import axios from 'axios'


import './FilterDrink.css'
class FilterDrink extends Component {
  state = {
    categories: [],
    nonAlcohol: true
  }

  getCategoriesDrink = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then(res => this.setState({ categories: res.data.drinks.map(c => c.strCategory) }))

  }
  componentDidMount = () => {
    this.getCategoriesDrink()
  }

  selectAlcohol = () => {
    this.setState({ nonAlcohol: !this.state.nonAlcohol })
  }
  render() {
    return (
      <div className="FilterDrink">
        <select name="categories" id="drink-categories">
          <option className="option" value="categories">Catégories</option>
          {this.state.categories.map(cat => (<option className="option" value={cat} key={cat}>{cat}</option>))}
        </select>
        <div className="checkbox">
          <p>Sans alcool </p>
          <label className="switch">
            <input type="checkbox" value={this.state.nonAlcohol} onChange={this.selectAlcohol} />
            <span className="slider round" />
          </label>
        </div>
        <button className="form-btn">Chercher</button>
      </div>
    );
  }
}

export default FilterDrink;