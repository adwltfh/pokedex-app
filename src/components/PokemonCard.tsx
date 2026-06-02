import { usePokemonDetail } from "../hooks/usePokemonDetail";

interface Props {
  name: string;
  onClick: (name: string) => void;
}

const PokemonCard = ({ name, onClick }: Props) => {
  const { data, isLoading } = usePokemonDetail(name);

  if (isLoading)
    return <div className="bg-gray-100 rounded-xl p-4 animate-pulse h-40" />;

  if (!data) return null;

  const image = data.sprites.other["official-artwork"].front_default;

  return (
    <div
      onClick={() => onClick(name)}
      className="bg-white rounded-xl p-4 shadow hover:shadow-md cursor-pointer transition flex flex-col items-center gap-2"
    >
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <span className="text-xs text-gray-400">
        #{String(data.id).padStart(3, "0")}
      </span>
      <span className="font-semibold capitalize">{name}</span>
      <div className="flex gap-1">
        {data.types.map((t) => (
          <span
            key={t.type.name}
            className="text-xs bg-gray-100 rounded-full px-2 py-0.5 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
