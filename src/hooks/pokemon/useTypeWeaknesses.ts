import { useQueries } from "@tanstack/react-query";
import { getTypeWeaknesses } from "../../api/pokemon";

export const useTypeWeaknesses = (types: string[]) => {
  const results = useQueries({
    queries: types.map((type) => ({
      queryKey: ["type-weakness", type],
      queryFn: () => getTypeWeaknesses(type),
      enabled: !!type,
    })),
  });

  const weaknesses = results
    .flatMap((r) => r.data?.double_damage_from ?? [])
    .map((t) => t.name)
    .filter((v, i, a) => a.indexOf(v) === i);

  const isLoading = results.some((r) => r.isLoading);

  return { weaknesses, isLoading };
};
