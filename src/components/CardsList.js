import React, { Component } from 'react'
import axios from 'axios'

import Card from './Card'
import Button from './Button'
import Modal from './Modal'

import './Card.css'

class CardsList extends Component {

  state = {
    loading: false,
    loaded: false,
    drinks: '',
    meals: '',
    movies: '',
    ingDrink: [],
    measuresDrink: [],
    video: '',
    ingMeal: [],
    measuresMeal: [],
    date: '',
    genresList: '',
    genresMovie: [],
    actors: [],
    directors: [],
    trailer: '',
    categories: [
      'drink',
      'movie',
      'recipe'
    ],
    isFavDrink: false,
    favDrink: '',
    isFavRecipe: false,
    favRecipe: '',
    isFavMovie: false,
    favMovie: '',
    modalDrink: false,
    modalMeal: false,
    modalMovie: false
  }

  getRandomDrink = () => {
    this.setState({ loading: true })
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(res => {
        let listIng = []
        let drink = res.data.drinks[0]
        let listMeasures = []
        Object
          .keys(drink)
          .filter((measure) => /Measure/.test(measure))
          .forEach(measure => listMeasures.push(drink[measure]))
        Object
          .keys(drink)
          .filter((ing) => /Ingredient/.test(ing))
          .forEach(ing => listIng.push(drink[ing]))
        this.setState({
          measuresDrink: listMeasures,
          ingDrink: listIng,
          drinks: res.data.drinks[0]
        }, () => {
          this.setState({ loaded: true, loading: false })
        })
      })
  }

  getRandomRecipe = () => {
    this.setState({ loading: true })
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => {
        let listMeasures = []
        let listIng = []
        let meal = res.data.meals[0]
        Object
          .keys(meal)
          .filter((measure) => /Measure/.test(measure))
          .forEach(measure => listMeasures.push(meal[measure]))
        Object
          .keys(meal)
          .filter((ing) => /Ingredient/.test(ing))
          .forEach(ing => listIng.push(meal[ing]))
        this.setState({
          measuresMeal: listMeasures,
          ingMeal: listIng,
          meals: res.data.meals[0],
          video: res.data.meals[0].strYoutube.replace('watch?v=', 'embed/')
        }, () => {
          this.setState({ loaded: true, loading: false })
        })
      })
  }

  getRandomMovie = () => {
    this.setState({ loading: true })
    let pageMovie = Math.floor(Math.random() * 500)
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}`)
      .then(res => {
        let resultMovie = Math.floor(Math.random() * res.data.results.length)
        this.setState({ movies: res.data.results[resultMovie] }, () => {
          this.setState({ loaded: true, loading: false })
        })
      })
  }

  getDate = () => {
    this.setState({ date: new Date(this.state.movies.release_date).toLocaleDateString() })
  }

  getGenresList = () => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US')
      .then(res => this.setState({ genresList: res.data.genres.map(c => c) }))
  }

  getGenresMovie = () => {
    const { movies, genresList } = this.state
    let genres = []
    genresList.map(g => movies.genre_ids.map(i => i === g.id && genres.push(g.name)))
    this.setState({ genresMovie: genres })
  }

  getCredits = () => {
    const { movies } = this.state
    axios
      .get(`https://api.themoviedb.org/3/movie/${movies.id}/credits?api_key=439ba5790e4522ad15e0c6a3574cd795`)
      .then(res => this.setState({
        actors: res.data.cast.map(c => c.name),
        directors: res.data.crew.map(j => j.job === "Director" && j.name)
      }))
  }

  getTrailer = () => {
    const { movies } = this.state
    axios
      .get(`https://api.themoviedb.org/3/movie/${movies.id}/videos?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US`)
      .then(res => this.setState({ trailer: `https://www.youtube.com/embed/${res.data.results[0].key}` }))
      .catch(() => this.setState({ trailer: false }))
  }

  componentDidMount() {
    this.getRandom()
    this.getGenresList()
  }

  toggleModalDrink = () => {
    this.setState({ modalDrink: !this.state.modalDrink })
  }

  toggleModalMovie = () => {
    this.setState({ modalMovie: !this.state.modalMovie })
    this.getDate()
    this.getGenresMovie()
    this.getCredits()
    this.getTrailer()
  }

  toggleModalMeal = () => {
    this.setState({ modalMeal: !this.state.modalMeal })
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
      this.getRandomDrink()
      this.getRandomRecipe()
      this.getRandomMovie()
    } else if (isFavDrink === true && isFavRecipe === true && isFavMovie === false) {
      this.getRandomMovie()
    } else if (isFavDrink === true && isFavRecipe === false && isFavMovie === true) {
      this.getRandomRecipe()
    } else if (isFavDrink === false && isFavRecipe === true && isFavMovie === true) {
      this.getRandomDrink()
    } else if (isFavDrink === true && isFavRecipe === false && isFavMovie === false) {
      this.getRandomRecipe()
      this.getRandomMovie()
    } else if (isFavDrink === false && isFavRecipe === false && isFavMovie === true) {
      this.getRandomDrink()
      this.getRandomRecipe()
    } else if (isFavDrink === false && isFavRecipe === true && isFavMovie === false) {
      this.getRandomDrink()
      this.getRandomMovie()
    }
  }

  render() {
    const { drinks, meals, movies, categories, loading, loaded, ingDrink, measuresDrink, ingMeal, measuresMeal, video, date, genresMovie, actors, directors, trailer } = this.state

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
              category={categories[0]}
              onClick={this.toggleModalDrink}
              isFav={this.isFavDrink}
              class={this.state.isFavDrink ? "fas fa-lock" : "fas fa-lock-open"}
            />
            <Card
              image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              name={movies.title}
              category={categories[1]}
              onClick={this.toggleModalMovie}
              isFav={this.isFavMovie}
              class={this.state.isFavMovie ? "fas fa-lock" : "fas fa-lock-open"}
            />
            <Card
              image={meals.strMealThumb}
              name={meals.strMeal}
              category={categories[2]}
              onClick={this.toggleModalMeal}
              isFav={this.isFavRecipe}
              class={this.state.isFavRecipe ? "fas fa-lock" : "fas fa-lock-open"}
            />
          </div>
        }
        <Modal
          show={this.state.modalDrink}
          handleClose={this.toggleModalDrink}
          name={drinks.strDrink}
          image={drinks.strDrinkThumb}
          genre={drinks.strCategory}
          alcoholic={drinks.strAlcoholic}
          glassType={drinks.strGlass}
          instructions={drinks.strInstructions}
          ingredients={ingDrink}
          measures={measuresDrink}
        />
        <Modal
          show={this.state.modalMovie}
          handleClose={this.toggleModalMovie}
          name={movies.title}
          image={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
          rating={movies.vote_average}
          overview={movies.overview}
          genre={genresMovie}
          date={date}
          actors={actors}
          directors={directors}
          trailer={trailer} />
        <Modal
          show={this.state.modalMeal}
          handleClose={this.toggleModalMeal}
          name={meals.strMeal}
          image={meals.strMealThumb}
          genre={meals.strCategory}
          area={meals.strArea}
          instructions={meals.strInstructions}
          ingredients={ingMeal}
          measures={measuresMeal}
          video={video}
          tags={meals.strTags} />
      </div>
    )
  }
}

export default CardsList
