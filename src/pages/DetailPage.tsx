import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import EvolutionChainComponent from "../components/EvolutionChain";
import { getTypeColor } from "../constants/typeColors";

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePokemonDetail(name ?? "");
  const { data: species } = usePokemonSpecies(name ?? "");

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-white/10 animate-pulse" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400">Pokémon not found.</p>
      </div>
    );

  const image = data.sprites.other["official-artwork"].front_default;
  const primaryType = data.types[0].type.name;
  const bgColor = getTypeColor(primaryType);

  const flavorText = species?.flavor_text_entries
    .find((e) => e.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="relative pt-12 pb-24 px-4 flex flex-col items-center"
        style={{ backgroundColor: bgColor }}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white/80 hover:text-white transition text-sm"
        >
          ← Back
        </button>

        <span className="text-white/60 text-sm mb-1">
          #{String(data.id).padStart(3, "0")}
        </span>
        <h1 className="text-4xl font-bold capitalize mb-4">{data.name}</h1>

        <div className="flex gap-2 mb-6">
          {data.types.map((t) => (
            <span
              key={t.type.name}
              className="bg-white/20 backdrop-blur-sm text-white rounded-full px-4 py-1 text-sm capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <img
          src={image}
          alt={data.name}
          className="w-56 h-56 object-contain drop-shadow-2xl z-10"
        />
      </div>

      <div className="relative bg-gray-900 rounded-t-3xl -mt-8 px-6 pt-8 pb-12 max-w-xl mx-auto">
        {flavorText && (
          <p className="text-gray-400 text-center text-sm italic mb-6">
            {flavorText}
          </p>
        )}

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 rounded-2xl p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Height</p>
            <p className="font-bold">{data.height / 10} m</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Weight</p>
            <p className="font-bold">{data.weight / 10} kg</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Base XP</p>
            <p className="font-bold">{data.base_experience}</p>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4">Base Stats</h2>
        {data.stats.map((s) => (
          <div key={s.stat.name} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize text-gray-400">{s.stat.name}</span>
              <span className="font-medium">{s.base_stat}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                  backgroundColor: bgColor,
                }}
              />
            </div>
          </div>
        ))}

        <EvolutionChainComponent pokemonName={name ?? ""} />
      </div>
    </div>
  );
};

export default DetailPage;
