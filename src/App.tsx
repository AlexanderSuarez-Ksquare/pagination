import React, { useState } from "react";
import useFetchPokemon from "./logic/useFetchPokemon";
import Pokedex from "./components/Pokedex";
import useFetchTypes from "./logic/useFetchTypes";
import "./App.css";
import useFetchPokemonByType from "./logic/useFetchPokemonByType";
import useSearchPokemon from "./logic/useSearchPokemon";
import Pagination from "./components/Pagination";


const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pokemon, totalPages } = useFetchPokemon(currentPage);
  const{types} = useFetchTypes();
  const {selectedType, setSelectedType, pokemonByType} = useFetchPokemonByType();
  const [search, setSearch] = useState("");
  const { searchedPokemon } = useSearchPokemon(search);



  const list = types.map((value)=> <option key={value.name} value={value.url}>{value.name.toUpperCase()}</option>)

  return (
  <div className="App">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search Pokémon"
    />

    <select value={selectedType} onChange={(e)=> setSelectedType(e.target.value)} >
      <option value="">Select a type</option>
      {list}
    </select>

  {selectedType ? (<Pokedex pokemon={pokemonByType}/>) : search ? (<Pokedex pokemon={searchedPokemon} />) : ( <Pokedex pokemon={pokemon} /> )}

  {!search && !selectedType && (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
    />
      )}

  </div>
  );
};

export default App;