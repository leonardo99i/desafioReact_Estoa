import React from 'react';
import StarWars from './components/StarWars';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>STAR WARS API</h1>
      </header>
      <main>
        <StarWars />
      </main>
    </div>
  );
};

export default App;
