import type { AbjadFilterProps } from "../types/filters";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AbjadFilter = ({ selected, onSelect, horizontal = false }: AbjadFilterProps) => {
  if (horizontal) {
    return (
      <div>
        <div className="text-sm text-white/40 uppercase tracking-widest mb-3">A-Z</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelect("")}
            className={`w-9 h-8 rounded-lg text-xs font-bold transition-all
              ${selected === "" ? "bg-white text-gray-900" : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"}`}
          >
            All
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => onSelect(letter)}
              className={`w-9 h-8 rounded-lg text-xs font-bold transition-all
                ${selected === letter ? "bg-white text-gray-900" : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-12 shrink-0 border-r border-white/10 overflow-y-auto py-4 px-2 flex flex-col items-center gap-1 scrollbar-hide">
      <button
        onClick={() => onSelect("")}
        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all
            ${selected === "" ? "bg-white text-gray-900" : "text-white/40 hover:bg-white/10 hover:text-white"}`}
      >
        All
      </button>

      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelect(letter)}
          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all
              ${selected === letter ? "bg-white text-gray-900" : "text-white/40 hover:bg-white/10 hover:text-white"}`}
        >
          {letter}
        </button>
      ))}
    </aside>
  );
};

export default AbjadFilter;
