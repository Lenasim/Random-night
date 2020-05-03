import React, { Component } from 'react'
import axios from 'axios'

import Card from './Card'
import Button from './Button'
import Modal from './Modal'

import './Card.css'

class CardsListFilter extends Component {

  state = {
    loading: false,
    loaded: false,
    drinks: '',
    meals: '',
    movies: '',
    categories: [
      'cocktail',
      'movie',
      'recipe'
    ],
    isFavDrink: false,
    favDrink: '',
    isFavRecipe: false,
    favRecipe: '',
    isFavMovie: false,
    favMovie: '',
    ingListDrink: [],
    modalDrink: false,
    modalMeal: false,
    modalMovie: false,
    detailsDrink: '',
    detailsMeal:'',
  }

  componentDidMount = () => {
    this.getRandomFiltered()
  }

  getRandomFiltered = async () => {
    await this.setState({ loading: true })
    await this.getCocktailFiltered()
    await this.getMealFiltered()
    await this.getMovieFiltered()
    this.setState({ loaded: true, loading: false })
  }

  getDetailsDrink = () => {
    const { idDrink } = this.state.drinks
      axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then(res => this.setState({detailsDrink: res.data.drinks[0]}))
  }

  getDetailsMeal = () => {
    const {idMeal} = this.state.meals
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then(res => this.setState({detailsMeal: res.data.meals[0]}))
  }

  getCocktailFiltered = () => {
    const { drinkAlcohol, drinkCategory } = this.props
    axios.get(
      (!drinkCategory) ?
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drinkAlcohol ? "a=Non_Alcoholic" : "a=Alcoholic"}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}${drinkAlcohol ? "&a=Non_Alcoholic" : "&a=Alcoholic"}`
    )
      .then(resDrink => {
        let randomNumD = Math.floor(Math.random() * resDrink.data.drinks.length)
        this.setState({ drinks: resDrink.data.drinks[randomNumD] })
      })
  }

  getMealFiltered = () => {
    axios.get(this.getUrlMeals())
      .then(resMeal => {
        let randomNumR = Math.floor(Math.random() * resMeal.data.meals.length)
        this.setState({ meals: resMeal.data.meals[randomNumR] })
      })
  }

  getUrlMeals = () => {
    const { mealCat, mealIngr, mealAreas } = this.props
    if (mealCat === '' || !mealCat) {
      if (mealIngr === '') {
        if (mealAreas === '') {
          return 'https://www.themealdb.com/api/json/v1/1/random.php'
        } else {
          return `https://www.themealdb.com/api/json/vhttp://localhost:3000/1/1/filter.php?a=${mealAreas}`
        }
      } else {
        if (mealAreas === '') {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngr}`
        } else {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealAreas}&i=${mealIngr}`
        }
      }
    } else {
      if (mealIngr === '') {
        if (mealAreas === '') {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}`
        } else {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}&a=${mealAreas}`
        }
      } else {
        if (mealAreas === '') {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}&i=${mealIngr}`
        } else {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}&a=${mealAreas}&i=${mealIngr}`
        }
      }
    }
  }

  getMovieFiltered = () => {
    const pageMovie = Math.floor(Math.random() * 501)
    const resultMovie = Math.floor(Math.random() * 19)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}`)
      .then(resMovie => {
        this.setState({ movies: resMovie.data.results[resultMovie] })
        this.catchEmptyMovie()
      })
  }

  catchEmptyMovie = () => {
    if (!this.state.movies.poster_path) {
      this.getMovieFiltered()
    }
  }

  toggleModalDrink = () => {
    this.setState({ modalDrink: !this.state.modalDrink })
    this.getDetailsDrink()
  }

  toggleModalMovie = () => {
    this.setState({ modalMovie: !this.state.modalMovie })
  }

  toggleModalMeal = () => {
    this.setState({ modalMeal: !this.state.modalMeal })
    this.getDetailsMeal()
  }

  isFavDrink = () => {
    this.setState({ isFavDrink: !this.state.isFavDrink })
    this.setState({ favDrink: this.state.drinks })
  }

  isFavRecipe = () => {
    this.setState({ isFavRecipe: !this.state.isFavRecipe })
    this.setState({ favRecipe: this.state.meals })
  }

  isFavMovie = () => {
    this.setState({ isFavMovie: !this.state.isFavMovie })
    this.setState({ favMovie: this.state.movies })
  }

  getRandom = () => {
    const { isFavDrink, isFavMovie, isFavRecipe } = this.state
    if (isFavDrink === false && isFavRecipe === false && isFavMovie === false) {
      this.getCocktailFiltered()
      this.getMealFiltered()
      this.getMovieFiltered()
    } else if (isFavDrink === true && isFavRecipe === true && isFavMovie === false) {
      this.getMovieFiltered()
    } else if (isFavDrink === true && isFavRecipe === false && isFavMovie === true) {
      this.getMealFiltered()
    } else if (isFavDrink === false && isFavRecipe === true && isFavMovie === true) {
      this.getCocktailFiltered()
    } else if (isFavDrink === true && isFavRecipe === false && isFavMovie === false) {
      this.getMealFiltered()
      this.getMovieFiltered()
    } else if (isFavDrink === false && isFavRecipe === false && isFavMovie === true) {
      this.getCocktailFiltered()
      this.getMealFiltered()
    } else if (isFavDrink === false && isFavRecipe === true && isFavMovie === false) {
      this.getCocktailFiltered()
      this.getMovieFiltered()
    }
  }

  render() {
    const { drinks, meals, movies, categories, loading, loaded, detailsDrink, detailsMeal } = this.state
    return (
      <div>
        <Button isClicked={this.getRandom}
          text='Toujours Pas ?'
          loader={loading}
        />
        {loaded &&
          <div className="card-container">
            <Card
              image={drinks.strDrinkThumb}
              name={drinks.strDrink}
              categorie={categories[0]}
              onClick={this.toggleModalDrink}
              isFav={this.isFavDrink}
              class={this.state.isFavDrink ? "fas fa-lock" : "fas fa-lock-open"}
            />
            <Card
              image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              name={movies.title}
              categorie={categories[1]}
              onClick={this.toggleModalMovie}
              isFav={this.isFavMovie}
              class={this.state.isFavMovie ? "fas fa-lock" : "fas fa-lock-open"}
            />
            <Card
              image={meals.strMealThumb}
              name={meals.strMeal}
              categorie={categories[2]}
              onClick={this.toggleModalMeal}
              isFav={this.isFavRecipe}
              class={this.state.isFavRecipe ? "fas fa-lock" : "fas fa-lock-open"}
            />
          </div>
        }
       <Modal
          show={this.state.modalDrink}
          handleClose={this.toggleModalDrink}
          name={detailsDrink.strDrink} 
          image={detailsDrink.strDrinkThumb}
          genre={detailsDrink.strCategory}
          alcoholic={detailsDrink.strAlcoholic}
          glassType={detailsDrink.strGlass}
          instructions={detailsDrink.strInstructions}/>
        <Modal
          show={this.state.modalMovie}
          handleClose={this.toggleModalMovie}
          name={movies.title}
          image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
          rating={movies.vote_average}
          overview={movies.overview}
          date={movies.release_date}/>
        <Modal
          show={this.state.modalMeal}
          handleClose={this.toggleModalMeal}
          name={detailsMeal.strMeal}
          image={detailsMeal.strMealThumb}
          genre={detailsMeal.strCategory}
          instructions={detailsMeal.strInstructions} />
      </div>
    )
  }

}

export default CardsListFilter
