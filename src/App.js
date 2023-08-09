// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import PokemonDetails from "./Components/PokemonDetails";
import Pagination from "./Components/Pagination";
import Card from "./Components/Card";
import axios from "axios";
import "./App.css";
import typeColors from "./typeColors";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(10);

  useEffect(() => {
    // Fetch all Pokémon data when the app first loads
    fetchAllPokemon();
  }, []);

  const fetchAllPokemon = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
      setPokemonData(response.data.results);
      setCurrentPage(1); // Reset to the first page when new data is fetched
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setPokemonData([]);
    }
  };

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
        );
        setPokemonData([response.data]);
        setCurrentPage(1); // Reset to the first page when a new search is made
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setPokemonData([]);
      }
    } else {
      fetchAllPokemon(); // If search query is empty, fetch all Pokémon again
    }
  };

  // Pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(pokemonData.length / pokemonPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Pokémon Search App</h1>
        <SearchBar handleSearch={handleSearch} />
        <div className="pokemon-container">
          {currentPokemon.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
              <Card pokemon={pokemon} key={pokemon.name} typeColors={typeColors} />
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
      <Routes>
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
