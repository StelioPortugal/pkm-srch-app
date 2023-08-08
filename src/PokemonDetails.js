import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setPokemonDetails(null);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (!pokemonDetails) {
    return <div>Loading Pokémon details...</div>;
  }

  return (
    <div className="pokemon-details">
      <h2>{pokemonDetails.name}</h2>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      {/* Display other details of the Pokémon */}
    </div>
  );
};

export default PokemonDetails;

