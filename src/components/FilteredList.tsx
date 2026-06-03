import { usePokemonByTypes } from "../hooks/usePokemonByTypes";
import PokemonCard from "./PokemonCard";
import type { PokemonListItem } from "../types/pokemon";
import CardSkeleton from "../ui/CardSkeleton";

interface Props {
  type: string;
  onSelect: (name: string) => void;
  letter?: string;
}

const FilteredList = ({ type, onSelect, letter }: Props) => {
  const { data, isLoading } = usePokemonByTypes(type);

  if (isLoading)
    return <CardSkeleton count={20} />;

  const filtered = letter
    ? data?.filter((p) => p.name.toUpperCase().startsWith(letter))
    : data;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filtered?.map((pokemon: PokemonListItem) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default FilteredList;
