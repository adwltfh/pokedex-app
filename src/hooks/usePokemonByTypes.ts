import { useQuery } from "@tanstack/react-query";
import { getPokemonByType } from "../api/pokemon";

export const usePokemonByTypes = (typeName: string) => {
  return useQuery({
    queryKey: ["pokemon-by-type", typeName],
    queryFn: () => getPokemonByType(typeName),
    enabled: !!typeName,
  });
};
