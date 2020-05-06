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
    detailsMeal: '',
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
    castId: '',
    crewId: '',
    totalPages: ''
  }

  componentDidMount = () => {
    this.getRandomFiltered()
  }

  getRandomFiltered = async () => {
    await this.setState({ loading: true })
    await this.getCocktailFiltered()
    await this.getMealFiltered()
    await this.getMovieFiltered()
    await this.getGenresList()
    this.setState({ loaded: true, loading: false })
  }

  getDetailsDrink = () => {
    const { idDrink } = this.state.drinks
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then(res => {
        let listMeasures = []
        let listIng = []
        let drink = res.data.drinks[0]
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
          detailsDrink: res.data.drinks[0]
        })
      })
  }

  getDetailsMeal = () => {
    const { idMeal } = this.state.meals
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
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
          detailsMeal: res.data.meals[0],
          video: res.data.meals[0].strYoutube.replace('watch?v=', 'embed/')
        })
      })
  }

  getCocktailFiltered = () => {
    const { drinkAlcohol, drinkCategory } = this.props
    axios
      .get(
        !drinkCategory ?
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${drinkAlcohol ? "a=Non_Alcoholic" : "a=Alcoholic"}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}${drinkAlcohol ? "&a=Non_Alcoholic" : "&a=Alcoholic"}`
      )
      .then(resDrink => {
        let randomNumD = Math.floor(Math.random() * resDrink.data.drinks.length)
        this.setState({ drinks: resDrink.data.drinks[randomNumD] })
      })
  }

  getMealFiltered = () => {
    axios
      .get(this.getUrlMeals())
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

  getUrlMovie = (r) => {
    this.props.cast && this.getMovieByCast()
    this.props.crew && this.getMovieByCrew()
    let pageMovie = ''
    this.state.totalPages ? pageMovie = Math.floor(Math.random() * this.state.totalPages) : pageMovie = 1
    if (this.props.movieGenre && this.props.cast && this.props.crew) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}&with_crew=${this.state.crewId}&with_cast=${this.state.castId}`
    } else if (this.props.movieGenre && !this.props.crew && !this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}`
    } else if (this.props.movieGenre && !this.props.crew && this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}&with_cast=${this.state.castId}`
    } else if (this.props.movieGenre && this.props.crew && !this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}&with_crew=${this.state.crewId}`
    } else if (!this.props.movieGenre && !this.props.crew && this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_cast=${this.state.castId}`
    } else if (!this.props.movieGenre && this.props.crew && !this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_crew=${this.state.crewId}`
    } else if (!this.props.movieGenre && this.props.crew && this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_crew=${this.state.crewId}&with_cast=${this.state.castId}`
    } else if (!this.props.movieGenre && !this.props.crew && !this.props.cast) {
      return `https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}`
    }
  }

  getMovieFiltered = async () => {
    await axios
      .get(this.getUrlMovie())
      .then(resMovie => this.setState({ totalPages: resMovie.data.results.total_pages }))
    await axios
      .get(this.getUrlMovie())
      .then(resMovie => {
        let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
        this.setState({ movies: resMovie.data.results[randomresult] })
      })
      .catch(err => {
        alert("Pas de résultat avec ces choix")
      })
  }

  getMovieByCast = () => {
    axios
      .get(`https://api.themoviedb.org/3/search/person?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&query=${this.props.cast}&page=1&include_adult=false`)
      .then(res => this.setState({ castId: res.data.results[0].id }))
      .catch(err => {
        alert("Cet acteur n'existe pas")
      })
  }

  getMovieByCrew = () => {
    axios
      .get(`https://api.themoviedb.org/3/search/person?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&query=${this.props.crew}&page=1&include_adult=false`)
      .then(res => this.setState({ crewId: res.data.results[0].id }))
      .catch(err => {
        alert("Ce réalisateur n'existe pas")
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

  toggleModalDrink = () => {
    this.setState({ modalDrink: !this.state.modalDrink })
    this.getDetailsDrink()
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
    const { drinks, meals, movies, categories, loading, loaded, detailsDrink, detailsMeal, ingDrink, measuresDrink, ingMeal, measuresMeal, video, date, genresMovie, actors, directors, trailer } = this.state
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
          instructions={detailsDrink.strInstructions}
          ingredients={ingDrink}
          measures={measuresDrink} />
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
          name={detailsMeal.strMeal}
          image={detailsMeal.strMealThumb}
          genre={detailsMeal.strCategory}
          area={detailsMeal.strArea}
          instructions={detailsMeal.strInstructions}
          ingredients={ingMeal}
          measures={measuresMeal}
          video={video}
          tags={detailsMeal.strTags} />
      </div>
    )
  }
}

export default CardsListFilter
