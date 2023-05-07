import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StarWars.css';

function StarWars() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <div className="star-wars-container">
      <h1>Star Wars Characters</h1>
      <div className="star-wars-cards">
        {characters.map((character, index) => (
          <div className="star-wars-card" key={index}>
            <h2>{character.name}</h2>
            <p>
              <strong>Height:</strong> {character.height}
            </p>
            <p>
              <strong>Mass:</strong> {character.mass}
            </p>
            <p>
              <strong>Birth Year:</strong> {character.birth_year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StarWars;
