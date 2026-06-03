interface Props {
  selected: string;
  onSelect: (letter: string) => void;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AbjadFilter = ({ selected, onSelect }: Props) => {
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
