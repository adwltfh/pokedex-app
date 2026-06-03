import type { EvolutionChainLink } from "../types/pokemon";

export interface EvolutionStage {
  name: string;
  id: string;
}

export const parseEvolutionChain = (
  chain: EvolutionChainLink,
): EvolutionStage[] => {
  const stages: EvolutionStage[] = [];

  const traverse = (link: EvolutionChainLink) => {
    const id = link.species.url.split("/").filter(Boolean).pop() ?? "";
    stages.push({ name: link.species.name, id });
    if (link.evolves_to.length > 0) {
      traverse(link.evolves_to[0]);
    }
  };

  traverse(chain);
  return stages;
};
