import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import CardsList from './components/CardsList'
import Button from './components/Button'

import './App.css';


class App extends Component {
  state = {
    firstClick: false,
    textButton: 'Laisse toi faire !',
    filterClick: false,
    textFilterButton: 'Personnaliser'
  }

  handleFirstClick = () => {
    this.setState({ firstClick: true })
  }

  handleReset = () => {
    this.setState({ firstClick: false })
  }

  handleFilterClick = () => {
    this.setState({ filterClick: true })
  }

  render() {
    return (
      <div className="App">
        <Header reset={this.handleReset} />
        <h1 className="punchline">
          {
            this.state.firstClick ?
              'tadaaam !'
              : 'Tu sais pas quoi faire ce soir ?'
          }
        </h1>
        {this.state.firstClick ?
          <Fragment />
          : <Button
            isClicked={this.handleFirstClick}
            text={this.state.textButton}
          />
        }
        <Button
          isClicked={this.handleFilterClick}
          text={this.state.textFilterButton}
        />
        {this.state.firstClick ? <CardsList /> : <Fragment />}
      </div>
    );
  }
}

export default App