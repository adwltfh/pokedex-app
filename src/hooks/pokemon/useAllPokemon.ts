import { useQuery } from "@tanstack/react-query";
import { getAllPokemon } from "../../api/pokemon";

export const useAllPokemon = (enabled: boolean) => {
  return useQuery({
    queryKey: ["all-pokemon"],
    queryFn: getAllPokemon,
    enabled,
    staleTime: Infinity,
  });
};
