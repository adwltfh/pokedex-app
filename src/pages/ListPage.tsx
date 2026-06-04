import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import FilterBar from "../components/FilterBar";
import FilteredResults from "../components/FilteredResults";
import AbjadFilter from "../components/AbjadFilter";
import FilterDrawer from "../components/FilterDrawer";
import ActiveFilterChips from "../components/ActiveFilterChips";
import SearchBar from "../components/SearchBar";
import ColorFilter from "../components/ColorFilter";
import HabitatFilter from "../components/HabitatFilter";
import Navbar from "../ui/Navbar";

const ListPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedHabitat, setSelectedHabitat] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelect = (name: string) => navigate(`/pokemon/${name}`);

  const hasAnyFilter =
    !!selectedType ||
    !!selectedColor ||
    !!selectedHabitat ||
    !!selectedLetter ||
    !!searchQuery;

  const activeFilters = {
    type: selectedType,
    color: selectedColor,
    habitat: selectedHabitat,
    letter: selectedLetter,
    search: searchQuery,
  };

  const clearFilter = (key: keyof typeof activeFilters) => {
    if (key === "type") setSelectedType("");
    if (key === "color") setSelectedColor("");
    if (key === "habitat") setSelectedHabitat("");
    if (key === "letter") setSelectedLetter("");
    if (key === "search") setSearchQuery("");
  };

  const clearAll = () => {
    setSelectedType("");
    setSelectedColor("");
    setSelectedHabitat("");
    setSelectedLetter("");
    setSearchQuery("");
  };

  const activeCount = [
    selectedType,
    selectedColor,
    selectedHabitat,
    selectedLetter,
    searchQuery,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="lg:hidden">
        <div className="sticky top-16 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex gap-2">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white/70 hover:bg-white/15 hover:text-white transition-all text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M7 12h10M11 20h2"
              />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {hasAnyFilter && (
          <div className="px-4 py-2 border-b border-white/10">
            <ActiveFilterChips
              filters={activeFilters}
              onClear={clearFilter}
              onClearAll={clearAll}
            />
          </div>
        )}

        <main className="px-4 py-4">
          {hasAnyFilter ? (
            <FilteredResults
              type={selectedType}
              color={selectedColor}
              habitat={selectedHabitat}
              letter={selectedLetter}
              search={searchQuery}
              onSelect={handleSelect}
              onClearAll={clearAll}
            />
          ) : (
            <PokemonList letter={selectedLetter} onSelect={handleSelect} />
          )}
        </main>

        <FilterDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          selectedHabitat={selectedHabitat}
          onSelectHabitat={setSelectedHabitat}
          selectedLetter={selectedLetter}
          onSelectLetter={setSelectedLetter}
        />
      </div>

      <div className="hidden lg:flex max-w-400 mx-auto">
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-52 shrink-0 border-r border-white/10 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          <FilterBar selected={selectedType} onSelect={setSelectedType} />
          <div className="border-t border-white/10" />
          <ColorFilter selected={selectedColor} onSelect={setSelectedColor} />
          <div className="border-t border-white/10" />
          <HabitatFilter
            selected={selectedHabitat}
            onSelect={setSelectedHabitat}
          />
        </aside>

        <AbjadFilter selected={selectedLetter} onSelect={setSelectedLetter} />

        <main className="flex-1 px-6 py-6 min-w-0">
          <div className="mb-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {hasAnyFilter && (
            <div className="mb-4">
              <ActiveFilterChips
                filters={activeFilters}
                onClear={clearFilter}
                onClearAll={clearAll}
              />
            </div>
          )}

          {hasAnyFilter ? (
            <FilteredResults
              type={selectedType}
              color={selectedColor}
              habitat={selectedHabitat}
              letter={selectedLetter}
              search={searchQuery}
              onSelect={handleSelect}
              onClearAll={clearAll}
            />
          ) : (
            <PokemonList letter={selectedLetter} onSelect={handleSelect} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;
