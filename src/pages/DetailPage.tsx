import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../hooks/usePokemonDetail";

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePokemonDetail(name ?? "");

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-400">Pokemon not found.</p>
      </div>
    );

  const image = data.sprites.other["official-artwork"].front_default;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-4">
        {/* Image */}
        <img src={image} alt={data.name} className="w-48 h-48 object-contain" />

        {/* Name + ID */}
        <span className="text-gray-400 text-sm">
          #{String(data.id).padStart(3, "0")}
        </span>
        <h1 className="text-2xl font-bold capitalize">{data.name}</h1>

        {/* Types */}
        <div className="flex gap-2">
          {data.types.map((t) => (
            <span
              key={t.type.name}
              className="bg-gray-100 rounded-full px-3 py-1 text-sm capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 w-full text-center mt-2">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Height</p>
            <p className="font-semibold">{data.height / 10} m</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Weight</p>
            <p className="font-semibold">{data.weight / 10} kg</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Base XP</p>
            <p className="font-semibold">{data.base_experience}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full mt-2">
          <h2 className="font-semibold mb-3">Base Stats</h2>
          {data.stats.map((s) => (
            <div key={s.stat.name} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize text-gray-500">{s.stat.name}</span>
                <span className="font-medium">{s.base_stat}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
