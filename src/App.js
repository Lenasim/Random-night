import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import CardsList from './components/CardsList'
import Button from './components/Button'

import './App.css';


class App extends Component {
  state = {
    firstClick: false,
    textButton: 'Laisse toi faire !'
  }

  handleFirstClick = () => {
      this.setState({firstClick: true})
  }

  handleReset = () => {
      this.setState({firstClick: false})
    }

  render() {
    return (
      <div className="App">
        <Header reset={this.handleReset}/>
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
        {this.state.firstClick ? <CardsList /> : <Fragment />}
      </div>
    );
  }
}

export default App