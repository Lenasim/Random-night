import React, { Component } from 'react'
import Card from './Card'
import './Card.css'

import axios from 'axios'
import Button from './Button'

class CardsList extends Component {

  state = {
    loading: false,
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
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}`)
    ])
      .then(axios.spread((resDrink, resMeal, resMovie) => {
        this.setState({
          drinks: resDrink.data.drinks[0],
          meals: resMeal.data.meals[0],
          movies: resMovie.data.results[resultMovie],
          loading: true
        })
        setTimeout(() => {
          this.setState({ loading: false })
        }, 2000)
      }))
  }

  componentDidMount() {
    this.getRandom()
  }

  render() {
    const { drinks, meals, movies, categories, loading } = this.state

    return (
      <div>
        <Button isClicked={this.getRandom}
          text='Toujours Pas ?'
          loader={loading}
        />
        {!loading &&
          <div className="card-container">
            <Card
              image={drinks.strDrinkThumb}
              name={drinks.strDrink}
              categorie={categories[0]} />
            <Card
              image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              name={movies.title}
              categorie={categories[1]} />
            <Card
              image={meals.strMealThumb}
              name={meals.strMeal}
              categorie={categories[2]} />
          </div>
        }
      </div>
    )
  }

}

export default CardsList
