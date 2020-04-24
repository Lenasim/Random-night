import React, { Component } from 'react';
import axios from 'axios'

import './FilterMovie.css'
class FilterMovie extends Component {
  state = {
    genres: [],
    genresResult: ''
  }

  getGenres = () => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US')
      .then(res => this.setState({ genres: res.data.genres }))
  }

  componentDidMount = () => {
    this.getGenres()
  }

  filterGenre = (event) => {
    this.props.handleGenreChange(event.target.value)
  }
  render() {
    return (
        <div className="FilterMovie">
          <select
            name="genresResult"
            id="movie-genres"
            value={this.state.value}
            onChange={this.filterGenre}
          >
            <option className="option" value="genre">
              Genres
          </option>
            {
              this.state.genres.map(g =>
                (<option value={g.id} key={g.id}>{g.name}</option>))
            }
          </select>
        </div>
    );
  }
}

export default FilterMovie;