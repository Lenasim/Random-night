import React, { Component } from 'react';
import Header from './components/Header'
import CardsList from './components/CardsList'
import Button from './components/Button'
import FilterDisplay from './components/FilterDisplay'

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
        <div className="container-punch">
          <h1 className="punchline">
            {
              this.state.firstClick ?
                'tadaaam !'
                : 'Tu sais pas quoi faire ce soir ?'
            }
          </h1>
        </div>
        {!this.state.firstClick && this.state.showButton && <Button
          isClicked={this.handleFirstClick}
          text={this.state.textButton}
        />
        }
        {this.state.firstClick && <CardsList />}
        {!this.state.filterClick && this.state.showFilterButton &&
          <Button
            isClicked={this.handleFilterClick}
            text={this.state.textFilterButton}
          />
        }
        {this.state.filterClick && <FilterDisplay />}
      </div>
    );
  }
}

export default App