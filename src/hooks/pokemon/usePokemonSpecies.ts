import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "../../api/pokemon";

export const usePokemonSpecies = (name: string) => {
  return useQuery({
    queryKey: ["pokemon-species", name],
    queryFn: () => getPokemonSpecies(name),
    enabled: !!name,
  });
};
