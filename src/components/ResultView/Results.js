import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Card from './Card'
import Button from '../General/Button'
import ModalCocktail from './ModalCocktail'
import ModalRecipe from './ModalRecipe'
import ModalMovie from './ModalMovie'
import ModalBack from './ModalBack'

import './Card.css'

toast.configure()
class Results extends Component {
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
    instructionsMeal: [],
    date: '',
    genresList: '',
    genresMovie: [],
    actors: [],
    directors: [],
    trailer: '',
    castId: '',
    crewId: '',
    totalPages: '',
    allMealsByCat: [],
    allMealsByArea: [],
    filteredMealCat: '',
    filteredMealArea: '',
    mealsFiltered: '',
    drinksFilteredByCat: [],
    drinksFilteredByAlc: [],
    drinkFilteredList: [],
    mobile: false
  }

  getRandomFiltered = async () => {
    this.setState({ loading: true })
    await this.getCocktailFiltered()
    this.getMealFiltered()
    await this.getMovieFiltered()
    this.getGenresList()
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
          video: res.data.meals[0].strYoutube.replace('watch?v=', 'embed/'),
          instructionsMeal: res.data.meals[0].strInstructions.split('.')
        })
      })
  }

  getCocktailFiltered = async () => {
    const { drinkCategory, drinkAlcohol } = this.props
    if (!drinkCategory && !drinkAlcohol) {
      this.getRandomDrink()
    } else if (drinkAlcohol !== "all" && drinkCategory !== "categories") {
      const url = () => {
        if (drinkAlcohol === "alcohol") {
          return 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
        } else {
          return 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
        }
      }
      await axios
        .get(url())
        .then(res => {
          this.setState({ drinksFilteredByAlc: res.data.drinks.map(c => c.idDrink) })
        })
        .catch(err => {
          this.notifyDrink()
          this.getRandomDrink()
        })
      await axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`)
        .then(res => {
          this.setState({ drinksFilteredByCat: res.data.drinks.map(c => c.idDrink) })
        })
        .catch(err => {
          this.notifyDrink()
          this.getRandomDrink()
        })
      let idFiltered = []
      this.state.drinksFilteredByCat.map(idCat => this.state.drinksFilteredByAlc.map(idAlc => idCat === idAlc && idFiltered.push(idCat)))
      this.setState({ drinkFilteredList: idFiltered })
      let randomNumId = Math.floor(Math.random() * this.state.drinkFilteredList.length)
      await axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.state.drinkFilteredList[randomNumId]}`)
        .then(res => this.setState({ drinks: res.data.drinks[0] }))
        .catch(err => {
          this.notifyDrink()
          this.getRandomDrink()
        })
    } else if (drinkAlcohol !== "all" && drinkCategory === "categories") {
      const url = () => {
        if (drinkAlcohol === "alcohol") {
          return 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
        } else if (drinkAlcohol === "nonAlcohol") {
          return 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
        } else {
          return 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
        }
      }
      axios
        .get(url())
        .then(resDrink => {
          let randomNumD = Math.floor(Math.random() * resDrink.data.drinks.length)
          this.setState({ drinks: resDrink.data.drinks[randomNumD] })
        })
        .catch(err => {
          this.notifyDrink()
          this.getRandomDrink()
        })
    } else if (drinkAlcohol === "all" && drinkCategory !== "categories") {
      axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`)
        .then(resDrink => {
          let randomNumD = Math.floor(Math.random() * resDrink.data.drinks.length)
          this.setState({ drinks: resDrink.data.drinks[randomNumD] })
        })
        .catch(err => {
          this.notifyDrink()
          this.getRandomDrink()
        })
    } else {
      this.getRandomDrink()
    }
  }

  getRandomDrink = () => {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(resDrink => {
        let randomNumD = Math.floor(Math.random() * resDrink.data.drinks.length)
        this.setState({ drinks: resDrink.data.drinks[randomNumD] })
      })
      .catch(err => this.notifyDrink())
  }

  getMealFiltered = async () => {
    const { mealCat, mealAreas } = this.props
    if (this.props.mealAreas && this.props.mealCat) {
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}`)
        .then(res => this.setState({ allMealsByCat: res.data.meals.map(meal => meal.idMeal) }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealAreas}`)
        .then(res => this.setState({ allMealsByArea: res.data.meals.map(meal => meal.idMeal) }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
      let idFilteredMeal = []
      this.state.allMealsByCat.map(idCat => this.state.allMealsByArea.map(idA => idCat === idA && idFilteredMeal.push(idCat)))
      this.setState({ mealsFiltered: idFilteredMeal })
      let randomMeal = Math.floor(Math.random() * this.state.mealsFiltered.length)
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.mealsFiltered[randomMeal]}`)
        .then(res => this.setState({ meals: res.data.meals[0] }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
    } else if (this.props.mealAreas && !this.props.mealCat) {
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealAreas}`)
        .then(res => this.setState({ allMealsByArea: res.data.meals.map(meal => meal.idMeal) }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
      let randomMeal = Math.floor(Math.random() * this.state.allMealsByArea.length)
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.allMealsByArea[randomMeal]}`)
        .then(res => this.setState({ meals: res.data.meals[0] }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
    } else if (!this.props.mealAreas && this.props.mealCat) {
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}`)
        .then(res => this.setState({ allMealsByCat: res.data.meals.map(meal => meal.idMeal) }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
      let randomMeal = Math.floor(Math.random() * this.state.allMealsByCat.length)
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.allMealsByCat[randomMeal]}`)
        .then(res => this.setState({ meals: res.data.meals[0] }))
        .catch(err => {
          this.notifyMeal()
          this.getRandomMeal()
        })
    } else {
      this.getRandomMeal()
    }
  }

  getRandomMeal = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(resMeal => {
        let randomNumR = Math.floor(Math.random() * resMeal.data.meals.length)
        this.setState({ meals: resMeal.data.meals[randomNumR] })
      })
      .catch(err => {
        this.notifyMeal()
      })
  }

  getCast = async () => {
    await axios
      .get(`https://api.themoviedb.org/3/search/person?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&query=${this.props.cast}&page=1&include_adult=false`)
      .then(res => this.setState({ castId: res.data.results[0].id }))
      .catch(err => {
        this.notifyMovieActor()
        this.getRandomMovie()
      })
  }

  getCrew = async () => {
    await axios
      .get(`https://api.themoviedb.org/3/search/person?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&query=${this.props.crew}&page=1&include_adult=false`)
      .then(res => this.setState({ crewId: res.data.results[0].id }))
      .catch(err => {
        this.notifyMovieDirector()
        this.getRandomMovie()
      })
  }

  getGenres = () => {
    let pageMovie = Math.floor(Math.random() * 500)
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}&with_genres=${this.props.movieGenre}`)
      .then(resMovie => {
        let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
        resMovie.data.results[randomresult].poster_path !== null ?
          this.setState({ movies: resMovie.data.results[randomresult] })
          : this.getMovieFiltered()
      })
      .catch(err => {
        this.notifyMovie()
        this.getRandomMovie()
      })
  }

  getRandomMovie = () => {
    let pageMovie = Math.floor(Math.random() * 500)
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=${pageMovie}`)
      .then(resMovie => {
        let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
        resMovie.data.results[randomresult].poster_path !== null ?
          this.setState({ movies: resMovie.data.results[randomresult] })
          : this.getRandomMovie()
      })
      .catch(err => {
        this.notifyMovie()
      })
  }

  getMovieFiltered = async () => {
    if (this.props.movieGenre && this.props.cast && this.props.crew) {
      this.getCast()
      this.getCrew()
      await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=1&with_genres=${this.props.movieGenre}&with_crew=${this.state.crewId}&with_cast=${this.state.castId}`)
        .then(resMovie => {
          let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
          resMovie.data.results[randomresult].poster_path !== null ?
            this.setState({ movies: resMovie.data.results[randomresult] })
            : this.getMovieFiltered()
        })
        .catch(err => {
          this.notifyMovie()
          this.getRandomMovie()
        })
    } else if (this.props.movieGenre && !this.props.crew && !this.props.cast) {
      this.getGenres()
    } else if (this.props.movieGenre && !this.props.crew && this.props.cast) {
      this.getCast()
      await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=1&with_genres=${this.props.movieGenre}&with_cast=${this.state.castId}`)
        .then(resMovie => {
          let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
          resMovie.data.results[randomresult].poster_path !== null ?
            this.setState({ movies: resMovie.data.results[randomresult] })
            : this.getMovieFiltered()
        })
        .catch(err => {
          this.notifyMovie()
          this.getRandomMovie()
        })
    } else if (this.props.movieGenre && this.props.crew && !this.props.cast) {
      this.getCrew()
      await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=1&with_genres=${this.props.movieGenre}&with_crew=${this.state.crewId}`)
        .then(resMovie => {
          let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
          resMovie.data.results[randomresult].poster_path !== null ?
            this.setState({ movies: resMovie.data.results[randomresult] })
            : this.getMovieFiltered()
        })
        .catch(err => {
          this.notifyMovie()
          this.getRandomMovie()
        })
    } else if (!this.props.movieGenre && !this.props.crew && this.props.cast) {
      this.getCast()
      await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=1&with_cast=${this.state.castId}`)
        .then(resMovie => {
          let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
          resMovie.data.results[randomresult].poster_path !== null ?
            this.setState({ movies: resMovie.data.results[randomresult] })
            : this.getMovieFiltered()
        })
        .catch(err => {
          this.notifyMovie()
          this.getRandomMovie()
        })
    } else if (!this.props.movieGenre && this.props.crew && !this.props.cast) {
      this.getCrew()
      await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=1&with_crew=${this.state.crewId}`)
        .then(resMovie => {
          let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
          resMovie.data.results[randomresult].poster_path !== null ?
            this.setState({ movies: resMovie.data.results[randomresult] })
            : this.getMovieFiltered()
        })
        .catch(err => {
          this.notifyMovie()
          this.getRandomMovie()
        })
    } else if (!this.props.movieGenre && this.props.crew && this.props.cast) {
      this.getCast()
      this.getCrew()
      await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US&page=1&with_crew=${this.state.crewId}&with_cast=${this.state.castId}`)
        .then(resMovie => {
          let randomresult = Math.floor(Math.random() * resMovie.data.results.length)
          resMovie.data.results[randomresult].poster_path !== null ?
            this.setState({ movies: resMovie.data.results[randomresult] })
            : this.getMovieFiltered()
        })
        .catch(err => {
          this.notifyMovie()
          this.getRandomMovie()
        })
    } else if (!this.props.movieGenre && !this.props.crew && !this.props.cast) {
      this.getRandomMovie()
    }
  }

  notifyMovie = () => {
    toast.warn("There are no films matching your choice, check out our random result.", { position: toast.POSITION.BOTTOM_RIGHT })
  }

  notifyMovieActor = () => {
    toast.warn("There are no films matching the actor, check out our random result.", { position: toast.POSITION.BOTTOM_RIGHT })
  }

  notifyMovieDirector = () => {
    toast.warn("There are no films matching the director, check out our random result.", { position: toast.POSITION.BOTTOM_RIGHT })
  }

  notifyMeal = () => {
    toast.warn("There are no recipes matching your choice, check out our random result.", { position: toast.POSITION.BOTTOM_RIGHT })
  }

  notifyDrink = () => {
    toast.warn("There are no drinks matching your choice, check out our random result.", { position: toast.POSITION.BOTTOM_RIGHT })
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

  notifyAllFav = () => {
    toast.warn("You blocked all the results.", { position: toast.POSITION.BOTTOM_RIGHT })
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
    } else if (isFavDrink === true && isFavRecipe === true && isFavMovie === true) {
      this.notifyAllFav()
    }
  }

  isMobile() {
    if (window.innerWidth < 508) {
      this.setState({
        mobile: true
      });
    } else {
      this.setState({
        mobile: false
      });
    }
  }

  componentDidMount = () => {
    this.getRandomFiltered()
    this.isMobile()
  }

  render() {
    const { instructionsMeal, mobile, drinks, meals, movies, categories, loading, loaded, detailsDrink, detailsMeal, ingDrink, measuresDrink, ingMeal, measuresMeal, video, date, genresMovie, actors, directors, trailer } = this.state
    return (
      <div>
        <div className="notice-button">
          <Button
            classButton={!mobile ? "button" : "button-mobile"}
            text="Try again?"
            loader={loading}
            isClicked={this.getRandom} />
          {
            !this.props.filter &&
            <button
              className="button-filter"
              onClick={this.props.filterClick}>
              <i className="fas fa-sliders-h"></i>
            </button>
          }
        </div>
        {
          loaded &&
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
              poster={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
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
        {
          mobile &&
          <Button
            classButton={!mobile ? "button" : "button-mobile"}
            text="Try again?"
            loader={loading}
            isClicked={this.getRandom} />
        }
        {
          this.state.modalDrink &&
          <>
            <ModalCocktail
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
            <ModalBack handleClose={this.toggleModalDrink} />
          </>
        }
        {
          this.state.modalMovie &&
          <>
            <ModalMovie
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
            <ModalBack handleClose={this.toggleModalMovie} />
          </>
        }
        {
          this.state.modalMeal &&
          <>
            <ModalRecipe
              show={this.state.modalMeal}
              handleClose={this.toggleModalMeal}
              name={detailsMeal.strMeal}
              image={detailsMeal.strMealThumb}
              genre={detailsMeal.strCategory}
              area={detailsMeal.strArea}
              instructions={instructionsMeal}
              ingredients={ingMeal}
              measures={measuresMeal}
              video={video}
              tags={detailsMeal.strTags} />
            <ModalBack handleClose={this.toggleModalMeal} />
          </>
        }
      </div>
    )
  }
}

export default Results
