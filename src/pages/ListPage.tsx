import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import FilterBar from "../components/FilterBar";
import FilteredList from "../components/FilteredList";
import AbjadFilter from "../components/AbjadFilter";

const ListPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const handleSelect = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="pokeball"
            className="w-10 h-10 animate-bounce"
          />
          <h1 className="text-2xl font-bold">Pokédex</h1>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        <div className="flex max-w-7xl mx-auto">
          {/* Left — Type filter */}
          <aside className="sticky top-16 h-[calc(100vh-4rem)] w-48 shrink-0 border-r border-white/10 overflow-y-auto p-4 scrollbar-hide">
            <FilterBar selected={selectedType} onSelect={setSelectedType} />
          </aside>

          {/* Left — A-Z filter */}
          <AbjadFilter selected={selectedLetter} onSelect={setSelectedLetter} />

          {/* Center — Pokemon grid */}
          <main className="flex-1 px-6 py-6">
            {selectedType ? (
              <FilteredList
                type={selectedType}
                letter={selectedLetter}
                onSelect={handleSelect}
              />
            ) : (
              <PokemonList letter={selectedLetter} onSelect={handleSelect} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
