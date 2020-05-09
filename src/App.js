import React, { Component } from 'react';
import Header from './components/Header'
import CardsList from './components/CardsList'
import FilterDisplay from './components/FilterDisplay'
import Button from './components/Button'

import './App.css';
import './components/Notice.css'



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
          <> 
          <div className='notice-text'>
            <h1>What's the game plan tonight ?</h1>
          </div>
          <div className="notice-button">
            <div onClick={this.handleFirstClick} >
              <Button text={!this.state.firstClick ? "Get your plan" : "Try again?"} />
            </div>
            <div onClick={this.handleFilterClick} >
              <button className="button-filter"><i class="fas fa-sliders-h"></i></button>
            </div>
          </div>
          </>
        
        {this.state.firstClick && <CardsList />}
        {this.state.filterClick && <FilterDisplay />}
      </div>
    );
  }
}



export default App