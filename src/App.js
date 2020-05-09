import React, { Component } from 'react';
import Header from './components/Header'
import CardsListFilter from './components/CardsListFilter'
import Button from './components/Button'
import FilterButtons from './components/FilterButtons'
import FilterDrink from './components/FilterDrink'
import FilterMovie from './components/FilterMovie'
import FilterRecipe from './components/FilterRecipe'

import './App.css';
import './components/Notice.css'
import './components/FilterDisplay.css'


const Error = () => (
  <p>
    Something went <strong>wrong</strong>!
  </p>
)
class App extends Component {
  state = {
    firstClick: false,
    filterClick: false,
    activeId: '',
    isClicked: false,
    drinkCat: 'categories',
    isAlcohol: 'all',
    mealCat: '',
    mealAreas: '',
    genresResult: '',
    queryCast: '',
    queryCrew: '',
  }



  handleFilterClick = () => {
    this.setState({ filterClick: !this.state.filterClick })
  }

  handleReset = () => {
    this.setState({
      firstClick: false,
      filterClick: false,
      showFilterButton: true
    })
  }

  handleButtonClick = () => {
    this.setState({ firstClick: true })
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
  handleDrinkAlcohol = (isAlcohol) => {
    this.setState({ isAlcohol: isAlcohol });
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
          cat={this.state.drinkCat}
          alc={this.state.isAlcohol}/>;
      case "movie":
        return <FilterMovie
          handleGenreChange={this.handleGenreChange}
          handleCastChange={this.handleCastChange}
          handleCrewChange={this.handleCrewChange}
          genre={this.state.genresResult}
          cast={this.state.queryCast}
          crew={this.state.queryCrew} />
      case "recipe":
        return <FilterRecipe
          handleCategoryChange={this.handleMealCategory} 
          cat={this.state.mealCat}
          area={this.state.mealAreas}/>;
      default:
        return <Error />;
    }
  }

  render() {

    return (
      <div className="App">
        <Header reset={this.handleReset} />
        <div>
          <div className='notice-text'>
            <h1>What's your game plan tonight ?</h1>
          </div>
          {!this.state.firstClick &&
            <div className="notice-button">
              <div onClick={this.handleButtonClick} >
                <Button text={!this.state.firstClick ? "Get your plan" : "Try again?"} />
              </div>
              <div onClick={this.handleFilterClick} >
                <button className="button-filter"><i className="fas fa-sliders-h"></i></button>
              </div>
            </div>}
        </div>

        {this.state.filterClick &&
          <div>
            <div className="FilterDisplay">
              <FilterButtons
                handleChange={this.handleChangeItem}
                activeId={this.state.activeId}
              />
              <div>{this.getItemContent()}</div>
            </div>
          </div>}

        {this.state.firstClick &&
          <CardsListFilter
            filterClick={this.handleFilterClick}
            drinkCategory={this.state.drinkCat}
            drinkAlcohol={this.state.isAlcohol}
            mealCat={this.state.mealCat}
            mealIngr={this.state.mealIngr}
            mealAreas={this.state.mealAreas}
            movieGenre={this.state.genresResult}
            cast={this.state.queryCast}
            crew={this.state.queryCrew} />}

      </div>
    );
  }
}



export default App