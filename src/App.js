import React from 'react';
import Header from './components/Header'
import CardsList from './components/CardsList'
import Button from './components/Button'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Button />
      <CardsList />
    </div>
  );
}

export default App;
