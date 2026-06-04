import { useEffect } from "react";
import FilterBar from "./FilterBar";
import ColorFilter from "./ColorFilter";
import HabitatFilter from "./HabitatFilter";
import AbjadFilter from "./AbjadFilter";
import type { FilterDrawerProps } from "../types/filters";

const FilterDrawer = ({
  isOpen,
  onClose,
  selectedType,
  onSelectType,
  selectedColor,
  onSelectColor,
  selectedHabitat,
  onSelectHabitat,
  selectedLetter,
  onSelectLetter,
}: FilterDrawerProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-white/10 rounded-t-2xl max-h-[85vh] flex flex-col animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 rounded-full bg-white/20 absolute left-1/2 -translate-x-1/2 top-2" />
            <span className="text-white font-semibold text-base mt-1">
              Filters
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
          <FilterBar selected={selectedType} onSelect={onSelectType} compact />
          <div className="border-t border-white/10" />
          <ColorFilter selected={selectedColor} onSelect={onSelectColor} />
          <div className="border-t border-white/10" />
          <HabitatFilter
            selected={selectedHabitat}
            onSelect={onSelectHabitat}
          />
          <div className="border-t border-white/10" />
          <AbjadFilter
            selected={selectedLetter}
            onSelect={onSelectLetter}
            horizontal
          />
        </div>

        <div className="px-5 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
