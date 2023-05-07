import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './StarWars.css';

function StarWars() {
  const [characters, setCharacters] = useState([]);
  const [expandedCharacters, setExpandedCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        let allCharacters = [];

        let response = await axios.get('https://swapi.dev/api/people/');
        let { results, next } = response.data;

        allCharacters = allCharacters.concat(results);

        while (next) {
          response = await axios.get(next);
          results = response.data.results;
          next = response.data.next;

          allCharacters = allCharacters.concat(results);
        }

        setCharacters(allCharacters);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCharacters();
  }, []);

  const handleExpandCharacter = (character) => {
    if (expandedCharacters.includes(character)) {
      setExpandedCharacters(expandedCharacters.filter((c) => c !== character));
    } else {
      setExpandedCharacters([...expandedCharacters, character]);
    }
  };

  return (
    <div className="star-wars-container">
      <h1>Star Wars Characters</h1>
      <div className="star-wars-cards">
        {characters.map((character) => (
          <div className="star-wars-card" key={character.name}>
            <h2>{character.name}</h2>
            <p>
              <strong>Species:</strong>{" "}
              {character.species.length > 0
                ? character.species.map((specie) => specie.name).join(", ")
                : character.species.length === 0
                  ? "Unknown"
                  : "Loading..."}
            </p>
            <p>
              <strong>Birth Year:</strong> {character.birth_year}
            </p>
            {expandedCharacters.includes(character) ? (
              <div className="expanded-info">
                <p>
                  <strong>Eye Color:</strong> {character.eye_color}
                </p>
                <p>
                  <strong>Skin Color:</strong> {character.skin_color}
                </p>
                <p>
                  <strong>Hair Color:</strong> {character.hair_color}
                </p>
                <button
                  className="expand-button"
                  onClick={() => handleExpandCharacter(character)}
                >
                  -
                </button>
              </div>
            ) : (
              <button
                className="expand-button"
                onClick={() => handleExpandCharacter(character)}
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StarWars;
