import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ pokemon, typeColors }) => {
  const [sprite, setSprite] = useState("");

  useEffect(() => {
    const fetchSprite = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setSprite(response.data.sprites.front_default);
      } catch (error) {
        console.log("Error fetching sprite:", error);
      }
    };
    fetchSprite();
  }, [pokemon.name]);

  const getBorderColor = (types) => {
    const dominantType = types?.reduce((prevType, currentType) => {
      if (typeColors[currentType.type.name] > typeColors[prevType.type.name]) {
        return currentType;
      } else {
        return prevType;
      }
    });

    const color = dominantType ? typeColors[dominantType.type.name] : "#000000";
    return color;
  };

  return (
    <div className="card" style={{ borderColor: getBorderColor(pokemon.types) }}>
      <div className="image-container">
        <img src={sprite} alt={pokemon.name} />
      </div>
      <div className="info">
        <h2>{pokemon.name}</h2>
        <div className="types">
          {pokemon.types?.map((type) => (
            <span
              key={type.type.name}
              className="type"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
