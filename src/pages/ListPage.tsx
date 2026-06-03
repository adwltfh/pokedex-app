"use client";

import { useNavigate } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import FilterBar from "../components/FilterBar";
import { useState } from "react";
import FilteredList from "../components/FilteredList";

const ListPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");

  const handleSelect = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>
      <FilterBar selected={selectedType} onSelect={setSelectedType} />
      {selectedType ? (
        <FilteredList type={selectedType} onSelect={handleSelect} />
      ) : (
        <PokemonList onSelect={handleSelect} />
      )}
    </div>
  );
};

export default ListPage;
