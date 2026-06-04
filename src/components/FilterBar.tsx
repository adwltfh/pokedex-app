import { usePokemonTypes } from "../hooks/usePokemonTypes";
import { getTypeColor } from "../constants/typeColors";
import type { FilterBarProps } from "../types/filters";

const FilterBar = ({ selected, onSelect, compact = false }: FilterBarProps) => {
  const { data, isLoading } = usePokemonTypes();

  if (isLoading)
    return (
      <div className="flex flex-col gap-2">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="h-8 rounded-xl bg-white/10 animate-pulse" />
        ))}
      </div>
    );

  const types =
    data?.results.filter(
      (t: { name: string }) => !["unknown", "shadow"].includes(t.name),
    ) ?? [];

  if (compact) {
    return (
      <div>
        <div className="text-sm text-white/40 uppercase tracking-widest mb-3">Type</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelect("")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${selected === "" ? "bg-white text-gray-900" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
          >
            All
          </button>
          {types.map((t: { name: string }) => {
            const color = getTypeColor(t.name);
            const isSelected = selected === t.name;
            return (
              <button
                key={t.name}
                onClick={() => onSelect(t.name)}
                className="px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all text-white"
                style={{ backgroundColor: isSelected ? color : "rgba(255,255,255,0.1)", opacity: isSelected ? 1 : 0.7 }}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-white/40 uppercase tracking-widest mb-2">
        Type
      </div>

      <button
        onClick={() => onSelect("")}
        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all
          ${
            selected === ""
              ? "bg-white text-gray-900"
              : "text-white/70 hover:bg-white/10"
          }`}
      >
        All
      </button>

      {types.map((t: { name: string }) => {
        const color = getTypeColor(t.name);
        const isSelected = selected === t.name;

        return (
          <button
            key={t.name}
            onClick={() => onSelect(t.name)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium capitalize transition-all flex items-center gap-2
              ${isSelected ? "text-white" : "text-white/70 hover:bg-white/10"}`}
            style={isSelected ? { backgroundColor: color } : {}}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            {t.name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
