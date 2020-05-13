import React, { Component } from 'react';
import Header from './components/General/Header'
import Results from './components/ResultView/Results'
import Button from './components/General/Button'
import FilterButtons from './components/FilterBox/FilterButtons'
import FilterDrink from './components/FilterBox/FilterDrink'
import FilterMovie from './components/FilterBox/FilterMovie'
import FilterRecipe from './components/FilterBox/FilterRecipe'
import ScrollToTop from './components/General/ScrollToTop'
import Footer from './components/General/Footer'

import './App.css';


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
    genreName: 'Genres',
    queryCast: '',
    queryCrew: '',
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  handleFilterClick = () => {
    this.setState({ filterClick: !this.state.filterClick })
  }

  handleResetFilters = () => {
    this.setState({
      drinkCat: 'categories',
      isAlcohol: 'all',
      mealCat: '',
      mealAreas: '',
      genresResult: '',
      genreName: 'Genres',
      queryCast: '',
      queryCrew: ''
    })
  }

  handleCloseFilters = () => {
    this.setState({
      drinkCat: 'categories',
      isAlcohol: 'all',
      mealCat: '',
      mealAreas: '',
      genresResult: '',
      genreName: 'Genres',
      queryCast: '',
      queryCrew: '',
      filterClick: false
    })
  }

  handleReset = () => {
    this.setState({
      firstClick: false,
      filterClick: false,
      showFilterButton: true,
      drinkCat: 'categories',
      isAlcohol: 'all',
      mealCat: '',
      mealAreas: '',
      genresResult: '',
      genreName: 'Genres',
      queryCast: '',
      queryCrew: ''
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

  handleGenreChange = (genresResult, genreName) => {
    this.setState({ genresResult, genreName });
  }

  handleCastChange = (queryCast) => {
    this.setState({ queryCast: queryCast.replace('%20', ' ') })
  }

  handleCrewChange = (queryCrew) => {
    this.setState({ queryCrew: queryCrew.replace('%20', ' ') })
  }

  getItemContent() {
    switch (this.state.activeId) {
      case "drink":
        return <FilterDrink
          handleCategoryChange={this.handleDrinkCategory}
          handleAlcoholChange={this.handleDrinkAlcohol}
          cat={this.state.drinkCat}
          alc={this.state.isAlcohol} />;
      case "movie":
        return <FilterMovie
          handleGenreChange={this.handleGenreChange}
          handleCastChange={this.handleCastChange}
          handleCrewChange={this.handleCrewChange}
          genre={this.state.genresResult}
          genreName={this.state.genreName}
          cast={this.state.queryCast}
          crew={this.state.queryCrew} />
      case "recipe":
        return <FilterRecipe
          handleCategoryChange={this.handleMealCategory}
          cat={this.state.mealCat}
          area={this.state.mealAreas} />;
      default:
        return <Error />;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="main">
        <Header reset={this.handleReset} />
        <div>
          <div className='notice-text'>
            <h1>Wanna chill on your couch tonight?</h1>
            <h4>We suggest you what to drink, watch and eat!</h4>
          </div>
          {
            !this.state.firstClick &&
            <div className="notice-button">
              <Button
                text={!this.state.firstClick ? "Get your plan" : "Try again?"}
                isClicked={this.handleButtonClick}
              />
              {
                !this.state.filterClick &&
                <button
                  className="button-filter"
                  onClick={this.handleFilterClick}>
                  <i className="fas fa-sliders-h"></i>
                </button>
              }
            </div>
          }
        </div>
        {
          this.state.filterClick &&
          <div>
            <div className="FilterDisplay">
              <FilterButtons
                close={this.handleCloseFilters}
                filter={this.state.filterClick}
                reset={this.handleResetFilters}
                handleChange={this.handleChangeItem}
                activeId={this.state.activeId}
              />
              <div>{this.getItemContent()}</div>
            </div>
          </div>}
        {
          this.state.firstClick &&
          <Results
            filter={this.state.filterClick}
            filterClick={this.handleFilterClick}
            drinkCategory={this.state.drinkCat}
            drinkAlcohol={this.state.isAlcohol}
            mealCat={this.state.mealCat}
            mealIngr={this.state.mealIngr}
            mealAreas={this.state.mealAreas}
            movieGenre={this.state.genresResult}
            cast={this.state.queryCast}
            crew={this.state.queryCrew} />
          }
          <ScrollToTop />
          </div>
        <Footer />
      </div>
    );
  }
}



export default App