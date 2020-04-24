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
    const { mealCat, mealIngr, mealAreas } = this.props
    if (mealCat === '' || !mealCat) {
      if (mealIngr === '') {
        if (mealAreas === '') {
          return 'https://www.themealdb.com/api/json/v1/1/random.php'
        } else {
          return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealAreas}`
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

      getRandomFiltered = () => {
        this.setState({ loading: true })
        const { drinkAlcohol, drinkCategory } = this.props
        const pageMovie = Math.floor(Math.random() * 501)
        const resultMovie = Math.floor(Math.random() * 19)

        axios.all([
          axios.get(
            (drinkCategory === '' || undefined) ?
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drinkAlcohol ? "a=Non_Alcoholic" : "a=Alcoholic"}`
              : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}${drinkAlcohol ? "&a=Non_Alcoholic" : "&a=Alcoholic"}`
          ),
          axios.get(this.getUrlMeals()),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}`)
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
                  onClick={this.toggleModal} />
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
