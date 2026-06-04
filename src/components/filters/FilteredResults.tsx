import { useMemo } from "react";
import PokemonCard from "../pokemon/PokemonCard";
import CardSkeleton from "../ui/CardSkeleton";
import { usePokemonByTypes } from "../../hooks/filters/usePokemonByTypes";
import { usePokemonByColor } from "../../hooks/filters/usePokemonByColor";
import { usePokemonByHabitat } from "../../hooks/filters/usePokemonByHabitat";
import { useAllPokemon } from "../../hooks/pokemon/useAllPokemon";
import type { FilteredResultsProps } from "../../types/filters";
import type { PokemonListItem } from "../../types/pokemon";

const FilteredResults = ({
  type,
  color,
  habitat,
  letter,
  search,
  onSelect,
  onClearAll,
}: FilteredResultsProps) => {
  const hasApiFilter = !!(type || color || habitat);
  const hasTextFilter = !!(letter || search);

  const { data: typeList, isLoading: typeLoading } = usePokemonByTypes(type);
  const { data: colorList, isLoading: colorLoading } = usePokemonByColor(color);
  const { data: habitatList, isLoading: habitatLoading } =
    usePokemonByHabitat(habitat);
  const { data: allList, isLoading: allLoading } = useAllPokemon(
    !hasApiFilter && hasTextFilter,
  );

  const isLoading = typeLoading || colorLoading || habitatLoading || allLoading;

  const results = useMemo(() => {
    if (isLoading) return [];

    let base: string[] | null = null;

    const intersect = (existing: string[] | null, next: string[]): string[] => {
      if (existing === null) return next;
      const set = new Set(next);
      return existing.filter((name) => set.has(name));
    };

    if (type && typeList) {
      base = intersect(base, typeList.map((p: PokemonListItem) => p.name));
    }

    if (color && colorList) {
      base = intersect(base, colorList);
    }

    if (habitat && habitatList) {
      base = intersect(base, habitatList);
    }

    if (!hasApiFilter && allList) {
      base = allList.map((p: PokemonListItem) => p.name);
    }

    if (!base) return [];

    let filtered = base;
    if (letter) {
      filtered = filtered.filter((name) =>
        name.toUpperCase().startsWith(letter),
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((name) => name.toLowerCase().includes(q));
    }

    return filtered;
  }, [
    isLoading,
    type,
    typeList,
    color,
    colorList,
    habitat,
    habitatList,
    allList,
    hasApiFilter,
    letter,
    search,
  ]);

  if (isLoading) return <CardSkeleton count={20} />;

  if (results.length === 0) {
    const hasFilters = !!(type || color || habitat || letter);
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
        <div className="text-6xl select-none">{search ? "🔍" : "🌫️"}</div>
        <div>
          <p className="text-white font-semibold text-lg mb-1">
            {search ? `No results for "${search}"` : "No Pokémon found"}
          </p>
          <p className="text-white/40 text-sm">
            {hasFilters && search
              ? "Try a different name or adjust your filters."
              : search
                ? "Check the spelling or try a broader search."
                : "No Pokémon match the selected filters."}
          </p>
        </div>
        {(hasFilters || search) && onClearAll && (
          <button
            onClick={onClearAll}
            className="mt-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {results.map((name) => (
        <PokemonCard key={name} name={name} onClick={onSelect} />
      ))}
    </div>
  );
};

export default FilteredResults;
