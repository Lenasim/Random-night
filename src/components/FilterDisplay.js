import React, { Component } from 'react';
import FilterButtons from './FilterButtons'
import FilterDrink from './FilterDrink'
import FilterMovie from './FilterMovie'
import FilterRecipe from './FilterRecipe'
import CardsListFilter from './CardsListFilter';
import Button from './Button'

import './FilterDisplay.css'

const Error = () => (
  <p>
    Something went <strong>wrong</strong>!
  </p>
);

class FilterDisplay extends Component {
  state = {
    activeId: '',
    isClicked: false,
    drinkCat: 'all',
    nonAlcohol: false,
    mealCat: 'all',
    mealIngr: 'all',
    mealAreas: 'all'
  }

  handleFirstClick = () => {
    this.setState({ firstClick: true })
  }

  handleChangeItem = (event) => {
    const buttonId = event.target.id;
    this.setState({ activeId: buttonId });
  }

  componentDidMount() {
    this.setState({ activeId: "drink" });
  }
  handleDrinkAlcohol = (nonAlcohol) => {
    this.setState({ nonAlcohol });
  }
  handleDrinkCategory = (drinkCat) => {
    this.setState({ drinkCat });
  }

  handleMealCategory = (name, value) => {
    this.setState({ [name]: value });
  }

    getItemContent() {
  switch (this.state.activeId) {
    case "drink":
      return <FilterDrink
        handleCategoryChange={this.handleDrinkCategory}
        handleAlcoholChange={this.handleDrinkAlcohol} />;
    case "movie":
      return <FilterMovie />;
    case "recipe":
      return <FilterRecipe
        handleCategoryChange={this.handleMealCategory} />;
    default:
      return <Error />;
  }
}

render() {
  return (
    <div>
      {!this.state.firstClick && <Button text="Get your own" isClicked={this.handleFirstClick} />}
      <div className="FilterDisplay">
        <FilterButtons
          handleChange={this.handleChangeItem}
          activeId={this.state.activeId}
        />
        <div>{this.getItemContent()}</div>
      </div>
      {this.state.firstClick &&
        <CardsListFilter
          drinkCategory={this.state.drinkCat}
          drinkAlcohol={this.state.nonAlcohol}
          
        />}
    </div>
  );
}
}

export default FilterDisplay;