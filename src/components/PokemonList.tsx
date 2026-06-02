import { useEffect, useRef } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "./PokemonCard";

interface Props {
  onSelect: (name: string) => void;
}

const PokemonList = ({ onSelect }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonList();
  const observerRef = useRef<HTMLDivElement>(null);

  // infinite scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const allPokemon = data?.pages.flatMap((page) => page.results) ?? [];

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

      {/* infinite scroll trigger element */}
      <div ref={observerRef} className="h-10 mt-4" />

      {isFetchingNextPage && (
        <p className="text-center text-gray-400 py-4">Loading more...</p>
      )}
    </div>
  );
};

export default PokemonList;
