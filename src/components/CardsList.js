import React, { Component } from 'react'

import './CardsList.css'

import axios from 'axios'
import Button from './Button'
import Card from './Card'

const api = process.env.REACT_APP_API_KEY
class CardsList extends Component {

  state = {
    drinks: '',
    meals: '',
    movies: '',
    categories: [
      'cocktail',
      'movie',
      'recipe'
    ]

  }

  getRandom = () => {
    let pageMovie = Math.floor(Math.random() * 501)
    let resultMovie = Math.floor(Math.random() * 19)
    axios.all([
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=${pageMovie}`)
    ])
      .then(axios.spread((resDrink, resMeal, resMovie) => {
        this.setState({
          drinks: resDrink.data.drinks[0],
          meals: resMeal.data.meals[0],
          movies: resMovie.data.results[resultMovie]
        })
      }))
  }
  render() {
    const { drinks, meals, movies, categories } = this.state

    return (
      <div>
        <Button />
        <Card
          image={drinks.strDrinkThumb}
          name={drinks.strDrink}
          categorie={categories[0]} />
        <Card
          image={meals.strMealThumb}
          name={meals.strMeal}
          categorie={categories[1]} />
        <Card
          image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
          name={movies.title}
          categorie={categories[2]} />
      </div>
    )
  }

}

export default CardsList
