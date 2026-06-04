import { useEvolutionChain } from "../../hooks/pokemon/useEvolutionChain";
import { usePokemonSpecies } from "../../hooks/pokemon/usePokemonSpecies";
import { parseEvolutionChain } from "../../utils/parseEvolutionChain";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemonName: string;
}

const EvolutionChainComponent = ({ pokemonName }: Props) => {
  const navigate = useNavigate();
  const { data: species, isLoading: speciesLoading } =
    usePokemonSpecies(pokemonName);
  const { data: evolutionData, isLoading: evoLoading } = useEvolutionChain(
    species?.evolution_chain.url ?? "",
  );

  if (speciesLoading || evoLoading)
    return (
      <div className="flex gap-4 justify-center mt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-20 h-24 rounded-xl bg-white/10 animate-pulse"
          />
        ))}
      </div>
    );

  if (!evolutionData) return null;

  const stages = parseEvolutionChain(evolutionData.chain);

  return (
    <div className="mt-6">
      <h2 className="text-white font-bold text-lg mb-4">Evolution Chain</h2>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {stages.map((stage, index) => (
          <div key={stage.name} className="flex items-center gap-2">
            <div
              onClick={() => navigate(`/pokemon/${stage.name}`)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="bg-white/10 rounded-2xl p-2 group-hover:bg-white/20 transition">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.id}.png`}
                  alt={stage.name}
                  className="w-20 h-20 object-contain drop-shadow-lg"
                />
              </div>
              <span className="text-white/80 text-xs capitalize mt-1">
                {stage.name}
              </span>
            </div>

            {index < stages.length - 1 && (
              <span className="text-white/40 text-xl">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChainComponent;
