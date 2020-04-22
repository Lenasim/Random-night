import React, { Component } from 'react';
import FilterButtons from './FilterButtons'
import FilterDrink from './FilterDrink'
import FilterMovie from './FilterMovie'
import FilterRecipe from './FilterRecipe'

import './FilterDisplay.css'

const Error = () => (
  <p>
    Something went <strong>wrong</strong>!
  </p>
);

class FilterDisplay extends Component {
  state = {
    activeId: ''
  }

  handleChangeItem = (event) => {
    const buttonId = event.target.id
    this.setState({ activeId: buttonId })
  }

  componentDidMount() {
    this.setState({ activeId: "drink" })
  }

  getItemContent() {
    switch (this.state.activeId) {
      case "drink":
        return <FilterDrink />;
      case "movie":
        return <FilterMovie />;
      case "recipe":
        return <FilterRecipe />;
      default:
        return <Error />;
    }
  }

  render() {
    return (
      <div className="FilterDisplay">
        <FilterButtons
          handleChange={this.handleChangeItem}
          activeId={this.state.activeId}
        />
        <div>{this.getItemContent()}</div>
      </div>
    );
  }
}

export default FilterDisplay;