import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from "../api/pokemon";

export const usePokemonDetail = (name: string) => {
  return useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => getPokemonDetail(name),
    enabled: !!name,
  });
};
