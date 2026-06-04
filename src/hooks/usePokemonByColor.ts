import { useQuery } from "@tanstack/react-query";
import { getPokemonByColor } from "../api/pokemon";

export const usePokemonByColor = (colorName: string) => {
  return useQuery({
    queryKey: ["pokemon-by-color", colorName],
    queryFn: () => getPokemonByColor(colorName),
    enabled: !!colorName,
    staleTime: Infinity,
  });
};
