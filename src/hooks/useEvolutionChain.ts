import { useQuery } from "@tanstack/react-query";
import { getEvolutionChain } from "../api/pokemon";

export const useEvolutionChain = (url: string) => {
  return useQuery({
    queryKey: ["evolution-chain", url],
    queryFn: () => getEvolutionChain(url),
    enabled: !!url,
  });
};
