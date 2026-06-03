import { useEffect, useRef } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import { useAllPokemon } from "../hooks/useAllPokemon";

interface Props {
  onSelect: (name: string) => void;
  letter: string;
}

const SkeletonGrid = ({ count }: { count: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="rounded-2xl p-4 bg-white/5 animate-pulse h-48 flex flex-col items-center justify-center gap-3"
      >
        <div className="w-20 h-20 rounded-full bg-white/10" />
        <div className="w-16 h-3 rounded-full bg-white/10" />
        <div className="w-12 h-3 rounded-full bg-white/10" />
      </div>
    ))}
  </div>
);

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
    if (allLoading) return <SkeletonGrid count={20} />;
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

  if (isLoading) return <SkeletonGrid count={20} />;

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 bg-white/5 animate-pulse h-48 flex flex-col items-center justify-center gap-3"
            >
              <div className="w-20 h-20 rounded-full bg-white/10" />
              <div className="w-16 h-3 rounded-full bg-white/10" />
              <div className="w-12 h-3 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
