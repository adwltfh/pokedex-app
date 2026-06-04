import { HABITATS } from "../constants/habitats";
import type { HabitatFilterProps } from "../types/filters";

const HabitatFilter = ({ selected, onSelect }: HabitatFilterProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-white/40 uppercase tracking-widest mb-2">
        Habitat
      </div>

      <button
        onClick={() => onSelect("")}
        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all
          ${selected === "" ? "bg-white text-gray-900" : "text-white/70 hover:bg-white/10"}`}
      >
        All
      </button>

      {HABITATS.map(({ name, emoji, label }) => {
        const isSelected = selected === name;
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
              ${isSelected ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"}`}
          >
            <span className="text-base leading-none">{emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default HabitatFilter;
