import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { getTypeColor } from "../constants/typeColors";

interface Props {
  name: string;
  onClick: (name: string) => void;
}

const CardSkeleton = () => (
  <div className="rounded-2xl p-4 bg-white/5 animate-pulse h-48 flex flex-col items-center justify-center gap-3">
    <div className="w-20 h-20 rounded-full bg-white/10" />
    <div className="w-16 h-3 rounded-full bg-white/10" />
    <div className="w-12 h-3 rounded-full bg-white/10" />
  </div>
);

const PokemonCard = ({ name, onClick }: Props) => {
  const { data, isLoading } = usePokemonDetail(name);

  if (isLoading) return <CardSkeleton />;
  if (!data) return null;

  const image = data.sprites.other["official-artwork"].front_default;
  const primaryType = data.types[0].type.name;
  const bgColor = getTypeColor(primaryType);

  return (
    <div
      onClick={() => onClick(name)}
      className="group rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center gap-2 relative overflow-hidden w-40 h-57.5 shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt=""
          className="w-full h-full"
        />
      </div>

      <span className="self-start text-xs text-white/60 font-medium">
        #{String(data.id).padStart(3, "0")}
      </span>

      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-contain drop-shadow-lg z-10 group-hover:scale-125 transition-all duration-300"
      />

      <span
        className={`font-bold capitalize text-white text-center mt-1 leading-tight group-hover:scale-105 group-hover:drop-shadow-lg ${name.length > 12 ? "text-xs" : "text-sm"}`}
      >
        {name}
      </span>

      <div className="flex gap-1 flex-wrap justify-center mt-auto">
        {data.types.map((t) => (
          <span
            key={t.type.name}
            className="text-xs bg-black/20 text-white rounded-full px-2 py-0.5 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
