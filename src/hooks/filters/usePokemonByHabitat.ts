import { useQuery } from "@tanstack/react-query";
import { getPokemonByHabitat } from "../../api/pokemon";

export const usePokemonByHabitat = (habitatName: string) => {
  return useQuery({
    queryKey: ["pokemon-by-habitat", habitatName],
    queryFn: () => getPokemonByHabitat(habitatName),
    enabled: !!habitatName,
    staleTime: Infinity,
  });
};
