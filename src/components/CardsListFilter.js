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
    ingListDrink: []
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

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
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
    const { drinks, meals, movies, categories, loading, loaded } = this.state
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
              onClick={this.toggleModalRecipe}
              isFav={this.isFavRecipe}
              class={this.state.isFavRecipe ? "fas fa-lock" : "fas fa-lock-open"}
            />
          </div>
        }
        <Modal
          show={this.state.modal}
          handleClose={this.toggleModal} />
      </div>
    )
  }

}

export default CardsListFilter
