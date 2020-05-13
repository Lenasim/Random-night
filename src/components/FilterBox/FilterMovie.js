import React, { Component } from 'react';
import axios from 'axios'

import './FilterMovie.css'

class FilterMovie extends Component {
  state = {
    genres: [],
    genresResult: ''
  }

  componentDidMount = () => {
    this.getGenres()
  }

  getGenres = () => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US')
      .then(res => this.setState({ genres: res.data.genres }))
  }

  handleCastChange = (e) => {
    const queryCast = e.target.value.replace(' ', '%20')
    this.props.handleCastChange(queryCast)
  }

  handleCrewChange = (e) => {
    const queryCrew = e.target.value.replace(' ', '%20')
    this.props.handleCrewChange(queryCrew)
  }

  filterGenre = (event) => {
    const genreName = this.state.genres.filter(f => f.id === parseInt(event.target.value))[0].name 
    this.props.handleGenreChange(event.target.value, genreName)
  }

  render() {
    return (
      <div className="FilterMovie">
        <select
          name="genresResult"
          id="movie-genres"
          value={this.props.genreName}
          onChange={this.filterGenre}
        >
          <option className="option" value="genre">
          {this.props.genreName}
          </option>
          {
            this.state.genres.map(g =>
              (<option value={g.id} key={g.id}>{g.name}</option>))
          }
        </select>
        <div className="search-movies">
          <label className="label-movies">Actor</label>
          <input
            className="input-movies"
            type="text"
            id="queryCast"
            name="queryCast"
            onChange={this.handleCastChange}
            value={this.props.cast}
          />
        </div>
        <div className="search-movies">
          <label className="label-movies">Director</label>
          <input
            className="input-movies"
            type="text"
            id="queryCrew"
            name="queryCrew"
            onChange={this.handleCrewChange}
            value={this.props.crew}
          />
        </div>
      </div>
    );
  }
}

export default FilterMovie;