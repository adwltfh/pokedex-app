import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../hooks/pokemon/usePokemonDetail";
import { usePokemonSpecies } from "../hooks/pokemon/usePokemonSpecies";
import EvolutionChainComponent from "../components/pokemon/EvolutionChain";
import { getTypeColor } from "../utils/typeColors";
import Navbar from "../components/ui/Navbar";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getTypeWeaknesses } from "../api/pokemon";

type Tab = "overview" | "stats" | "moves";

const MOVES_PER_PAGE = 10;

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, isError } = usePokemonDetail(name ?? "");
  const { data: species } = usePokemonSpecies(name ?? "");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [movePage, setMovePage] = useState(0);

  const typeNames = data?.types.map((t) => t.type.name) ?? [];
  const weaknessQueries = useQueries({
    queries: typeNames.map((type) => ({
      queryKey: ["type-weaknesses", type],
      queryFn: () => getTypeWeaknesses(type),
    })),
  });
  const weaknessLoading = weaknessQueries.some((q) => q.isLoading);
  const weaknesses = [
    ...new Set(
      weaknessQueries.flatMap(
        (q) => q.data?.double_damage_from.map((t) => t.name) ?? [],
      ),
    ),
  ];

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

  const tabs: Tab[] = ["overview", "stats", "moves"];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar title={data.name} showBack />
      <div
        className="relative pt-12 pb-24 px-4 flex flex-col items-center"
        style={{ backgroundColor: bgColor }}
      >
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
          className="w-60 h-60 object-contain drop-shadow-2xl z-10 hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="relative bg-gray-900 rounded-t-3xl -mt-12 px-6 pt-8 pb-12 max-w-xl mx-auto">
        {flavorText && (
          <p className="text-gray-400 text-center text-sm italic mb-6">
            {flavorText}
          </p>
        )}

        <div className="sticky top-16 z-10 bg-gray-900 border-b border-white/10">
          <div className="flex max-w-xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-all
            ${
              activeTab === tab
                ? "text-white border-b-2"
                : "text-white/40 hover:text-white/70"
            }`}
                style={activeTab === tab ? { borderColor: bgColor } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-xl mx-auto px-6 py-6 pb-12">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Height", value: `${data.height / 10} m` },
                  { label: "Weight", value: `${data.weight / 10} kg` },
                  { label: "Base XP", value: data.base_experience },
                  { label: "Happiness", value: species?.base_happiness ?? "—" },
                  {
                    label: "Capture Rate",
                    value: species?.capture_rate ?? "—",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 rounded-2xl p-3 text-center"
                  >
                    <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                    <p className="font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-bold text-lg mb-3">Abilities</h2>
                <div className="flex flex-col gap-2">
                  {data.abilities.map((a) => (
                    <div
                      key={a.ability.name}
                      className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                    >
                      <span className="capitalize font-medium">
                        {a.ability.name.replace("-", " ")}
                      </span>
                      {a.is_hidden && (
                        <span className="text-xs bg-white/10 text-white/50 rounded-full px-2 py-0.5">
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-bold text-lg mb-3">Weaknesses</h2>
                {weaknessLoading ? (
                  <div className="flex gap-2 flex-wrap">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-7 w-16 rounded-full bg-white/10 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {weaknesses.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-sm capitalize font-medium text-white"
                        style={{ backgroundColor: getTypeColor(type) }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <EvolutionChainComponent pokemonName={name ?? ""} />
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h2 className="font-bold text-lg mb-4">Base Stats</h2>
              {data.stats.map((s) => (
                <div key={s.stat.name} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-400">
                      {s.stat.name}
                    </span>
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
            </div>
          )}

          {activeTab === "moves" && (
            <div>
              <div className="grid grid-cols-2 gap-2">
                {data.moves
                  .slice(
                    movePage * MOVES_PER_PAGE,
                    (movePage + 1) * MOVES_PER_PAGE,
                  )
                  .map((m) => (
                    <div
                      key={m.move.name}
                      className="bg-white/5 rounded-xl px-4 py-2 text-sm capitalize"
                    >
                      {m.move.name.replace("-", " ")}
                    </div>
                  ))}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setMovePage((p) => Math.max(0, p - 1))}
                  disabled={movePage === 0}
                  className="px-4 py-2 text-sm bg-white/10 rounded-xl disabled:opacity-30"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-400 self-center">
                  Page {movePage + 1} /{" "}
                  {Math.ceil(data.moves.length / MOVES_PER_PAGE)}
                </span>
                <button
                  onClick={() =>
                    setMovePage((p) =>
                      Math.min(
                        Math.ceil(data.moves.length / MOVES_PER_PAGE) - 1,
                        p + 1,
                      ),
                    )
                  }
                  disabled={
                    (movePage + 1) * MOVES_PER_PAGE >= data.moves.length
                  }
                  className="px-4 py-2 text-sm bg-white/10 rounded-xl disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
