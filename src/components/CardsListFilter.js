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
    modal: false
  }


  getUrlMeals = () => {
    const { categoriesResult, areasResult } = this.props
    if (categoriesResult && areasResult) {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?c=$%7BcategoriesResult%7D&a=$%7BareasResult%7D%60`
    } else if (categoriesResult && !areasResult) {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesResult}`
    } else if (!categoriesResult && areasResult) {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areasResult}`
    } else {
      return 'https://www.themealdb.com/api/json/v1/1/random.php'
    }
  }

  getRandomFiltered = () => {
    this.setState({ loading: true })
    const {drinkAlcohol, drinkCategory} = this.props
    const pageMovie = Math.floor(Math.random() * 501)
    const resultMovie = Math.floor(Math.random() * 19)

    axios.all([
      axios.get( 
        (drinkCategory === 'all' || undefined) ? 
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drinkAlcohol? "a=Non_Alcoholic" : "a=Alcoholic" }`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}${drinkAlcohol? "&a=Non_Alcoholic" : "&a=Alcoholic" }`
      ),
      axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'),
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}`)
    ])
      .then(axios.spread((resDrink, resMeal, resMovie) => {
        console.log(resMeal)
        let randomNumD = Math.floor(Math.random() * resDrink.data.drinks.length)
        let randomNumR = Math.floor(Math.random() * resMeal.data.meals.length)
        this.setState({
          drinks: resDrink.data.drinks[randomNumD],
          meals: resMeal.data.meals[randomNumR],
          movies: resMovie.data.results[resultMovie]
        }, () => {
          this.setState({ loaded: true, loading: false })
        })
        // console.log(randomNum, resDrink.data.drinks[randomNum])
      }))
  }

  componentDidMount = () => {
    this.getRandomFiltered()
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    const { drinks, meals, movies, categories, loading, loaded } = this.state

    return (
      <div>
        <Button isClicked={this.getRandomFiltered}
          text='Toujours Pas ?'
          loader={loading}
        />
        {loaded &&
          <div className="card-container">
            <Card
              image={drinks.strDrinkThumb}
              name={drinks.strDrink}
              categorie={categories[0]}
              onClick={this.toggleModal}  />
            <Card
              image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              name={movies.title}
              categorie={categories[1]}
              onClick={this.toggleModal} />
            <Card
              image={meals.strMealThumb}
              name={meals.strMeal}
              categorie={categories[2]}
              onClick={this.toggleModal} />
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
