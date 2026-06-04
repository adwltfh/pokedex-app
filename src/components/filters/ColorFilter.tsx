import { COLORS } from "../../constants/pokemonColors";
import type { ColorFilterProps } from "../../types/filters";

const ColorFilter = ({ selected, onSelect }: ColorFilterProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-white/40 uppercase tracking-widest mb-2">
        Color
      </div>

      <button
        onClick={() => onSelect("")}
        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all
          ${selected === "" ? "bg-white text-gray-900" : "text-white/70 hover:bg-white/10"}`}
      >
        All
      </button>

      {COLORS.map(({ name, hex }) => {
        const isSelected = selected === name;
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium capitalize transition-all flex items-center gap-2
              ${isSelected ? "text-white" : "text-white/70 hover:bg-white/10"}`}
            style={
              isSelected
                ? {
                    backgroundColor: hex + "33",
                    borderLeft: `3px solid ${hex}`,
                  }
                : {}
            }
          >
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-white/20"
              style={{ backgroundColor: hex }}
            />
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default ColorFilter;
