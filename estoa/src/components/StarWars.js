import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

import "./StarWars.css";

function StarWars() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        let allCharacters = [];

        let response = await axios.get("https://swapi.dev/api/people/");
        let { results, next } = response.data;

        allCharacters = allCharacters.concat(results);

        while (next) {
          response = await axios.get(next);
          results = response.data.results;
          next = response.data.next;

          allCharacters = allCharacters.concat(results);
        }

        // Buscar o nome da espécie para cada personagem
        const charactersWithSpecies = await Promise.all(
          allCharacters.map(async (character) => {
            const speciesNames = await Promise.all(
              character.species.map(async (speciesURL) => {
                const speciesResponse = await axios.get(speciesURL);
                return speciesResponse.data.name;
              })
            );

            return { ...character, species: speciesNames };
          })
        );

        setCharacters(charactersWithSpecies);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCharacters();
  }, []);

  const handleExpandCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="star-wars-container">
      <div className="star-wars-cards">
        {characters.map((character) => (
          <div className="star-wars-card" key={character.name}>
            <div className="card-header">
              <h2>{character.name}</h2>
              <button
                className="expand-button"
                onClick={() => handleExpandCharacter(character)}
              >
                +
              </button>
            </div>
            <p>
              <strong>Species:</strong>{" "}
              {character.species.length > 0 ? character.species[0] : "Unknown"}
            </p>
            <p>
              <strong>Birth Year:</strong> {character.birth_year}
            </p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={selectedCharacter !== null}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedCharacter && (
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            <h2>{selectedCharacter.name}</h2>
            <p>
              <strong>Species:</strong>{" "}
              {selectedCharacter.species.length > 0
                ? selectedCharacter.species[0]
                : "Unknown"}
            </p>
            <p>
              <strong>Birth Year:</strong> {selectedCharacter.birth_year}
            </p>
            <p>
              <strong>Eye Color:</strong> {selectedCharacter.eye_color}
            </p>
            <p>
              <strong>Gender:</strong> {selectedCharacter.gender}
            </p>
            <p>
              <strong>Hair Color:</strong> {selectedCharacter.hair_color}
            </p>
            <p>
              <strong>Height:</strong> {selectedCharacter.height}
            </p>
            <p>
              <strong>Mass:</strong> {selectedCharacter.mass}
            </p>
            <p>
              <strong>Skin Color:</strong> {selectedCharacter.skin_color}
            </p>
            <p>
              <strong>Home World:</strong> {selectedCharacter.homeworld}
            </p>
            <p>
              <strong>Films:</strong> {selectedCharacter.films.join(", ")}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default StarWars;
