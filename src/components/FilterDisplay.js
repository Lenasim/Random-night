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
    drinkCat: '',
    nonAlcohol: false,
    mealCat: '',
    mealIngr: '',
    mealAreas: '',
    genresResult: '',
    queryCast: '',
    queryCrew: ''
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
    this.setState({ nonAlcohol: !nonAlcohol });
  }
  handleDrinkCategory = (drinkCat) => {
    this.setState({ drinkCat });
  }

  handleMealCategory = (name, value) => {
    this.setState({ [name]: value });
  }

  handleGenreChange = (genresResult) => {
    this.setState({ genresResult });
  }

  handleCastChange = (queryCast) => {
    this.setState({ queryCast })
  }

  handleCrewChange = (queryCrew) => {
    this.setState({ queryCrew })
  }

  getItemContent() {
    switch (this.state.activeId) {
      case "drink":
        return <FilterDrink
          handleCategoryChange={this.handleDrinkCategory}
          handleAlcoholChange={this.handleDrinkAlcohol}
          nonAlcohol={this.state.nonAlcohol} />;
      case "movie":
        return <FilterMovie
          handleGenreChange={this.handleGenreChange}
          handleCastChange={this.handleCastChange}
          handleCrewChange={this.handleCrewChange} />
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
            mealCat={this.state.mealCat}
            mealIngr={this.state.mealIngr}
            mealAreas={this.state.mealAreas}
            movieGenre={this.state.genresResult}
            cast={this.state.queryCast}
            crew={this.state.queryCrew}
          />}
        {!this.state.firstClick && <Button text="Get your own" isClicked={this.handleFirstClick} />}
      </div>
    );
  }
}

export default FilterDisplay;