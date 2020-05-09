import React, { Component } from 'react';
import Header from './components/Header'
import CardsList from './components/CardsList'
import FilterDisplay from './components/FilterDisplay'
import Notice from './components/Notice'

import './App.css';


class App extends Component {
  state = {
    firstClick: false,
    textButton: 'Laisse toi faire !',
    showButton: true,
    filterClick: false,
    textFilterButton: 'Personnaliser',
    showFilterButton: true
  }

  handleFirstClick = () => {
    this.setState({
      firstClick: true,
      showFilterButton: false
    })
  }

  handleFilterClick = () => {
    this.setState({
      filterClick: true,
      showButton: false
    })
  }

  handleReset = () => {
    this.setState({
      firstClick: false,
      filterClick: false,
      showButton: true,
      showFilterButton: true
    })
  }

  render() {
    return (
      <div className="App">
        <Header reset={this.handleReset} />
        {
          !this.state.firstClick && !this.state.filterClick &&
          <Notice
            isClicked={this.handleFirstClick}
            text={this.state.textButton}
            isClickedFilter={this.handleFilterClick}
            textFilter={this.state.textFilterButton} />
        }
        {this.state.firstClick && <CardsList />}
        {this.state.filterClick && <FilterDisplay />}
      </div>
    );
  }
}

export default App