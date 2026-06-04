import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";

const LIMIT = 20;

export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon-list"],
    queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length * LIMIT;
    },
    initialPageParam: 0,
  });
};
