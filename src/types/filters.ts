export interface ActiveFilters {
  type: string;
  color: string;
  habitat: string;
  letter: string;
  search: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface HabitatOption {
  name: string;
  emoji: string;
  label: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface FilterBarProps {
  selected: string;
  onSelect: (type: string) => void;
  compact?: boolean;
}

export interface ColorFilterProps {
  selected: string;
  onSelect: (color: string) => void;
}

export interface HabitatFilterProps {
  selected: string;
  onSelect: (habitat: string) => void;
}

export interface AbjadFilterProps {
  selected: string;
  onSelect: (letter: string) => void;
  horizontal?: boolean;
}

export interface ActiveFilterChipsProps {
  filters: ActiveFilters;
  onClear: (key: keyof ActiveFilters) => void;
  onClearAll: () => void;
}

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: string;
  onSelectType: (v: string) => void;
  selectedColor: string;
  onSelectColor: (v: string) => void;
  selectedHabitat: string;
  onSelectHabitat: (v: string) => void;
  selectedLetter: string;
  onSelectLetter: (v: string) => void;
}

export interface FilteredResultsProps {
  type: string;
  color: string;
  habitat: string;
  letter: string;
  search: string;
  onSelect: (name: string) => void;
  onClearAll?: () => void;
}
