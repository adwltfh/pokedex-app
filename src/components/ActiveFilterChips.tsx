import { HABITAT_LABELS } from "../constants/habitatLabels";
import type { ActiveFilterChipsProps, ActiveFilters } from "../types/filters";

const ActiveFilterChips = ({ filters, onClear, onClearAll }: ActiveFilterChipsProps) => {
  const active: { key: keyof ActiveFilters; label: string }[] = [];

  if (filters.type)    active.push({ key: "type",    label: filters.type });
  if (filters.color)   active.push({ key: "color",   label: filters.color });
  if (filters.habitat) active.push({ key: "habitat", label: HABITAT_LABELS[filters.habitat] ?? filters.habitat });
  if (filters.letter)  active.push({ key: "letter",  label: `"${filters.letter}"` });
  if (filters.search)  active.push({ key: "search",  label: `"${filters.search}"` });

  if (active.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {active.map(({ key, label }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white capitalize"
        >
          {label}
          <button
            onClick={() => onClear(key)}
            className="hover:text-white/60 transition-colors leading-none"
            aria-label={`Remove ${key} filter`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      {active.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-white/40 hover:text-white/70 transition-colors underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default ActiveFilterChips;
