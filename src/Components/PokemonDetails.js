import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PokemonDetails = ({ typeColors }) => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Default white background

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonDetails(response.data);
        setLoading(false);

        // Get the background color based on the dominant type of the Pokémon
        if (response.data.types && response.data.types.length > 0) {
          const dominantType = response.data.types.reduce((prevType, currentType) => {
            if (typeColors[currentType.type.name] > typeColors[prevType.type.name]) {
              return currentType;
            } else {
              return prevType;
            }
          });

          const color = typeColors[dominantType.type.name];
          setBackgroundColor(color ? color : "#FFFFFF"); // Default white background for unknown types
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name, typeColors]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details" style={{ backgroundColor: backgroundColor }}>
      <button onClick={handleGoBack}>Back to Main Page</button>
      {pokemonDetails && ( // Check if pokemonDetails is not null
        <>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`}
            alt={name}
          />
          <h2>{name}</h2>
          <h3>Height: {pokemonDetails.height}</h3>
          <h3>Weight: {pokemonDetails.weight}</h3>
          <h3>Type: {pokemonDetails.types[0].type.name}</h3>
          <h3>Abilities:</h3>
          <ul>
            {pokemonDetails.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
