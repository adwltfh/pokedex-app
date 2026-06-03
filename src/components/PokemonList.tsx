import { useEffect, useRef } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import { useAllPokemon } from "../hooks/useAllPokemon";
import CardSkeleton from "../ui/CardSkeleton";

interface Props {
  onSelect: (name: string) => void;
  letter: string;
}

const PokemonList = ({ onSelect, letter }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePokemonList();
  const { data: allData, isLoading: allLoading } = useAllPokemon(!!letter);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (letter) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, letter]);

  if (letter) {
    if (allLoading) return <CardSkeleton count={20} />;
    const filtered =
      allData?.filter((p) => p.name.toUpperCase().startsWith(letter)) ?? [];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            onClick={onSelect}
          />
        ))}
      </div>
    );
  }

  if (isLoading) return <CardSkeleton count={20} />;

  const allPokemon = data?.pages.flatMap((page) => page.results) ?? [];

  // const filtered = letter
  //   ? allPokemon.filter((p) => p.name.toUpperCase().startsWith(letter))
  //   : allPokemon;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            onClick={onSelect}
          />
        ))}
      </div>

      <div ref={observerRef} className="h-10 mt-4" />

      {isFetchingNextPage && (
        <CardSkeleton count={10} />
      )}
    </div>
  );
};

export default PokemonList;
