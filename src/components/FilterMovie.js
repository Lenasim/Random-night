import React, { Component } from 'react';
import axios from 'axios'

import './FilterMovie.css'
class FilterMovie extends Component {
  state = {
    genres: [],
    genresResult: '',
    // movieResult: ''
  }

  getGenres = () => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=439ba5790e4522ad15e0c6a3574cd795&language=en-US')
      .then(res => this.setState({ genres: res.data.genres }))
  }

  componentDidMount = () => {
    this.getGenres()
  }
  render() {
    const { genresResult, genres } = this.state
    return (
      <div>
        <div className="FilterMovie">
          <select
            name="genres"
            id="movie-genres"
            value={genresResult}
            onChange={this.handleChangeGenre}
          >
            <option className="option" value="genre">
              Genres
          </option>
            {
              genres.map((g) =>
                <option value={g.id} key={g.id}>{g.name}</option>)
            }
          </select>
        </div>
      </div>
    );
  }
}

export default FilterMovie;