import React from 'react';
import Header from './components/Header'
import Card from './components/Card'
import Button from './components/Button'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <h1 className="punchline">Tu sais pas quoi faire ce soir ?</h1>
      <Button />
      <Card />
    </div>
  );
}

export default App;
